package com.nhxv.bookstorebackend.dto;

import com.nhxv.bookstorebackend.model.Genre;
import com.nhxv.bookstorebackend.model.Image;
import java.math.BigDecimal;
import java.util.Set;

public class BookDto {
    private long id;
    private AuthorDto author;
    private String title;
    private Image image;
    private String description;
    private long timePurchased;
    private BigDecimal unitPrice;
    private Set<Genre> genres;
    private boolean available;

    public BookDto() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public AuthorDto getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDto author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getTimePurchased() {
        return timePurchased;
    }

    public void setTimePurchased(long timePurchased) {
        this.timePurchased = timePurchased;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
