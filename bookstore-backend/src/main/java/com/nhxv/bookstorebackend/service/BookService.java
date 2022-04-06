package com.nhxv.bookstorebackend.service;

import com.nhxv.bookstorebackend.dto.BookDto;
import com.nhxv.bookstorebackend.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {
    Page<BookDto> findBooks(Pageable pageable,
                            List<String> genreNames,
                            String minPrice,
                            String maxPrice,
                            String title) throws Exception;
    BookDto convertToBookDto(Book book);
}
