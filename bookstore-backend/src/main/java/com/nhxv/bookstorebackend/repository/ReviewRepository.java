package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
