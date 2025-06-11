import MovieDetailPage from "./MovieDetailPage";
import FavoritesPage from "./FavoritesPage";
import NotFoundPage from "./NotFoundPage";
import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import { searchMovies } from "../api";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = useCallback(
    async (query, pageNumber = 1, year = "") => {
      if (!query) {
        setMovies([]);
        setTotalResults(0);
        setError(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const { movies, totalResults, error } = await searchMovies(query, pageNumber, year);
      if (error) {
        setMovies([]);
        setTotalResults(0);
        setError(error);
      } else {
        setError(null);
        setTotalResults(totalResults);
        if (pageNumber === 1) {
          setMovies(movies);
        } else {
          setMovies((prev) => [...prev, ...movies]);
        }
      }
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    setPage(1);
    fetchMovies(searchTerm, 1, yearFilter);
  }, [searchTerm, yearFilter, fetchMovies]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies(searchTerm, page, yearFilter);
  }, [page, searchTerm, yearFilter, fetchMovies]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleYearChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,4}$/.test(val)) {
      setYearFilter(val);
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.imdbID === movie.imdbID);
      if (exists) {
        return prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  const loadMore = () => {
    if (movies.length < totalResults) {
      setPage((p) => p + 1);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {/* Centered Filter by Year */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="year-filter" style={{ marginRight: 8 }}>
            Filter by Year:
          </label>
          <input
            id="year-filter"
            type="text"
            placeholder="Enter year (YYYY)"
            value={yearFilter}
            onChange={handleYearChange}
            maxLength={4}
            style={{
              borderRadius: "6px",
              border: "1px solid #555",
              backgroundColor: "#2a2a2a",
              color: "#e0e0e0",
              padding: "0.5rem 0.75rem",
              width: "137px",
            }}
            aria-label="Filter movies by year"
          />
        </div>
      </div>

      {loading && page === 1 && <LoadingPlaceholder />}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && !error && (
        <MovieGrid movies={movies} favorites={favorites} onToggleFavorite={toggleFavorite} />
      )}
      {movies.length > 0 && movies.length < totalResults && (
        <div style={{ textAlign: "center", margin: "1rem" }}>
          <button
            onClick={loadMore}
            style={{
              background: "#82c91e",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "24px",
              color: "#121212",
              fontWeight: "600",
              cursor: "pointer",
            }}
            aria-label="Load more movies"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default HomePage;
