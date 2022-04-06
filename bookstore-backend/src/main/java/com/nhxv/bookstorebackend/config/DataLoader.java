package com.nhxv.bookstorebackend.config;


import com.nhxv.bookstorebackend.model.Account;
import com.nhxv.bookstorebackend.model.Genre;
import com.nhxv.bookstorebackend.model.Role;
import com.nhxv.bookstorebackend.repository.AccountRepository;
import com.nhxv.bookstorebackend.repository.GenreRepository;
import com.nhxv.bookstorebackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataLoader implements ApplicationRunner {
    private AccountRepository accountRepository;
    private RoleRepository roleRepository;
    private GenreRepository categoryRepository;

    @Autowired
    public DataLoader(AccountRepository accountRepository,
                      RoleRepository roleRepository,
                      GenreRepository categoryRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
    }

    public void run(ApplicationArguments args) {
        if (this.categoryRepository.findAll().isEmpty()) {
            this.categoryRepository.save(new Genre(Genre.SHONEN));
            this.categoryRepository.save(new Genre(Genre.SEINEN));
            this.categoryRepository.save(new Genre(Genre.ACTION));
            this.categoryRepository.save(new Genre(Genre.ROMANCE));
            this.categoryRepository.save(new Genre(Genre.HORROR));
        }

        if (this.accountRepository.findAll().isEmpty()) {
            Account admin = new Account();
            admin.setEmail("admin@gmail.com");
            admin.setPassword("$2a$12$NVf0eL092tkjpsT6CFUBFOsiX30PZWUWagWxO2g/mLJ8d2BBF.53y");
            admin.setName("Admin");
            admin.setAddress("123 Street");
            admin.setPhone("123456789");
            Set<Role> roles = new HashSet<>();
            roles.add(new Role(Role.ADMIN));
            admin.setRoles(roles);
            admin.setReviews(new ArrayList<>());
            admin.setCart(new ArrayList<>());
            this.accountRepository.save(admin);
            this.roleRepository.save(new Role(Role.USER));
        }

    }
}
