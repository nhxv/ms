package com.nhxv.bookstorebackend.dto;

import java.util.Date;

public class OrderUpdateDto {
    public String status;
    public Date date;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
