package com.nhxv.bookstorebackend.service;

import com.nhxv.bookstorebackend.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    Image loadImage(MultipartFile file, String type);
    void saveImage(MultipartFile file, String type) throws IOException;
}
