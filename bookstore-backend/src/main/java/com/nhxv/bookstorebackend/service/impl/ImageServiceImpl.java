package com.nhxv.bookstorebackend.service.impl;

import com.nhxv.bookstorebackend.model.Image;
import com.nhxv.bookstorebackend.service.ImageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageServiceImpl implements ImageService {
    private static final String UPLOAD_PATH = "src/main/resources/upload-images";

    @Override
    public Image loadImage(MultipartFile file, String type) {
        Image image = new Image(file.getOriginalFilename(), file.getContentType(),
                "http://localhost:8080/api/images/" + file.getOriginalFilename() + "?type=" + type);
        return image;
    }

    @Override
    public void saveImage(MultipartFile file, String type) throws IOException {
        String imagePath = UPLOAD_PATH + "/" + type + "/" + file.getOriginalFilename();
        Path path = Paths.get(imagePath);
        Files.write(path, file.getBytes());
    }
}
