import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import { useState } from "react";
import InputSearch from "../components/InputSearch";
import { useLocation, useNavigate } from "react-router-dom";
import BookFilter from "../components/BookFilter";

function BookManagementPage() {
  const [sortType, setSortType] = useState("Title");
  const [genres, setGenres] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 99]);
  
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const [titleQuery, setTitleQuery] = useState("");

  const icons = {
    ascending: "pi pi-sort-amount-down",
    descending: "pi pi-sort-amount-up",
  }
  const [orderIcon, setOrderIcon] = useState(
    (!searchParams.get("sortDirection") || searchParams.get("sortDirection").toLowerCase() === "asc") ?
    icons.ascending : icons.descending);

  const navigate = useNavigate();

  const [displayBookForm, setDisplayBookForm] = useState(false);

  const dialogFuncMap = {
    "displayBookForm": setDisplayBookForm,
  };

  const onOpenBookForm = () => {
    dialogFuncMap["displayBookForm"](true);
  }

  const onHideBookForm = () => {
    dialogFuncMap["displayBookForm"](false);
  }

  const onSwitchOrder = () => {
    if (orderIcon === icons.ascending) {
      setOrderIcon(icons.descending);
      navigate(`/books?` +
      `page=${searchParams.get("page") || "0"}&` +
      `size=${searchParams.get("size") || "9"}&` +
      `sortProperty=${searchParams.get("sortProperty") || "title"}&` +
      `sortDirection=${"desc"}&` + 
      `genres=${(searchParams.get("genres")?.toUpperCase()) || ""}&` +
      `min=${(searchParams.get("min")) || "0"}&` +
      `max=${(searchParams.get("max")) || "99"}&` +
      `q=${searchParams.get("q") || ""}`
      );
    } else {
      setOrderIcon(icons.ascending);
      navigate(`/books?` +
      `page=${searchParams.get("page") || "0"}&` +
      `size=${searchParams.get("size") || "9"}&` +
      `sortProperty=${searchParams.get("sortProperty") || "title"}&` +
      `sortDirection=${"asc"}&` + 
      `genres=${(searchParams.get("genres")?.toUpperCase()) || ""}&` +
      `min=${(searchParams.get("min")) || "0"}&` +
      `max=${(searchParams.get("max")) || "99"}&` +
      `q=${searchParams.get("q") || ""}`
      );
    } 
  }

  const onChangeSortType = (sortProp) => {
    setSortType(sortProp);
  }

  const onChangeGenres = (genresProp) => {
    setGenres(genresProp);
  }

  const onChangePriceRange = (priceRangeProp) => {
    setPriceRange(priceRangeProp);
  }

  const onChangeTitle = (titleQueryProp) => {
    setTitleQuery(titleQueryProp);
  }

  const onSubmitSearch = () => {
    // TODO: validate params
    navigate(`/books?` +
    `page=${0}&` + 
    `size=${9}&` +
    `sortProperty=${sortType}&` +
    `sortDirection=${(orderIcon === icons.ascending ? "asc" : "desc")}&` +
    `genres=${genres.reduce((prev, current) => prev === "" ? prev + current : prev + "," + current, "")}&` +
    `min=${priceRange[0]}&` + 
    `max=${priceRange[1]}&` +
    `q=${titleQuery}`);
  }

  return (
    <section className="mt-5">
      <h5>Book Management</h5>
      <Button label="Add book" icon="pi pi-plus" className="p-button-outlined p-button-secondary" onClick={onOpenBookForm}></Button>
      <Dialog header="Book form" visible={displayBookForm} style={{ width: "50%" }} onHide={onHideBookForm}>
        <BookForm onHide={onHideBookForm} />
      </Dialog>

      <div className="row mt-5">
        <div className="col-lg-3 col-md-5 col-sm-12 col-12 mb-4">
          <BookFilter 
          emitSortType={onChangeSortType} 
          emitGenres={onChangeGenres} 
          emitPriceRange={onChangePriceRange} 
          emitApply={onSubmitSearch}
          />
        </div>

        <div className="col-lg-9 col-md-7 col-sm-12 col-12">
          <div className="d-flex align-items-center">
            <Button className="p-button-secondary mb-4 mr-3" icon={orderIcon} onClick={onSwitchOrder} />
            <InputSearch placeholder="Search by title" emitQuery={onChangeTitle} emitEnter={onSubmitSearch} />
          </div>
          <BookList />
        </div>
      </div>

    </section> 
  )
}

export default BookManagementPage;