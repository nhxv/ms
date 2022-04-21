package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.AccountOrder;
import com.nhxv.bookstorebackend.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountOrderRepository extends JpaRepository<AccountOrder, Long> {
    List<AccountOrder> findByAccount_Email(String email);
    List<AccountOrder> findByOrderStatus(OrderStatus orderStatus);
}
