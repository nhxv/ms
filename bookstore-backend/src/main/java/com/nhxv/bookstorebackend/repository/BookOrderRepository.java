package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.BookOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookOrderRepository extends JpaRepository<BookOrder, Long> {
}
