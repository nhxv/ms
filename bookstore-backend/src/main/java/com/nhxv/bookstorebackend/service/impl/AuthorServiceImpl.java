package com.nhxv.bookstorebackend.service.impl;

import com.nhxv.bookstorebackend.dto.AuthorDetailDto;
import com.nhxv.bookstorebackend.dto.AuthorDto;
import com.nhxv.bookstorebackend.dto.BookDto;
import com.nhxv.bookstorebackend.model.Author;
import com.nhxv.bookstorebackend.service.AuthorService;
import com.nhxv.bookstorebackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorServiceImpl implements AuthorService {
    private BookService bookService;

    @Autowired
    public AuthorServiceImpl(BookService bookService) {
        this.bookService = bookService;
    }

    @Override
    public AuthorDto convertToAuthorDto(Author author) {
        if (author != null) {
            AuthorDto authorDto = new AuthorDto();
            authorDto.setId(author.getId());
            authorDto.setHometown(author.getHometown());
            authorDto.setName(author.getName());
            authorDto.setDob(author.getDob());
            authorDto.setImage(author.getImage());
            return authorDto;
        }
        return null;
    }

    @Override
    public AuthorDetailDto convertToAuthorDetailDto(Author author) {
        if (author != null) {
            AuthorDetailDto authorDetailDto = new AuthorDetailDto();
            authorDetailDto.setId(author.getId());
            authorDetailDto.setHometown(author.getHometown());
            authorDetailDto.setName(author.getName());
            authorDetailDto.setDob(author.getDob());
            authorDetailDto.setImage(author.getImage());
            List<BookDto> booksDto = author.getBooks().stream()
                    .map(book -> this.bookService.convertToBookDto(book))
                    .collect(Collectors.toList());
            authorDetailDto.setBooks(booksDto);
            return authorDetailDto;
        }
        return null;
    }
}
