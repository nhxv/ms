package com.nhxv.bookstorebackend.controller;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.nhxv.bookstorebackend.dto.AccountOrderDto;
import com.nhxv.bookstorebackend.dto.BasicStatsDto;
import com.nhxv.bookstorebackend.dto.OrderUpdateDto;
import com.nhxv.bookstorebackend.model.*;
import com.nhxv.bookstorebackend.repository.AccountOrderRepository;
import com.nhxv.bookstorebackend.repository.AccountRepository;
import com.nhxv.bookstorebackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/account-orders")
public class AccountOrderController {
    private AccountOrderRepository accountOrderRepository;
    private AccountRepository accountRepository;
    private BookService bookService;

    @Autowired
    public AccountOrderController(AccountOrderRepository accountOrderRepository,
                                  AccountRepository accountRepository,
                                  BookService bookService) {
        this.accountOrderRepository = accountOrderRepository;
        this.accountRepository = accountRepository;
        this.bookService = bookService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pageable")
    public Page<AccountOrder> getOrdersByStatus(@RequestParam(name = "status") String status,
                                                @RequestParam(name = "page", defaultValue = "0") String pageParam,
                                                @RequestParam(name = "size", defaultValue = "9") String sizeParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "dateCreated"));
        return this.accountOrderRepository.findByOrderStatus(OrderStatus.valueOf(status), pageable);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/stats/basic")
    public ResponseEntity<BasicStatsDto> getBasicStats() {
        List<AccountOrder> allOrders = this.accountOrderRepository.findAll();
        int orderCount = allOrders.size();

        List<AccountOrder> completedOrders = allOrders.stream()
                .filter(order -> order.getOrderStatus() == OrderStatus.COMPLETED)
                .collect(Collectors.toList());
        int bookSaleCount = 0;
        BigDecimal revenue = new BigDecimal(0);
        List<Account> customers = new ArrayList<>();
        for (AccountOrder accountOrder : completedOrders) {
            if (!customers.contains(accountOrder.getAccount())) customers.add(accountOrder.getAccount());
            revenue = revenue.add(accountOrder.getTotalPrice());
            for (BookOrder bookOrder : accountOrder.getBookOrders()) {
                bookSaleCount += bookOrder.getQuantity();
            }
        }

        BasicStatsDto basicStatsDto = new BasicStatsDto();
        basicStatsDto.setOrderCount(orderCount);
        basicStatsDto.setBookSaleCount(bookSaleCount);
        basicStatsDto.setRevenue(revenue);
        basicStatsDto.setCustomerCount(customers.size());
        return ResponseEntity.ok(basicStatsDto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/stats/revenue/{year}")
    public ResponseEntity<Map<Integer, BigDecimal>> getRevenueStats(@PathVariable String year) {
        List<AccountOrder> completedOrders =
                this.accountOrderRepository.findByOrderStatus(OrderStatus.COMPLETED)
                .stream().filter(order -> {
                    Calendar c = Calendar.getInstance();
                    c.setTime(order.getDateCreated());
                    return c.get(Calendar.YEAR) == Integer.parseInt(year);
                }).collect(Collectors.toList());
        Calendar calendar = Calendar.getInstance();
        Map<Integer, BigDecimal> annualRevenue = new HashMap<>();
        for (int i = 0; i < 12; i++) {
            annualRevenue.put(i, new BigDecimal(0));
        }
        for (AccountOrder accountOrder : completedOrders) {
            calendar.setTime(accountOrder.getDateCreated());
            int month = calendar.get(Calendar.MONTH);
            if (annualRevenue.containsKey(month)) {
                annualRevenue.put(month, annualRevenue.get(month).add(accountOrder.getTotalPrice()));
            }
        }
        return ResponseEntity.ok(annualRevenue);
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @GetMapping("/{username}")
    public List<AccountOrder> getAccountOrders(@PathVariable String username) {
        List<AccountOrder> orders = this.accountOrderRepository.findByAccount_Email(username);
        Collections.sort(orders);
        return orders;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @PostMapping
    public ResponseEntity<AccountOrder> addAccountOrder(@Valid @RequestBody AccountOrderDto accountOrderDto) throws Exception {
        AccountOrder accountOrder = new AccountOrder();
        Account account = accountRepository.findByEmail(accountOrderDto.getEmail());
        if (account == null) {
            throw new Exception("username not found");
        }
        accountOrder.setAccount(account);
        accountOrder.setBookOrders(accountOrderDto.getBookOrders());
        accountOrder.setOrderStatus(OrderStatus.PROCESSING);
        accountOrder.setName(accountOrderDto.getName());
        accountOrder.setEmail(accountOrderDto.getEmail());
        accountOrder.setAddress(accountOrderDto.getAddress());
        accountOrder.setPhone(accountOrderDto.getPhone());
        accountOrder.setTotalPrice(accountOrderDto.getTotalPrice());
        account.setCart(null);
        return ResponseEntity.ok(this.accountOrderRepository.save(accountOrder));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{accountOrderId}")
    public ResponseEntity<AccountOrder> changeOrderStatus(@PathVariable long accountOrderId,
                                                          @RequestBody OrderUpdateDto orderUpdateDto) throws Exception {
        AccountOrder accountOrder = this.accountOrderRepository
                .findById(accountOrderId).orElseThrow(() -> new Exception("cannot find order"));

        if (orderUpdateDto.getStatus().equals(accountOrder.getOrderStatus().name())) {
            accountOrder.setDateCreated(orderUpdateDto.getDate());
            return ResponseEntity.ok(this.accountOrderRepository.save(accountOrder));
        }

        // change amount purchased of every book order
        List<BookOrder> bookOrders = accountOrder.getBookOrders();
        List<Book> books = bookService.findBooksFromOrder(bookOrders);
        for (Book book : books) {
            BookOrder bookOrder = bookOrders.stream()
                    .filter(order -> order.getBookId() == book.getId())
                    .findFirst().orElse(null);
            assert bookOrder != null;

            // when change order status to "completed", increase amount purchased
            if (orderUpdateDto.getStatus().equals("COMPLETED")) {
                long amount = book.getAmountPurchased() + bookOrder.getQuantity();
                book.setAmountPurchased(amount);
            }

            // when change order status from "completed", decrease amount purchased
            if (accountOrder.getOrderStatus().name().equals("COMPLETED")) {
                long amount = book.getAmountPurchased() - bookOrder.getQuantity();
                book.setAmountPurchased(amount);
            }
        }
        accountOrder.setOrderStatus(OrderStatus.valueOf(orderUpdateDto.getStatus()));
        accountOrder.setDateCreated(orderUpdateDto.getDate());
        return ResponseEntity.ok(this.accountOrderRepository.save(accountOrder));
    }

    @GetMapping(value = "/receipt/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> getInvoice(@PathVariable long id) throws Exception {
        AccountOrder accountOrder = this.accountOrderRepository.findById(id)
                .orElseThrow(() -> new Exception("Order not found for this id: " + id));
        if (accountOrder.getOrderStatus() != OrderStatus.COMPLETED) {
            throw new Exception("Invalid request");
        }
        ByteArrayInputStream bis = generatePDF(accountOrder);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=invoice.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(bis));
    }

    private ByteArrayInputStream generatePDF(AccountOrder accountOrder) {
        List<BookOrder> bookOrders = accountOrder.getBookOrders();
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document, out);
            document.open();
            // add text to pdf

            Paragraph p1 = new Paragraph("Mangastore");
            p1.setIndentationLeft(50);
            Paragraph p2 = new Paragraph("16 Lost Street Ho Chi Minh City\n" + "mangastore.com\n");
            p2.setIndentationLeft(50);
            document.add(p1);
            document.add(p2);
            document.add(Chunk.NEWLINE);
            Paragraph p3 = new Paragraph(
                    "Receipt for customer " + accountOrder.getId() + "\n" +
                            "Recipient's name: "+ stripSign(accountOrder.getName()) + "\n" +
                            "Email: "+ accountOrder.getEmail() + "\n" +
                            "Phone number: "+ accountOrder.getPhone() + "\n" +
                            "Address: "+ accountOrder.getAddress());
            p3.setIndentationLeft(50);
            document.add(p3);
            document.add(Chunk.NEWLINE);
            // add table to pdf
            PdfPTable table = new PdfPTable(4);
            Stream.of("Title", "Author", "Quantity", "Unit price").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                header.setPaddingTop(8);
                header.setPaddingBottom(8);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setPhrase(new Phrase(headerTitle));
                table.addCell(header);
            });
            // each row add product order
            for (BookOrder bookOrder : bookOrders) {
                // add name
                PdfPCell titleCell = new PdfPCell(new Phrase(stripSign(bookOrder.getTitle())));
                titleCell.setPaddingTop(8);
                titleCell.setPaddingBottom(8);
                titleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                titleCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                table.addCell(titleCell);
                // add author
                PdfPCell authorCell = new PdfPCell(new Phrase(stripSign(bookOrder.getAuthorName())));
                authorCell.setPaddingTop(8);
                authorCell.setPaddingBottom(8);
                authorCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                authorCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(authorCell);
                // add quantity
                PdfPCell quantityCell = new PdfPCell(new Phrase(String.valueOf(bookOrder.getQuantity())));
                quantityCell.setPaddingTop(8);
                quantityCell.setPaddingBottom(8);
                quantityCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                quantityCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(quantityCell);
                // add unit price
                PdfPCell priceCell = new PdfPCell(new Phrase(bookOrder.getUnitPrice().toString()));
                priceCell.setPaddingTop(8);
                priceCell.setPaddingBottom(8);
                priceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                priceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(priceCell);
            }
            document.add(table);
            document.add(Chunk.NEWLINE);
            Paragraph p4 = new Paragraph
                    ("Total: $" + accountOrder.getTotalPrice().toString() + "\n\n" +
                            "-------------------------------------------------------------------------------------------------------");
            p4.setIndentationLeft(50);
            document.add(p4);
            document.add(Chunk.NEWLINE);
            Paragraph p5 = new Paragraph("Thank you for visiting our store");
            p5.setAlignment(Element.ALIGN_CENTER);
            document.add(p5);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return new ByteArrayInputStream(out.toByteArray());
    }

    private static String stripSign(String vnmese) {
        String str = Normalizer.normalize(vnmese, Normalizer.Form.NFD);
        str = str.replaceAll("\\p{M}", "");
        return str;
    }
}
