import { useEffect, useState} from "react";
import { InputText } from "primereact/inputtext";
import { useLocation } from "react-router-dom";

function InputSearch({ placeholder, emitQuery, emitEnter }) {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const [clearIcon, setClearIcon] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentQuery = searchParams.get("q");
    if (currentQuery) {
      emitQuery(currentQuery);
      setSearchQuery(currentQuery);
      setClearIcon(true);
    } else {
      emitQuery("");
      setSearchQuery("");
      setClearIcon(false);
    }
  }, [location]);

  const onChangeText = (e) => {
    if (!clearIcon) {
      setClearIcon(true);
    }
    emitQuery(e.target.value);
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setClearIcon(false);
    }
  }

  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      // TODO: if search field is blank, display warning instead
      emitEnter();
    }
  }

  const onClearText = () => {
    setClearIcon(false);
    emitQuery("");
    setSearchQuery("");
  }

  return (
    <span className="p-input-icon-right p-input-icon-left mb-4 w-100">
      <i className="pi pi-search"></i>
      <InputText placeholder={placeholder} onChange={onChangeText} value={searchQuery}
      onKeyDown={onSubmitSearch} type="search" className="w-100"></InputText>
      {clearIcon ? <i className="pi pi-times" onClick={onClearText}></i> : <i className="d-none"></i>}
    </span>
  )
}

export default InputSearch;