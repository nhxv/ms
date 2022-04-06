package com.nhxv.bookstorebackend.controller;

import com.nhxv.bookstorebackend.config.JwtTokenUtil;
import com.nhxv.bookstorebackend.model.Account;
import com.nhxv.bookstorebackend.dto.LoginDto;
import com.nhxv.bookstorebackend.dto.TokenDto;
import com.nhxv.bookstorebackend.model.Role;
import com.nhxv.bookstorebackend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;
    private AccountRepository accountRepository;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,
                                    JwtTokenUtil jwtTokenUtil,
                                    AccountRepository accountRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> getToken(@RequestBody LoginDto loginDto) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final Account account = accountRepository.findByEmail(loginDto.getEmail());
        final String token = jwtTokenUtil.generateToken(authentication);
        return ResponseEntity.ok(new TokenDto(token, account.getEmail(), account.getRoles(), account.getCart()));
    }
}
