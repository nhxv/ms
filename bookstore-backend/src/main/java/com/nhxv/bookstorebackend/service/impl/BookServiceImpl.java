package com.nhxv.bookstorebackend.service.impl;

import com.nhxv.bookstorebackend.dto.AuthorDto;
import com.nhxv.bookstorebackend.dto.BookDto;
import com.nhxv.bookstorebackend.model.Book;
import com.nhxv.bookstorebackend.model.BookOrder;
import com.nhxv.bookstorebackend.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Page<BookDto> findBooks(Pageable pageable,
                                   List<String> genreNames,
                                   String minPrice,
                                   String maxPrice,
                                   String title) throws Exception {
        String selectStr = "select distinct ";
        StringBuilder sqlQuery = new StringBuilder(
                "book.*, author.name " + "from bookstore.book book " +
                "join bookstore.book_genres book_genres on book.id = book_genres.book_id " +
                "join bookstore.genre genre on book_genres.genre_id = genre.id " +
                "join bookstore.author author on author.id = book.author_id ");
        sqlQuery.append("where (lower(book.title) like lower('%").append(title).append("%')) ");
        sqlQuery.append("and (book.unit_price > ").append(minPrice)
                .append(" and book.unit_price < ").append(maxPrice)
                .append(") ");
        sqlQuery.append("group by book.id, author.name ");
        if (genreNames != null && !genreNames.isEmpty()) {
            sqlQuery.append("having ");
            Iterator<String> iterator = genreNames.iterator();
            while (iterator.hasNext()) {
                String genreName = iterator.next();
                sqlQuery.append("sum(case when genre.name = '").append(genreName).append("' then 1 else 0 end) > 0");
                if (iterator.hasNext()) {
                    sqlQuery.append(" and ");
                }
            }
        }
        Sort sort = pageable.getSort();
        for (Sort.Order order : sort) {
            if (order.getProperty().equals("title")) {
                sqlQuery.append(" order by ").append(order.getProperty()).append(" ").append(order.getDirection());
            } else if (order.getProperty().equals("author")) {
                sqlQuery.append(" order by author.name ").append(order.getDirection());
            } else if (order.getProperty().equals("popularity")) {
                sqlQuery.append(" order by amount_purchased ").append(order.getDirection());
            }
        }
        sqlQuery.append(" limit ").append(pageable.getPageSize()).append(" offset ").append(pageable.getOffset());
        sqlQuery.append(";");
        Query booksQuery = entityManager.createNativeQuery(selectStr + sqlQuery, Book.class);
        List<Book> books = booksQuery.getResultList();
        if (books == null || books.isEmpty()) {
            throw new Exception("Cannot find any item matching the requirements");
        }
        long total = 0;
        Query countQuery = entityManager.createNativeQuery(selectStr + "count(*) over() as total, " + sqlQuery);
        List<Object[]> objects = countQuery.getResultList();
        total = Long.parseLong(String.valueOf(objects.get(0)[0]));
        List<BookDto> bookDtos = books.stream().map(book -> convertToBookDto(book)).collect(Collectors.toList());
        return new PageImpl<>(bookDtos, pageable, total);
    }

    @Override
    public List<Book> findBooksFromOrder(List<BookOrder> bookOrders) throws Exception {
        String selectStr = "select distinct ";
        StringBuilder sqlQuery = new StringBuilder("book.* from bookstore.book book where ");
        Iterator<BookOrder> iterator = bookOrders.iterator();
        while (iterator.hasNext()) {
            BookOrder bookOrder = iterator.next();
            sqlQuery.append("book.id = ").append(bookOrder.getBookId());
            if (iterator.hasNext()) {
                sqlQuery.append(" or ");
            }
        }
        sqlQuery.append(";");
        Query booksQuery = entityManager.createNativeQuery(selectStr + sqlQuery, Book.class);
        List<Book> books = booksQuery.getResultList();
        if (books == null || books.isEmpty()) {
            throw new Exception("Cannot find any item matching the requirements");
        }
        return books;
    }

    @Override
    public BookDto convertToBookDto(Book book) {
        if (book != null) {
            BookDto bookDto = new BookDto();
            bookDto.setId(book.getId());

            AuthorDto authorDto = new AuthorDto();
            authorDto.setId(book.getAuthor().getId());
            authorDto.setName(book.getAuthor().getName());
            authorDto.setHometown(book.getAuthor().getHometown());
            authorDto.setDob(book.getAuthor().getDob());
            authorDto.setImage(book.getAuthor().getImage());
            bookDto.setAuthor(authorDto);

            bookDto.setTitle(book.getTitle());
            bookDto.setImage(book.getImage());
            bookDto.setDescription(book.getDescription());
            bookDto.setAmountPurchased(book.getAmountPurchased());
            bookDto.setUnitPrice(book.getUnitPrice());
            bookDto.setGenres(book.getGenres());
            bookDto.setAvailable(book.isAvailable());
            return bookDto;
        }
        return null;
    }
}
