package com.nhxv.bookstorebackend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id")
    private List<Review> reviews;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "book")
    private Set<BookOrder> bookOrders;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;

    @NotBlank
    @Column
    private String title;

    @NotBlank
    @Column(length = 2000)
    private String description;

    @Column
    private long timePurchased;

    @NotBlank
    @Column
    private BigDecimal unitPrice;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "BOOK_GENRES",
            joinColumns = {@JoinColumn(name = "BOOK_ID")},
            inverseJoinColumns = {@JoinColumn(name = "GENRE_ID")})
    private Set<Genre> genres;

    @Column
    private boolean available;

    public Book() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public Set<BookOrder> getBookOrders() {
        return bookOrders;
    }

    public void setBookOrders(Set<BookOrder> bookOrders) {
        this.bookOrders = bookOrders;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return id == book.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", timePurchased=" + timePurchased +
                ", unitPrice=" + unitPrice +
                ", available=" + available +
                '}';
    }
}
