package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByEmail(String email);
    boolean existsAccountByEmail(String email);
}
