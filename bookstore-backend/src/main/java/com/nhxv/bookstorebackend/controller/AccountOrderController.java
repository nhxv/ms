package com.nhxv.bookstorebackend.controller;

import com.nhxv.bookstorebackend.dto.AccountOrderDto;
import com.nhxv.bookstorebackend.dto.BasicStatsDto;
import com.nhxv.bookstorebackend.dto.OrderUpdateDto;
import com.nhxv.bookstorebackend.model.*;
import com.nhxv.bookstorebackend.repository.AccountOrderRepository;
import com.nhxv.bookstorebackend.repository.AccountRepository;
import com.nhxv.bookstorebackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

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
    @GetMapping
    public List<AccountOrder> getOrdersByStatus(@RequestParam(name = "status") String status) {
        List<AccountOrder> orders = this.accountOrderRepository.findByOrderStatus(OrderStatus.valueOf(status));
        Collections.sort(orders);
        return orders;
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
}
