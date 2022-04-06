import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import BookPanel from "./BookPanel";
import backend from "../redux/api";
import  { Paginator } from 'primereact/paginator';

function BookList() {
  const [bookList, setBookList] = useState([]);
  const [first, setFirst] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const isUpdate = useSelector((state) => {
    return state.bookSlice.trigger;
  });

  useEffect(() => {
    setBookList([]);
    getBookPageable();
  }, [isUpdate]);

  const onPageChange = (e) => {
    getBookPageable(e.page);
  }

  const getBookPageable = (page = 0, size = 9) => {
    backend.get(`/books/pageable?page=${page}&size=${size}`).then((res) => {
      if (res.data.content) {
        setBookList(res.data.content);
        setFirst(size * res.data.number);
        setPageSize(res.data.pageable.pageSize);
        setTotalRecords(res.data.totalElements);
      }
    });
  }

  return (
    <>
      <section className="mt-5">
        <div className="row">
          {bookList ? bookList.map((book) => {
            return (
            <div key={book.id} className="col-lg-4 col-12 mb-4">
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