package com.nhxv.bookstorebackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhxv.bookstorebackend.dto.BookDto;
import com.nhxv.bookstorebackend.exception.ExistException;
import com.nhxv.bookstorebackend.model.Author;
import com.nhxv.bookstorebackend.model.Book;
import com.nhxv.bookstorebackend.repository.AuthorRepository;
import com.nhxv.bookstorebackend.repository.BookRepository;
import com.nhxv.bookstorebackend.service.BookService;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/books")
public class BookController {
    private final String IMAGE_TYPE = "manga";

    private BookRepository bookRepository;
    private AuthorRepository authorRepository;
    private BookService bookService;
    private ImageService imageService;

    @Autowired
    public BookController(
            BookRepository bookRepository,
            AuthorRepository authorRepository,
            BookService bookService,
            ImageService imageService
    ) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.bookService = bookService;
        this.imageService = imageService;
    }

    @GetMapping
    public List<BookDto> getAll() {
        List<Book> books = this.bookRepository.findAll();
        return books.stream().map(book -> bookService.convertToBookDto(book)).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBook(@PathVariable long id) throws Exception {
        Book book = this.bookRepository.findById(id).orElseThrow(() -> new Exception("Book not found for id: " + id));
        return ResponseEntity.ok().body(this.bookService.convertToBookDto(book));
    }

    @GetMapping("/pageable")
    public Page<BookDto> getBooks(
            @RequestParam(name = "page", defaultValue = "0") String pageParam,
            @RequestParam(name = "size", defaultValue = "9") String sizeParam,
            @RequestParam(name = "sortProperty", defaultValue = "title") String sortProperty,
            @RequestParam(name = "sortDirection", defaultValue = "asc") String sortDirection
    ) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        Pageable pageable;
        if (sortDirection.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sortProperty));
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortProperty));
        }
        return bookRepository.findAll(pageable).map(book -> bookService.convertToBookDto(book));
    }

    @GetMapping("/pageable/search")
    public Page<BookDto> findBooks(
            @RequestParam(name = "page", defaultValue = "0") String pageParam,
            @RequestParam(name = "size", defaultValue = "9") String sizeParam,
            @RequestParam(name = "sortProperty", defaultValue = "title") String sortProperty,
            @RequestParam(name = "sortDirection", defaultValue = "asc") String sortDirection,
            @RequestParam(name = "genres", defaultValue = "") String genresParam,
            @RequestParam(name = "min", defaultValue = "0") String minPrice,
            @RequestParam(name = "max", defaultValue = "99") String maxPrice,
            @RequestParam(name = "title", defaultValue = "") String title
    ) throws Exception {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);
        List<String> genreNames = null;
        if (!genresParam.equals("")) {
            genreNames = new ArrayList<>(Arrays.asList(genresParam.toUpperCase().split(",")));
        }
        Pageable pageable;
        if (sortDirection.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, sortProperty));
        } else {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortProperty));
        }
        return this.bookService.findBooks(pageable, genreNames, minPrice, maxPrice, title);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<BookDto> addBook(
            @RequestParam("imageFile") MultipartFile file,
            @RequestParam("book") String bookParam,
            @RequestParam("authorId") String authorIdParam
    ) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Book book = mapper.readValue(bookParam, Book.class);
        Author author = this.authorRepository
                .findById(Long.parseLong(authorIdParam))
                .orElseThrow(() -> new Exception("Author not found"));
        this.imageService.saveImage(file, IMAGE_TYPE);
        book.setImage(this.imageService.loadImage(file, IMAGE_TYPE));
        book.setAuthor(author);
        Set<Book> books = author.getBooks();
        if (!books.contains(book)) {
            books.add(book);
            author.setBooks(books);
            this.authorRepository.save(author);
            return ResponseEntity.ok(this.bookService.convertToBookDto(book));
        } else {
            throw new ExistException("Book exists");
        }
    }

    // TODO: validate data
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<BookDto> updateBook(
            @PathVariable long id,
            @RequestParam(value="imageFile", required=false) MultipartFile file,
            @RequestParam("authorId") String authorIdParam,
            @RequestParam("book") String bookParam
    ) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Book bookUpdate = mapper.readValue(bookParam, Book.class);
        Book book = this.bookRepository.findById(id).orElseThrow(() -> new Exception("Book not found for id: " + id));

        book.setTitle(bookUpdate.getTitle());
        book.setDescription(bookUpdate.getDescription());
        book.setAmountPurchased(bookUpdate.getAmountPurchased());
        book.setGenres(bookUpdate.getGenres());
        book.setUnitPrice(book.getUnitPrice());
        book.setReviews(bookUpdate.getReviews());

        Author updatedAuthor = this.authorRepository
                .findById(Long.parseLong(authorIdParam))
                .orElseThrow(() -> new Exception("Author not found"));

        if (file != null) {
            if (!file.isEmpty() && file.getSize() > 0) {
                this.imageService.saveImage(file, IMAGE_TYPE);
                book.setImage(this.imageService.loadImage(file, IMAGE_TYPE));
            }
        }

        if (updatedAuthor != null) {
            book.setAuthor(updatedAuthor);
            Set<Book> books = updatedAuthor.getBooks();
            if (!books.contains(book)) {
                books.add(book);
                updatedAuthor.setBooks(books);
                this.authorRepository.save(updatedAuthor); // cascade save the book too
                return ResponseEntity.ok(this.bookService.convertToBookDto(book));
            }
        }

        this.bookRepository.save(book);
        return ResponseEntity.ok(this.bookService.convertToBookDto(book));
    }
}
