package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.AccountOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountOrderRepository extends JpaRepository<AccountOrder, Long> {
}
