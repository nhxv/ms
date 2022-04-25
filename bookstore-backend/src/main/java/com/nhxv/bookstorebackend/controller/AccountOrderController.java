package com.nhxv.bookstorebackend.controller;

import com.nhxv.bookstorebackend.dto.AccountOrderDto;
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
import java.util.Collections;
import java.util.List;

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
        return orders;
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @GetMapping("/{username}")
    public List<AccountOrder> getAccountOrders(@PathVariable String username) {
        List<AccountOrder> orders = this.accountOrderRepository.findByAccount_Email(username);
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

            if (orderUpdateDto.getStatus().equals("COMPLETED")) {
                long amount = book.getAmountPurchased() + bookOrder.getQuantity();
                book.setAmountPurchased(amount);
            }

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
