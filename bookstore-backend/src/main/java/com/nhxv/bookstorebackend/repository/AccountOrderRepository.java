package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.AccountOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountOrderRepository extends JpaRepository<AccountOrder, Long> {
    Page<AccountOrder> findByAccount_Email(String email, Pageable pageable);
}
