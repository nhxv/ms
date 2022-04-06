package com.nhxv.bookstorebackend.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table
public class Genre {
    public static final String SHONEN = "SHONEN";
    public static final String SEINEN = "SEINEN";
    public static final String ACTION = "ACTION";
    public static final String ROMANCE = "ROMANCE";
    public static final String HORROR = "HORROR";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @Column(length = 20)
    private String name;

    public Genre(String name) {
        this.name = name;
    }

    public Genre() {}

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Genre genre = (Genre) o;
        return Objects.equals(name, genre.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
