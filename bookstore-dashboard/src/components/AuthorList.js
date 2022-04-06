import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import backend from '../redux/api';
import AuthorPanel from './AuthorPanel';
import  { Paginator } from 'primereact/paginator';

function AuthorList() {
  const [authorList, setAuthorList] = useState([]);
  const [first, setFirst] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const isUpdate = useSelector((state) => {
    return state.authorSlice.trigger; 
  });

  useEffect(() => {
    setAuthorList([]); // avoid making GET request with image data from previous state

    // get first page
    getAuthorPageable();
      
  }, [isUpdate]);

  const onPageChange = (e) => {
    setFirst(e.first);
    getAuthorPageable(e.page);
  }

  const getAuthorPageable = (page = 0, size = 9) => {
    backend.get(`/authors/pageable?page=${page}&size=${size}`).then((res) => {
      if (res.data.content) {
        setAuthorList(res.data.content);
        setPageSize(res.data.pageable.pageSize);
        setTotalRecords(res.data.totalElements);
      }
    });
  }

  return (
  <>
    <section className="mt-5">
      <div className="row">
        {authorList ? authorList.map((author) => {
          return (
          <div key={author.id} className="col-lg-4 col-12 mb-4">
            <AuthorPanel author={author} />
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

export default AuthorList;