package com.nhxv.bookstorebackend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/images")
public class ImageController {
    private static final String UPLOAD_PATH = "src/main/resources/upload-images";

    @GetMapping(value = "/{imageName}",  produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable("imageName") String imageName,
                                           @RequestParam("type") String imageType) throws IOException {
        File imgFile;
        switch (imageType) {
            case "author":
                imgFile = new File(UPLOAD_PATH + "/author/" + imageName);
                break;
            case "manga":
                imgFile = new File(UPLOAD_PATH + "/manga/" + imageName);
                break;
            default:
                imgFile = new File(UPLOAD_PATH + "/" + imageName);
                break;
        }
        byte[] bytes = Files.readAllBytes(imgFile.toPath());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
    }

}

