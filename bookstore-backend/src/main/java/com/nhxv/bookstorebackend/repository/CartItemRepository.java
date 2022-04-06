package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
