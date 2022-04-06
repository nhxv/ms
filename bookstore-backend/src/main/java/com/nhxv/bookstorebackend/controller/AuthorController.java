package com.nhxv.bookstorebackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhxv.bookstorebackend.dto.AuthorDetailDto;
import com.nhxv.bookstorebackend.dto.AuthorDto;
import com.nhxv.bookstorebackend.exception.ExistException;
import com.nhxv.bookstorebackend.model.Author;
import com.nhxv.bookstorebackend.repository.AuthorRepository;
import com.nhxv.bookstorebackend.service.AuthorService;
import com.nhxv.bookstorebackend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/authors")
public class AuthorController {
    private final String IMAGE_TYPE = "author";

    private AuthorRepository authorRepository;
    private AuthorService authorService;
    private ImageService imageService;

    @Autowired
    public AuthorController(AuthorRepository authorRepository,
                            AuthorService authorService,
                            ImageService imageService) {
        this.authorRepository = authorRepository;
        this.authorService = authorService;
        this.imageService = imageService;
    }

    @GetMapping
    public List<AuthorDto> getAllAuthors() {
        return this.authorRepository.findAll().stream()
                .map(author -> authorService.convertToAuthorDto(author)).collect(Collectors.toList());
    }

    @GetMapping("/pageable")
    public Page<AuthorDto> getAuthors(@RequestParam(name = "page", defaultValue = "0") String pageParam,
                                      @RequestParam(name = "size", defaultValue = "12") String sizeParam,
                                      @RequestParam(name = "sortDirection", defaultValue = "asc") String sortDirection
    ) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable;
        if (sortDirection.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "name"));
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "name"));
        }
        return this.authorRepository.findAll(pageable).map(author -> authorService.convertToAuthorDto(author));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorDetailDto> getAuthorById(@PathVariable long id) throws Exception {
        Author author = this.authorRepository.findById(id).orElseThrow(() -> new Exception("Author not found for id: " + id));
        return ResponseEntity.ok().body(this.authorService.convertToAuthorDetailDto(author));
    }

    @GetMapping("/pageable/search")
    public Page<AuthorDto> findByNameContaining(
            @RequestParam(name = "page") String pageParam,
            @RequestParam(name = "size") String sizeParam,
            @RequestParam(name = "sortDirection", defaultValue = "asc") String sortDirection,
            @RequestParam(name = "name", defaultValue = "") String nameParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable;
        if (sortDirection.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "name"));
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "name"));
        }
        System.out.println("before find author");
        return this.authorRepository.findByNameContainingIgnoreCase(nameParam, pageable)
                .map(author -> authorService.convertToAuthorDto(author));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<AuthorDto> addAuthor(@RequestParam("imageFile") MultipartFile file,
                                            @RequestParam("author") String authorParam) throws ExistException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        Author author = mapper.readValue(authorParam, Author.class);
        if (!this.authorRepository.existsAuthorByName(author.getName())) {
            this.imageService.saveImage(file, IMAGE_TYPE);
            author.setImage(this.imageService.loadImage(file, IMAGE_TYPE));
            this.authorRepository.save(author);
            return ResponseEntity.ok(this.authorService.convertToAuthorDto(author));
        } else {
            throw new ExistException("Author exist");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthorDto> updateAuthor(@PathVariable long id,
                                               @RequestParam(value="imageFile", required=false) MultipartFile file,
                                               @RequestParam("author") String authorParam) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Author authorUpdate = mapper.readValue(authorParam, Author.class);
        Author author = this.authorRepository.findById(id).orElseThrow(() -> new Exception("Author not found for id: " + id));
        author.setName(authorUpdate.getName());
        author.setHometown(authorUpdate.getHometown());
        author.setDob(authorUpdate.getDob());
        if (file != null) {
            if (!file.isEmpty() && file.getSize() > 0) {
                this.imageService.saveImage(file, IMAGE_TYPE);
                author.setImage(this.imageService.loadImage(file, IMAGE_TYPE));
            }
        }
        this.authorRepository.save(author);
        return ResponseEntity.ok(this.authorService.convertToAuthorDto(author));
    }
}
