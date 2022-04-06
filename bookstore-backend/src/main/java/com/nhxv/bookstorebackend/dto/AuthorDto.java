package com.nhxv.bookstorebackend.dto;

import com.nhxv.bookstorebackend.model.Image;

import java.util.Date;

public class AuthorDto {
    private long id;
    private String name;
    private String hometown;
    private Date dob;
    private Image image;

    public AuthorDto() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
