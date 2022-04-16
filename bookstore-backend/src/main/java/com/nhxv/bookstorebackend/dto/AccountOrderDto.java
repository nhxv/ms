package com.nhxv.bookstorebackend.dto;

import com.nhxv.bookstorebackend.model.BookOrder;
import com.nhxv.bookstorebackend.model.OrderStatus;

import java.math.BigDecimal;
import java.util.List;

public class AccountOrderDto {
    private String accountEmail;
    private String name;
    private String email;
    private String address;
    private String phone;
    private List<BookOrder> bookOrders;
    private BigDecimal totalPrice;

    public String getAccountEmail() {
        return accountEmail;
    }

    public void setAccountEmail(String accountEmail) {
        this.accountEmail = accountEmail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<BookOrder> getBookOrders() {
        return bookOrders;
    }

    public void setBookOrders(List<BookOrder> bookOrders) {
        this.bookOrders = bookOrders;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
