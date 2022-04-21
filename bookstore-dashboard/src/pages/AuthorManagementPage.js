import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AuthorForm from "../components/AuthorForm";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthorList from "../components/AuthorList";
import InputSearch from "../components/InputSearch";

function AuthorManagementPage() {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const icons = {
    ascending: "pi pi-sort-alpha-down",
    descending: "pi pi-sort-alpha-up",
  }

  const [orderIcon, setOrderIcon] = 
  useState((!searchParams.get("sortDirection") || searchParams.get("sortDirection").toLowerCase() === "asc") ?
    icons.ascending : icons.descending);

  const [displayAuthorForm, setDisplayAuthorForm] = useState(false);
  const [nameQuery, setNameQuery] = useState(""); 
  const navigate = useNavigate();

  const dialogFuncMap = {
    "displayAuthorForm": setDisplayAuthorForm,
  };

  const onOpenAuthorForm = () => {
    dialogFuncMap["displayAuthorForm"](true);
  }

  const onHideAuthorForm = () => {
    dialogFuncMap["displayAuthorForm"](false);
  }

  const onSwitchOrder = () => {
    if (orderIcon === icons.ascending) {
      setOrderIcon(icons.descending);
      navigate(`/authors?` +
      `page=${searchParams.get("page") || "0"}&` +
      `size=${searchParams.get("size") || "9"}&` +
      `sortDirection=${"desc"}&` + 
      `q=${searchParams.get("q") || ""}`
      );
    } else {
      setOrderIcon(icons.ascending);
      navigate(`/authors?` +
      `page=${searchParams.get("page") || "0"}&` +
      `size=${searchParams.get("size") || "9"}&` +
      `sortDirection=${"asc"}&` + 
      `q=${searchParams.get("q") || ""}`
      );
    } 
  }

  const onChangeName = (nameQueryProp) => {
    setNameQuery(nameQueryProp);
  }

  const onSubmitSearch = () => {
    // TODO: validate params
    navigate(`/authors?` +
    `page=${0}&` + 
    `size=${12}&` +
    `sortDirection=${(orderIcon === icons.ascending ? "asc" : "desc")}&` +
    `q=${nameQuery}`);
  }

  return (
  <section className="mt-5">
    <h5>All authors</h5>
    <Button label="Add new author" icon="pi pi-plus" className="p-button-outlined p-button-secondary" onClick={onOpenAuthorForm}></Button>
    <Dialog header="Author form" visible={displayAuthorForm} style={{ width: "50%" }} dismissableMask onHide={onHideAuthorForm}>
      <AuthorForm onHide={onHideAuthorForm} />
    </Dialog>

    <div className="d-flex align-items-center mt-5">
      <Button className="p-button-secondary mb-4 mr-3" icon={orderIcon} onClick={onSwitchOrder} />
      <InputSearch placeholder="Search by title" emitQuery={onChangeName} emitEnter={onSubmitSearch} />
    </div>
    <AuthorList />
  </section>)
}

export default AuthorManagementPage;