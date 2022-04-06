package com.nhxv.bookstorebackend.service.impl;

import com.nhxv.bookstorebackend.exception.ExistException;
import com.nhxv.bookstorebackend.model.Account;
import com.nhxv.bookstorebackend.dto.AccountDto;
import com.nhxv.bookstorebackend.model.Role;
import com.nhxv.bookstorebackend.repository.AccountRepository;
import com.nhxv.bookstorebackend.repository.RoleRepository;
import com.nhxv.bookstorebackend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Service(value = "userService")
public class AccountServiceImpl implements UserDetailsService, AccountService {
    private AccountRepository accountRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository,
                              RoleRepository roleRepository,
                              BCryptPasswordEncoder bcryptEncoder) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.bcryptEncoder = bcryptEncoder;
    }

    // use email as username
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account accountDto = accountRepository.findByEmail(email);
        if (accountDto == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(accountDto.getEmail(), accountDto.getPassword(), getAuthority(accountDto));
    }

    private Set<SimpleGrantedAuthority> getAuthority(Account accountDto) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        accountDto.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    @Override
    public Account save(AccountDto accountDto) throws ExistException {
        if (!this.accountRepository.existsAccountByEmail(accountDto.getEmail())) {
            Account newAccount = new Account();
            // auto set role to CUSTOMER -> sql id = 2
            Role accountRole = this.roleRepository.findById(Long.valueOf(2)).get();
            Set<Role> roles = new HashSet<>();
            roles.add(accountRole);
            newAccount.setEmail(accountDto.getEmail());
            newAccount.setPassword(bcryptEncoder.encode(accountDto.getPassword()));
            newAccount.setName(accountDto.getName());
            newAccount.setAddress(accountDto.getAddress());
            newAccount.setPhone(accountDto.getPhone());
            newAccount.setRoles(roles);
            newAccount.setReviews(new ArrayList<>());
            newAccount.setCart(new ArrayList<>());
            return accountRepository.save(newAccount);
        }
        throw new ExistException("Email already exists");
    }
}
