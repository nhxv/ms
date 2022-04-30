package com.nhxv.bookstorebackend.dto;

import java.math.BigDecimal;

public class BasicStatsDto {
    private int orderCount;
    private int bookSaleCount;
    private BigDecimal revenue;
    private int customerCount;

    public int getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(int orderCount) {
        this.orderCount = orderCount;
    }

    public int getBookSaleCount() {
        return bookSaleCount;
    }

    public void setBookSaleCount(int bookSaleCount) {
        this.bookSaleCount = bookSaleCount;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }

    public int getCustomerCount() {
        return customerCount;
    }

    public void setCustomerCount(int customerCount) {
        this.customerCount = customerCount;
    }
}
