import React, { useState, useEffect } from "react";
import Spinner from "../atoms/Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  getSearchedCities,
  reset,
} from "../../features/searchedCities/searchedCitesSlice";

function Search({
  showSearchingSection,
  setShowSearchingSection,
  setLocation,
}) {
  const [inputValue, setInputValue] = useState(" ");
  const [city, setCity] = useState(" ");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchedCities(city));
  }, [dispatch, city]);

  const { searchedCities, error, loading, message } = useSelector(
    (state) => state.searchedCities
  );

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  function search(e) {
    e.preventDefault();
    setCity(e.target[0].value);
  }

  return (
    <>
      <div
        className="search-section show"
        style={{
          transform: showSearchingSection
            ? "translateX(0%)"
            : "translateX(-100%)",
          opacity: showSearchingSection ? 1 : 0.7,
        }}
      >
        <button
          className="search-section-close_button"
          onClick={() => {
            setShowSearchingSection(false);
            setInputValue("");
            setCity(" ");
          }}
        >
          &#10005;
        </button>
        <form className="search-section-form" onSubmit={search}>
          <input
            value={inputValue}
            name="search"
            type="search"
            onChange={onChange}
            style={{ fontFamily: "Raleway, FontAwesome" }}
            className="search-section-form-input fa"
            placeholder="&#xF002;   search location"
          />
          <button className="search-section-form-button">Search</button>
        </form>
        <ul className="search-section-list">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          ) : loading ? (
            <Spinner />
          ) : (
            searchedCities?.map((city, index) => (
              <li
                key={index}
                onClick={() => {
                  setShowSearchingSection(false);
                  setLocation({ lat: city.lat, lon: city.lon });
                  setInputValue("");
                  dispatch(reset());
                  setCity(" ");
                }}
              >
                {`${city.name}, ${city.country}`}

                <i className="fa-solid fa-angle-right"></i>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="search-section-background"></div>`
    </>
  );
}

export default Search;
