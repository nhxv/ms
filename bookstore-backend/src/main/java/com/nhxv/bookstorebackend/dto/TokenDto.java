package com.nhxv.bookstorebackend.dto;

import com.nhxv.bookstorebackend.model.CartItem;
import com.nhxv.bookstorebackend.model.Role;

import java.util.List;
import java.util.Set;

public class TokenDto {

    private String email;
    private String token;
    private Set<Role> roles;
    private List<CartItem> cartItems;

    public TokenDto() {}

    public TokenDto(String token, String email, Set<Role> roles, List<CartItem> cartItems) {
        this.token = token;
        this.email = email;
        this.roles = roles;
        this.cartItems = cartItems;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
}
