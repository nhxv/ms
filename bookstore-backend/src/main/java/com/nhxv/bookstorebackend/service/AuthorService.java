package com.nhxv.bookstorebackend.service;

import com.nhxv.bookstorebackend.dto.AuthorDetailDto;
import com.nhxv.bookstorebackend.dto.AuthorDto;
import com.nhxv.bookstorebackend.model.Author;

public interface AuthorService {
    AuthorDto convertToAuthorDto(Author author);
    AuthorDetailDto convertToAuthorDetailDto(Author author);

}
