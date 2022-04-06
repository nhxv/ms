package com.nhxv.bookstorebackend.service;


import com.nhxv.bookstorebackend.exception.ExistException;
import com.nhxv.bookstorebackend.model.Account;
import com.nhxv.bookstorebackend.dto.AccountDto;

public interface AccountService {
    Account save(AccountDto user) throws ExistException;
}
