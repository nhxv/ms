select distinct book.*, author.name
from book book
join book_genres book_genres on book.id = book_genres.book_id
join genre genre on book_genres.genre_id = genre.id
join author author on author.id = book.author_id
where (lower(book.title) like lower('%%'))
and (book.unit_price > 0 and book.unit_price < 99)
group by book.id, author.name having
sum(case when genre.name = 'SHONEN' then 1 else 0 end) > 0
order by title asc
limit 9 offset 0;