package com.nhxv.bookstorebackend.controller;

import com.nhxv.bookstorebackend.exception.ExistException;
import com.nhxv.bookstorebackend.model.Account;
import com.nhxv.bookstorebackend.dto.AccountDto;
import com.nhxv.bookstorebackend.model.CartItem;
import com.nhxv.bookstorebackend.repository.AccountRepository;
import com.nhxv.bookstorebackend.repository.CartItemRepository;
import com.nhxv.bookstorebackend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/accounts")
public class AccountController {
    private AccountRepository accountRepository;
    private CartItemRepository cartItemRepository;
    private AccountService accountService;

    @Autowired
    public AccountController(AccountRepository accountRepository,
                             CartItemRepository cartItemRepository,
                             AccountService accountService) {
        this.accountRepository = accountRepository;
        this.cartItemRepository = cartItemRepository;
        this.accountService = accountService;
    }

    @PreAuthorize("hasAnyRole('CUSTOMER' , 'ADMIN')")
    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccount(@PathVariable long accountId) throws Exception {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new Exception("User not found for id: " + accountId));
        return ResponseEntity.ok().body(account);
    }

    @PreAuthorize("hasAnyRole('CUSTOMER' , 'ADMIN')")
    @GetMapping("/email-search/{email}")
    public ResponseEntity<Account> getAccountByEmail(@PathVariable String email) {
        Account account = accountRepository.findByEmail(email);
        return ResponseEntity.ok().body(account);
    }

    @PostMapping("/register")
    public Account createAccount(@Valid @RequestBody AccountDto account) throws ExistException {
        return accountService.save(account);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @PutMapping("/{accountId}")
    public ResponseEntity<Account> updateAccount(@PathVariable long accountId,
                                                 @Valid @RequestBody Account accountUpdate) throws Exception {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new Exception("User not found for this id: " + accountId));
        account.setName(accountUpdate.getName());
        account.setAddress(accountUpdate.getAddress());
        account.setPhone(accountUpdate.getPhone());
        account.setAccountOrders(accountUpdate.getAccountOrders());
        account.setReviews(accountUpdate.getReviews());
        return ResponseEntity.ok(accountRepository.save(account));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    @PutMapping("/cart-merge/{username}")
    public ResponseEntity<Account> mergeCart(@PathVariable String username,
                                             @Valid @RequestBody List<CartItem> newCart) throws Exception {
        Account account = accountRepository.findByEmail(username);
        if (account == null) {
            throw new Exception("Username not found.");
        }
        account.setCart(newCart);
        return ResponseEntity.ok(accountRepository.save(account));
    }
}
