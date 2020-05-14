import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import randomId from "../../helpers/functions/randomId";
import Loader from "../Loader";

const SearchSpots = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);
  const [debounce, setDebounce] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const resultsContainer = useRef(null);
  const input = useRef(null);

  const handleClick = useCallback((event) => {
    // If use click outisde if input or results
    // Close the results container and remove click listener
    if (
      !event.target.isSameNode(input.current) &&
      !event.target.isSameNode(resultsContainer.current)
    ) {
      setDisplayResults(false);
      input.current.value = "";
      window.removeEventListener("click", handleClick);
    }
  }, []);

  const fetchSpots = (term, currentRequestId) => {
    if (currentRequestId !== requestId) return;
    setError(false);
    props
      .search(term)
      .then(({ data }) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setLoading(true);
    setDisplayResults(true);
    const { value } = event.target;
    if (!value) {
      setResults([]);
      setDisplayResults(false);
      return;
    }
    clearTimeout(setDebounce(debounce));
    setDebounce(
      setTimeout(() => {
        setRequestId(randomId());
        fetchSpots(value, requestId);
      }, 800)
    );
  };

  useEffect(() => {
    if (displayResults) {
      window.addEventListener("click", handleClick);
    } else {
      window.removeEventListener("click", handleClick);
    }
    return () => window.removeEventListener("click", handleClick);
  }, [displayResults, handleClick]);

  const renderResults = () => {
    if (loading) return <Loader />;
    if (error) return <span>Une erreur est survenue.</span>;
    if (!results.length) return <span>Aucun résultat trouvé.</span>;
    return (
      <ul>
        {results.map((spot, index) => (
          <li key={index}>
            <Link to={`${process.env.PUBLIC_URL}/spots/${spot.id}`}>
              {spot.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="search">
      <div className="input">
        <label className="input__label" htmlFor={props.name}>
          {props.label}
        </label>
        <input
          className="input__input"
          type="text"
          name={props.name}
          ref={input}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <div
        ref={resultsContainer}
        className={
          displayResults
            ? "search__results search__results--active"
            : "search__results"
        }
      >
        {renderResults()}
      </div>
    </div>
  );
};

export default SearchSpots;
