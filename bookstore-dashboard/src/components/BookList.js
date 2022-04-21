import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BookPanel from "./BookPanel";
import backend from "../redux/api";
import  { Paginator } from "primereact/paginator";
import { useLocation, useNavigate } from "react-router-dom";

function BookList() {
  const [bookList, setBookList] = useState([]);
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  const [first, setFirst] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();

  const isUpdate = useSelector((state) => {
    return state.bookSlice.trigger;
  });

  useEffect(() => {
    setBookList([]);
    if (location.search) { // has any string behind "?"
      searchParams = new URLSearchParams(location.search);
      if ( // minimum params: page, size, sort property, sort direction
        !searchParams.get("page") || 
        !searchParams.get("size") ||
        !searchParams.get("sortProperty") ||
        !searchParams.get("sortDirection")) {
        navigate(`/not-found`);
      }
      let paramsCount = 0;
      searchParams.forEach(() => paramsCount++);
      if (paramsCount === 4) { 
        getBookPageable();
      } else {
        findBooks();
      }
    } else {
      navigate(`/books?page=${0}&size=${9}&sortProperty=${"title"}&sortDirection=${"asc"}`);
    }
  }, [location, isUpdate]);

  const findBooks = () => {
    backend.get(`/books/pageable/search?` +
    `page=${searchParams.get("page") || "0"}&` +
    `size=${searchParams.get("size") || "9"}&` +
    `sortProperty=${(searchParams.get("sortProperty")?.toLowerCase() || "title")}&` +
    `sortDirection=${searchParams.get("sortDirection") || "asc"}&` +
    `genres=${(searchParams.get("genres")) || ""}&` +
    `min=${(searchParams.get("min")) || "0"}&` +
    `max=${(searchParams.get("max")) || "99"}&` +
    `title=${searchParams.get("q") || ""}`)
    .then((res) => {
      if (res.data.content) {
        setBookList(res.data.content);
        setFirst(+searchParams.get("size") * res.data.number);
        setPageSize(res.data.pageable.pageSize);
        setTotalRecords(res.data.totalElements);
      }
    })
    .catch(e => {
      // TODO: display error message
      console.log(e);
    });
  }

  const getBookPageable = () => {
    backend.get(
      `/books/pageable?` + 
      `page=${searchParams.get("page") || "0"}&` +
      `size=${searchParams.get("size") || "9"}&` +
      `sortProperty=${searchParams.get("sortProperty") || "title"}&` +
      `sortDirection=${searchParams.get("sortDirection") || "asc"}`
    )
    .then((res) => {
      if (res.data.content) {
        setBookList(res.data.content);
        setFirst(+searchParams.get("size") * res.data.number);
        setPageSize(res.data.pageable.pageSize);
        setTotalRecords(res.data.totalElements);
      }
    });
  }

  const onPageChange = (e) => {
    if (location.search) {
      navigate(`/books?` + 
      `page=${e.page}&` +
      `size=${(searchParams.get("size")) || "9"}&` +
      `sortProperty=${(searchParams.get("sortProperty")?.toLowerCase() || "title")}&` +
      `sortDirection=${(searchParams.get("sortDirection")) || "asc"}&` +
      `genres=${(searchParams.get("genres")?.toUpperCase()) || ""}&` +
      `min=${(searchParams.get("min")) || "0"}&` +
      `max=${(searchParams.get("max")) || "99"}&` +
      `q=${searchParams.get("q") || ""}`
      );
    } else {
      navigate(`/books?page=${0}&size=${9}&sortProperty=${"title"}&sortDirection=${"asc"}`);
    }
  }

  return (
    <>
      <section>
        <div className="row justify-content-xl-start justify-content-center">
          {bookList ? bookList.map((book) => {
            return (
            <div key={book.id} className="col-xl-4 col-lg-6 col-md-12 mb-4">
              <BookPanel book={book} />
            </div>
            )
          }) : <></>}
        </div>
        <div className="mx-auto pb-4">
          <Paginator first={first} rows={pageSize} totalRecords={totalRecords} 
          onPageChange={onPageChange}></Paginator>
        </div>
      </section>
    </>
  )
}

export default BookList;