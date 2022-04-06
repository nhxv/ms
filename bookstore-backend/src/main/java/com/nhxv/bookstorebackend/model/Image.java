package com.nhxv.bookstorebackend.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "image")
public class Image {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "path")
    private String imagePath;

    public Image() {
        super();
    }

    public Image(String name, String type, String imagePath) {
        this.name = name;
        this.type = type;
        this.imagePath = imagePath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return Objects.equals(id, image.id) && Objects.equals(name, image.name) && Objects.equals(type, image.type) && Objects.equals(imagePath, image.imagePath);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, imagePath);
    }
}
