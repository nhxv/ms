package com.nhxv.bookstorebackend.controller;

import com.nhxv.bookstorebackend.dto.AccountUpdateDto;
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
    private AccountService accountService;

    @Autowired
    public AccountController(AccountRepository accountRepository,
                             AccountService accountService) {
        this.accountRepository = accountRepository;
        this.accountService = accountService;
    }

    @PreAuthorize("hasAnyRole('USER' , 'ADMIN')")
    @GetMapping("/{email}")
    public ResponseEntity<Account> getAccountByEmail(@PathVariable String email) throws Exception {
        Account account = accountRepository.findByEmail(email);
        if (account == null) {
            throw new Exception("Username not found.");
        }
        return ResponseEntity.ok().body(account);
    }

    @PostMapping("/register")
    public Account createAccount(@Valid @RequestBody AccountDto account) throws ExistException {
        return accountService.save(account);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/{username}")
    public ResponseEntity<Account> updateAccount(@PathVariable String username,
                                                 @Valid @RequestBody AccountUpdateDto accountUpdate) throws Exception {
        Account account = accountRepository.findByEmail(username);
        if (account == null) {
            throw new Exception("Username not found.");
        }
        account.setName(accountUpdate.getName());
        account.setAddress(accountUpdate.getAddress());
        account.setPhone(accountUpdate.getPhone());
        return ResponseEntity.ok(accountRepository.save(account));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
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
