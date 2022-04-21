import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import backend from "../redux/api";
import AuthorPanel from "./AuthorPanel";
import  { Paginator } from "primereact/paginator";
import { useLocation, useNavigate } from "react-router-dom";

function AuthorList() {
  const [authorList, setAuthorList] = useState([]);

  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const [first, setFirst] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const isUpdate = useSelector((state) => {
    return state.authorSlice.trigger; 
  });

  const navigate = useNavigate();

  useEffect(() => {
    setAuthorList([]);
    if (location.search) {
      searchParams = new URLSearchParams(location.search);
      if ( // minimum params: page, size, sort direction
        !searchParams.get("page") || 
        !searchParams.get("size") ||
        !searchParams.get("sortDirection")) {
        navigate(`/not-found`);
      }
      let paramsCount = 0;
      searchParams.forEach(() => paramsCount++);
      if (paramsCount === 3) { 
        getAuthorPageable();
      } else {
        findAuthors();
      }
    } else {
      navigate(`/authors?page=${0}&size=${12}&sortDirection=${"asc"}`);
    }
  }, [location, isUpdate]);

  const findAuthors = () => {
    backend.get(`/authors/pageable/search?` + 
    `page=${searchParams.get("page") || "0"}&` +
    `size=${searchParams.get("size") || "12"}&` +
    `sortDirection=${searchParams.get("sortDirection") || "asc"}&` +
    `name=${searchParams.get("q") || ""}`)
    .then((res) => {
      if (res.data.content) {
        console.log(res.data.content);
        setAuthorList(res.data.content);
        setFirst(+searchParams.get("size") * res.data.number);
        setPageSize(res.data.pageable.pageSize);
        setTotalRecords(res.data.totalElements);
      }
    })
    .catch(e => {
      // TODO: display error message
      console.log(e);
    });
    ;
  }

  const getAuthorPageable = () => {
    backend.get(
      `/authors/pageable?` + 
      `page=${searchParams.get("page") || "0"}&` + 
      `size=${searchParams.get("size") || "12"}&` +
      `sortDirection=${searchParams.get("sortDirection") || "asc"}`)
    .then((res) => {
      if (res.data.content) {
        setAuthorList(res.data.content);
        setFirst(+searchParams.get("size") * res.data.number);
        setPageSize(res.data.pageable.pageSize);
        setTotalRecords(res.data.totalElements);
      }
    });
  }

  const onPageChange = (e) => {
    if (location.search) {
      navigate(`/authors?` + 
      `page=${e.page}&` +
      `size=${(searchParams.get("size")) || "12"}&` +
      `sortDirection=${(searchParams.get("sortDirection")) || "asc"}&` +
      `q=${searchParams.get("q") || ""}`);
    } else {
      navigate(`/authors?page=${e.page}&size=${searchParams.get("size")}&sortDirection=${"asc"}`);
    }
  }

  return (
  <>
    <section>
      <div className="row">
        {authorList ? authorList.map((author) => {
          return (
          <div key={author.id} className="col-lg-4 col-md-6 col-12 mb-4">
            <AuthorPanel author={author} />
          </div>
          )
        }) : <></>}
      </div>

      <div className="mx-auto pb-4">
       <Paginator first={first} rows={pageSize} totalRecords={totalRecords} onPageChange={onPageChange} />
      </div>

    </section>
  </>
  )
}

export default AuthorList;