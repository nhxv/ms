package com.nhxv.bookstorebackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ExistException extends Exception {
    private static final long serialVersionUID = 1;
    public ExistException(String message) {super(message);}
}
