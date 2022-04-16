package com.nhxv.bookstorebackend.controller;

import com.nhxv.bookstorebackend.dto.AccountOrderDto;
import com.nhxv.bookstorebackend.model.*;
import com.nhxv.bookstorebackend.repository.AccountOrderRepository;
import com.nhxv.bookstorebackend.repository.AccountRepository;
import com.nhxv.bookstorebackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
                                                          @RequestBody String orderStatus) throws Exception {
        AccountOrder accountOrder = this.accountOrderRepository
                .findById(accountOrderId).orElseThrow(() -> new Exception("cannot find order"));
        List<BookOrder> bookOrders = accountOrder.getBookOrders();
        if (orderStatus.equals("COMPLETED")) {
            List<Book> books = bookService.findBooksFromOrder(bookOrders);
            for (Book book : books) { // increment amount purchased of every book order
                BookOrder bookOrder = bookOrders.stream()
                        .filter(order -> order.getBookId() == book.getId())
                        .findFirst().orElse(null);
                assert bookOrder != null;
                long amount = book.getAmountPurchased() + bookOrder.getQuantity();
                book.setAmountPurchased(amount);
            }
        }
        accountOrder.setOrderStatus(OrderStatus.valueOf(orderStatus));
        return ResponseEntity.ok(accountOrder);
    }
}
