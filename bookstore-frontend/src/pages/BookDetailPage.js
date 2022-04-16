import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import backend from "../redux/api";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { add, addAsync } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import Spinner from "../components/Spinner";

function BookDetailPage() {
  const addedToast = useRef(null);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [book, setBook] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(quantities[0]);
  const isAuth = useSelector(state => state.authSlice.isAuth);
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setBook(null);
    const id = +bookId;
    if (!Number.isInteger(id) || id <= 0) {
      navigate(`/not-found`);
    } else {
      backend.get(`/books/${id}`).then((res) => {
        let bookData = res.data;
        setBook({
          id: bookData.id,
          title: bookData.title,
          author: bookData.author,
          image: bookData.image,
          description: bookData.description,
          unitPrice: bookData.unitPrice,
          genres: bookData.genres,
        });
      }).catch(err => {
        navigate(`/not-found`);
      });
    }
  }, [bookId]);

  const onAddToCart = () => {
    if (isAuth) {
      dispatch(addAsync({
        bookId: book.id,
        imageUrl: book.image.imagePath,
        title: book.title,
        unitPrice: book.unitPrice,
        quantity: selectedQuantity,
        authorName: book.author.name,
      }))
      .then(() => {
        // TODO: display success toast
        addedToast.current.show({
          severity: "success",
          summary: "Added", 
          detail: "Added manga to cart",
          life: 1000,
        }); 
      })
      .catch((e) => {
        console.log(e);
        // TODO: display error toast
        addedToast.current.show({
          severity: "error",
          summary: "Failed", 
          detail: "Fail to add manga to cart",
          life: 1000,
        }); 
      });
    } else {
      dispatch(add({
        bookId: book.id,
        imageUrl: book.image.imagePath,
        title: book.title,
        unitPrice: book.unitPrice,
        quantity: selectedQuantity,
        authorName: book.author.name,
      }));
      addedToast.current.show({
        severity: "success",
        summary: "Added", 
        detail: "Added manga to cart",
        life: 1000,
      }); 
    }
  }

  if (!book) {
    return (
    <>
      <Spinner />
    </>
    )
  } else {
    return (
      <>
        <Toast ref={addedToast} position="bottom-center" />
        <div className="row mt-4">
          <div className="col-lg-4 col-sm-6">
            {/* original size: 225 x 350 -> 9 x 14 */}
            <img src={book?.image.imagePath} alt="" className="d-block mb-3" width="225" height="350" />

            <p className="p-text-secondary mb-1">Quantity:</p>
            <Dropdown value={selectedQuantity} options={quantities} placeholder="Quantity" scrollHeight="230px"
            onChange={(e) => setSelectedQuantity(e.value)} style={{width: "225px"}} className="mb-3"/>

            <div style={{width: "225px"}} className="d-flex justify-content-between align-items-center">
              <span className="p-text-secondary">Price:</span>
              <span className="mt-0" style={{fontSize: "1.5rem", fontWeight: "600"}}>
                ${book.unitPrice * selectedQuantity}
              </span>
            </div>
            <Button label="Add to cart" className="mb-4 mt-3 d-block" style={{width: "225px"}} onClick={onAddToCart}/>


          </div>
          <div className="col-lg-8 col-sm-6">
            <p className="p-text-secondary mb-0">Title:</p>
            <p className="mt-0 mb-3">{book.title}</p>
            <p className="p-text-secondary mb-0">Author:</p>
            <span onClick={() => navigate(`/authors/${book.author.id}`)}
            className="mt-0 mb-3 p-text-link">{book.author.name}</span>
            <p className="p-text-secondary mt-3 mb-1">Genres:</p>
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
      </>
    );
  }

}

export default BookDetailPage;