import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import BookForm from "./BookForm";
import backend from '../redux/api';
import { useSelector } from 'react-redux';

function BookDetail() {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();
  let navigate = useNavigate();
  const [displayBookForm, setDisplayBookForm] = useState(false);
  const isUpdate = useSelector(state => state.bookSlice.trigger);

  useEffect(() => {
    setBook(null);
    backend.get(`/books/${bookId}`).then((res) => {
      let bookData = res.data;
      setBook({
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        image: bookData.image,
        description: bookData.description,
        unitPrice: bookData.unitPrice,
        genres: bookData.genres,
        available: bookData.available,
      })
    });
  }, [isUpdate]);

  const dialogFuncMap = {
    "displayBookForm": setDisplayBookForm,
  };

  const onOpenBookForm = () => {
    dialogFuncMap["displayBookForm"](true);
  }

  const onHideBookForm = () => {
    dialogFuncMap["displayBookForm"](false);
  }

  if (!book) {
    return (<></>)
  } else {
    return (
      <>
        <section>
          <h5 className="mt-5">Book Info</h5>
          <div className="row mt-4">
            <div className="col-lg-4 col-sm-6">
              {/* original size: 225 x 350 -> 9 x 14 */}
              <img src={book.image.imagePath} alt="" className="d-block mb-4" width="225" height="350" />
              <Button label="Edit book info" className="p-button-fade p-button-secondary mb-4"
              style={{width: '225px'}} onClick={onOpenBookForm}/>
              <Dialog header="Book form" visible={displayBookForm} style={{ width: "50%" }} onHide={onHideBookForm} dismissableMask>
                <BookForm onHide={onHideBookForm} bookEdit={book} />
              </Dialog>
            </div>
            <div className="col-lg-8 col-sm-6">
              <p className="p-text-secondary mb-0">Title:</p>
              <p className="mt-0 mb-3">{book.title}</p>
              <p className="p-text-secondary mb-0">Author:</p>
              <p onClick={() => navigate(`/authors/${book.author.id}`)}
              className="mt-0 mb-3 p-text-link">{book.author.name}</p>
              <p className="p-text-secondary mb-1">Genres:</p>
              <div>
                {book.genres.map((genre) => {
                return (
                <Tag key={genre.id} rounded className="mr-2 p-tag-fade-secondary">
                  <span onClick={() => navigate(`/books?page=0&size=9&sortProperty=title&sortDirection=asc&genres=${genre.name}`)}>
                    {genre.name.toLowerCase()}
                  </span>
                </Tag>
                )
                })}
              </div>
              <p className="p-text-secondary mb-0 mt-4">Description:</p>
              <p className="mt-0 mb-3" style={{whiteSpace: "pre-wrap"}}>{book.description}</p>
            </div>
          </div>
        </section>
      </>
      )
  }


}

export default BookDetail;