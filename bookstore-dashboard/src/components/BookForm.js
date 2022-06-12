import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/actions/bookActions";
import { editBook } from "../redux/actions/bookActions";
import { FileUpload } from "primereact/fileupload";
import { Checkbox } from "primereact/checkbox";
import { useEffect } from "react";
import backend from "../redux/api";
import * as yup from "yup";
import { Message } from "primereact/message";

function BookForm({ onHide, bookEdit }) {
  const [imageFile, setImageFile] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [unitPrice, setUnitPrice] = useState((bookEdit ? bookEdit.unitPrice : 0));
  const [chooseButton, setChooseButton] = useState({
    label: (bookEdit ? "Choose different image" : "Choose image"),
    icon: "pi pi-upload",
  })
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let isAuthorSub = true;
    backend.get(`/authors`).then((res) => {
      if (isAuthorSub) {
        const authorsData = res.data;
        setAuthors(authorsData); // this is async
        if (bookEdit) {
          const authorSelected = authorsData.find(author => author.id === bookEdit.author.id);
          setSelectedAuthor(authorSelected);
        }
      }
    });

    let isGenreSub = true;
    backend.get(`/genres`).then((res) => {
      if (isGenreSub) {
        const genresData = res.data;
        setGenres(genresData);
        if (bookEdit) {
          const genresSelected = genresData.filter(genre => bookEdit.genres.find(genreEdit => genreEdit.id === genre.id));
          setSelectedGenres(genresSelected);
        }
      }

      // cleanup function: https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
      return () => {
        isAuthorSub = false;
        isGenreSub = false;
      }

    });
  }, [errorMessage]);

  const bookSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const bookForm = useFormik({
    initialValues: {
      title: (bookEdit ? bookEdit.title : ""),
      description: (bookEdit ? bookEdit.description : ""),
      available: (bookEdit ? bookEdit.available : true),
    },
    validationSchema: bookSchema,
    onSubmit: (basicData) => {
      if (!selectedAuthor || !selectedGenres) {
        setErrorMessage("Invalid");
        return;
      }
      let bookFormData = new FormData();
      bookFormData.append("imageFile", imageFile);
      bookFormData.append("authorId", selectedAuthor.id);
      bookFormData.append("book", JSON.stringify({
        title: basicData.title,
        description: basicData.description,
        genres: selectedGenres,
        unitPrice: unitPrice,
        available: basicData.available,
      }));
      
      if (bookEdit) {
        dispatch(editBook(bookFormData, bookEdit.id))
        .then(() => {
          onHide();
          setImageFile(null);
          setSelectedAuthor(null);
          setSelectedGenres(null);
          bookForm.resetForm();  
        })
        .catch(e => {
          const error = JSON.parse(JSON.stringify(e));
          setErrorMessage(error.message);
        });
      } else {
        dispatch(addBook(bookFormData))
        .then(() => {
          onHide();
          setImageFile(null);
          setSelectedAuthor(null);
          setSelectedGenres(null);
          bookForm.resetForm();  
        })
        .catch(e => {
          // TODO: display error UI
          const error = JSON.parse(JSON.stringify(e));
          setErrorMessage(error.message);
        });
      }
    }
  });

  const onUploadCover = (e) => {
    // TODO: file validation (file size & file type)
    if (imageFile) {
      e.options.clear();
      setImageFile(null);
      setChooseButton({
        label: "Choose image",
        icon: "pi pi-upload",
      })
    } else {
      setImageFile(e.files[0]);
      setChooseButton({
        label: "Cancel upload",
        icon: "pi pi-times",
      });
    }
  }

  const onChangePrice = (e) => {
    // TODO: price validation (price min max)
    setUnitPrice(e.value);
  }

  const isFormFieldValid = (name) => {
    return !!(bookForm.touched[name] && bookForm.errors[name]);
  };

  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error m-0">{bookForm.errors[name]}</small>;
  };

  return (
    <>
      <div className="mb-4">
        <div className="py-3 px-4 row justify-content-center">
          <div className="col-lg-8 col-12">
            {errorMessage ? (<Message severity="error" text={errorMessage} className="mb-4 w-100" />) : (<></>)}
            <form onSubmit={bookForm.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="d-block">Title:</label>
                <InputText id="title" name="title" className="d-block w-100" onBlur={bookForm.handleBlur} 
                value={bookForm.values.title} onChange={bookForm.handleChange} autoFocus />
                {getFormErrorMessage("title")}
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="d-block">Author:</label>
                <Dropdown style={{width: "100%"}} options={authors} value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.value)} optionLabel="name" />
              </div>

              <div className="mb-4">
                <label htmlFor="genres" className="d-block">Genres:</label>
                <MultiSelect value={selectedGenres} options={genres} 
                onChange={(e) => setSelectedGenres(e.value)} 
                optionLabel="name" display="chip"
                style={{width: "100%"}} />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="d-block">Descriptions:</label>
                <InputTextarea id="description" name="description" rows={5} onBlur={bookForm.handleBlur}
                value={bookForm.values.description} onChange={bookForm.handleChange}
                style={{width: "100%"}} />
                {getFormErrorMessage("description")}
              </div>
              
              <div className="mb-4">
                <label htmlFor="currency-us" className="d-block">Unit Price ($):</label>
                <InputNumber inputId="currency-us"
                mode="currency" currency="USD" locale="en-US"
                value={unitPrice} onValueChange={onChangePrice} 
                style={{width: "100%"}} />
              </div>
              
              <div className="mb-4">
                <FileUpload mode="basic" name="image" auto={true} accept="image/*" 
                chooseOptions={chooseButton} customUpload={true} uploadHandler={onUploadCover} />
                {imageFile ? (
                <div className="mt-4">
                  <img src={imageFile.objectURL} alt="upload author cover" 
                  className="d-block" width="112.5" height="170" />
                  <p className="mt-2">
                    <span>{imageFile.name}</span>
                  </p>
                </div>
                ) : <></>}
                {(bookEdit && !imageFile) ? (
                  <div className="mt-4">
                    <img src={bookEdit.image.imagePath} alt="current"
                    className="d-block" width="112.5" height="170" />
                  </div>
                ) : <></>}
              </div>

              <div className="d-flex align-items-center mb-4">
                <Checkbox inputId="available" name="available" 
                onChange={bookForm.handleChange} checked={bookForm.values.available}></Checkbox>
                <label htmlFor="accept" className="ml-2 mt-2">Available to purchase</label>
              </div>
              <Button label="Submit" type="submit" className="mt-2 w-100"></Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookForm;