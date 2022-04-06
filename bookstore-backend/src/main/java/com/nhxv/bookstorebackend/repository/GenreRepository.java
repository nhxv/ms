package com.nhxv.bookstorebackend.repository;

import com.nhxv.bookstorebackend.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {}
