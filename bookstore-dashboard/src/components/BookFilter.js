import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function BookFilter({ emitSortType, emitGenres, emitPriceRange, emitApply }) {
  const navigate = useNavigate();
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);

  const [priceRange, setPriceRange] = useState([0, 99]);
  const [genres, setGenres] = useState([]);
  const [sortType, setSortType] = useState("title");
  
  useEffect(() => {
    if (location.search) {
      searchParams = new URLSearchParams(location.search);
      if (
        !searchParams.get("page") || 
        !searchParams.get("size") ||
        !searchParams.get("sortProperty") ||
        !searchParams.get("sortDirection")) {
        navigate(`/not-found`);
      }
      const min = +searchParams?.get("min") || 0;
      const max = +searchParams?.get("max") || 99;
      emitPriceRange([min, max]);
      setPriceRange([min, max]);
      const genresParam = searchParams?.get("genres")?.split(",") || [];
      emitGenres(genresParam);
      setGenres(genresParam);
      const sortProperty = searchParams?.get("sortProperty") || "title";
      emitSortType(sortProperty);
      setSortType(sortProperty);
    }
  }, [location]);

  const onGenreChange = (e) => {
    let selectedGenres = [...genres];
    if (e.checked) {
      selectedGenres.push(e.value);
    } else {
      selectedGenres.splice(selectedGenres.indexOf(e.value), 1); // remove unchecked element
    }
    emitGenres(selectedGenres);
    setGenres(selectedGenres);
  }

  const onSortChange = (e) => {
    emitSortType(e.value);
    setSortType(e.value);
  }

  const onPriceRangeChange = (e) => {
    emitPriceRange(e.value);
    setPriceRange(e.value);
  }

  const onApply = () => {
    emitApply();
  }

  return (
    <section>
      <Card>
        <div className="p-4">
          <h6 className="mt-0">Sort by</h6>
          <div className="d-flex">
            <RadioButton inputId="sort1" name="sortType" value="title" 
            onChange={onSortChange} checked={sortType === "title"}></RadioButton>
            <label htmlFor="sort1" className="ml-2">Title</label>
          </div>
          <div className="d-flex">
            <RadioButton inputId="sort2" name="sortType" value="author" 
            onChange={onSortChange} checked={sortType === "author"}></RadioButton>
            <label htmlFor="sort2" className="ml-2">Author</label>
          </div>
          <div className="d-flex">
            <RadioButton inputId="sort3" name="sortType" value="popularity" 
            onChange={onSortChange} checked={sortType === "popularity"}></RadioButton>
            <label htmlFor="sort2" className="ml-2">Popularity</label>
          </div>

          <h6 className="mt-4">Genres</h6>
          <div className="d-flex">
            <Checkbox inputId="shonen" value="SHONEN" onChange={onGenreChange} checked={genres.includes("SHONEN")} />
            <label htmlFor="shonen" className="ml-2">Shonen</label>
          </div>
          <div className="d-flex">
            <Checkbox inputId="seinen" value="SEINEN" onChange={onGenreChange} checked={genres.includes("SEINEN")} />
            <label htmlFor="seinen" className="ml-2">Seinen</label>
          </div>
          <div className="d-flex">
            <Checkbox inputId="action" value="ACTION" onChange={onGenreChange} checked={genres.includes("ACTION")} />
            <label htmlFor="action" className="ml-2">Action</label>
          </div>
          <div className="d-flex">
            <Checkbox inputId="romance" value="ROMANCE" onChange={onGenreChange} checked={genres.includes("ROMANCE")} />
            <label htmlFor="romance" className="ml-2">Romance</label>
          </div>
          <div className="d-flex">
            <Checkbox inputId="horror" value="HORROR" onChange={onGenreChange} checked={genres.includes("HORROR")} />
            <label htmlFor="horror" className="ml-2">Horror</label>
          </div>

          <h6 className="mt-4">Price range</h6>
          <Slider className="my-4" value={priceRange} onChange={onPriceRangeChange} range />
          <span>${priceRange[0]}</span>
          <span className="float-right">${priceRange[1]}</span>

          <Button label="Apply filter" className="p-button-outlined mt-4 w-100" onClick={onApply}></Button>
        </div>
      </Card>
    </section>
  );
}

export default BookFilter;