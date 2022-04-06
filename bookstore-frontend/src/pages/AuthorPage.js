import AuthorList from "../components/AuthorList";
import InputSearch from "../components/InputSearch";
import { Button } from 'primereact/button';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthorPage = () => {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const icons = {
    ascending: "pi pi-sort-alpha-down",
    descending: "pi pi-sort-alpha-up",
  }

  const [nameQuery, setNameQuery] = useState("");  
  const [orderIcon, setOrderIcon] = 
  useState((!searchParams.get("sortDirection") || searchParams.get("sortDirection").toLowerCase() === "asc") ?
    icons.ascending : icons.descending);
  
    const navigate = useNavigate();  

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
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center">
          <Button className="p-button-fade mb-4 mr-3" icon={orderIcon} onClick={onSwitchOrder} />
          <InputSearch placeholder="Search by name" emitQuery={onChangeName} emitEnter={onSubmitSearch} />
        </div>
      </div>
      <div className="col-12">
        <AuthorList />
      </div>
    </div>
  );
}

export default AuthorPage;