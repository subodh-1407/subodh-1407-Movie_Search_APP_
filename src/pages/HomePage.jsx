import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(
    async (query, pageNumber = 1) => {
      if (!query) {
        setMovies([]);
        setTotalResults(0);
        setError(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            s: query,
            type: 'movie',
            page: pageNumber,
          },
        });
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
          setTotalResults(parseInt(response.data.totalResults, 10));
          setError(null);
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(response.data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movies.');
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchMovies(searchTerm, page);
  }, [fetchMovies, searchTerm, page]);

  const handleSearch = (newTerm) => {
    setSearchTerm(newTerm);
    setPage(1);
  };

  const nextPage = () => {
    if (page < Math.ceil(totalResults / 10)) {
      setPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 2rem',
      fontFamily: "'Poppins', sans-serif",
      color: '#e0e0e0',
      minHeight: '80vh',
    },
    errorMessage: {
      textAlign: 'center',
      color: '#f03e3e',
      margin: '1rem 0',
      fontWeight: '600',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      margin: '2rem 0',
      fontSize: '1rem',
      flexWrap: 'wrap',
    },
    pageButton: {
      backgroundColor: '#82c91e',
      border: 'none',
      padding: '0.5rem 1.25rem',
      borderRadius: '20px',
      color: '#121212',
      fontWeight: '700',
      cursor: 'pointer',
      minWidth: '100px',
      transition: 'background 0.3s ease',
    },
    pageButtonDisabled: {
      backgroundColor: '#4a4a4a',
      cursor: 'not-allowed',
      color: '#888',
    },
    pageInfo: {
      minWidth: '120px',
      textAlign: 'center',
    },
  };

  return (
    <main style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {loading && <LoadingPlaceholder />}
      {error && <p style={styles.errorMessage}>{error}</p>}
      {!loading && !error && <MovieGrid movies={movies} />}

      {totalResults > 10 && (
        <nav style={styles.pagination} aria-label="Pagination Navigation">
          <button
            style={page <= 1 ? { ...styles.pageButton, ...styles.pageButtonDisabled } : styles.pageButton}
            onClick={prevPage}
            disabled={page <= 1}
            aria-label="Previous Page"
          >
            &larr; Prev
          </button>
          <span style={styles.pageInfo}>
            Page {page} / {Math.ceil(totalResults / 10)}
          </span>
          <button
            style={
              page >= Math.ceil(totalResults / 10)
                ? { ...styles.pageButton, ...styles.pageButtonDisabled }
                : styles.pageButton
            }
            onClick={nextPage}
            disabled={page >= Math.ceil(totalResults / 10)}
            aria-label="Next Page"
          >
            Next &rarr;
          </button>
        </nav>
      )}
    </main>
  );
}

export default HomePage;
