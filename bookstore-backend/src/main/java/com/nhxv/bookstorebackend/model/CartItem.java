package com.nhxv.bookstorebackend.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @Column
    private long bookId;

    @Column
    private String imageUrl;

    @Column
    private String title;

    @Column
    private int quantity;

    @Column
    private BigDecimal unitPrice;

    @Column
    private String authorName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItem cartItem = (CartItem) o;
        return id == cartItem.id && bookId == cartItem.bookId && quantity == cartItem.quantity && Objects.equals(imageUrl, cartItem.imageUrl) && Objects.equals(title, cartItem.title) && Objects.equals(unitPrice, cartItem.unitPrice) && Objects.equals(authorName, cartItem.authorName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, bookId, imageUrl, title, quantity, unitPrice, authorName);
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "bookId=" + bookId +
                ", title='" + title + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
