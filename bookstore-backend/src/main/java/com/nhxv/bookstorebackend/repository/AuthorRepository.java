package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Author findByName(String name);
    Page<Author> findByNameContainingIgnoreCase(String name, Pageable pageable);
    boolean existsAuthorByName(String name);
}
