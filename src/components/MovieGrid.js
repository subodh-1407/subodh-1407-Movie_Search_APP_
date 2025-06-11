import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

function MovieGrid({ movies }) {
  if (!movies.length) {
    return (
      <>
        <div className="no-results-wrapper">
          <span className="no-results">No movies found.</span>
        </div>
        <style>{`
          .no-results-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80vh; /* or 100vh for full screen */
            width: 100%;
          }
          .no-results {
            font-style: italic;
            color: #aaa;
            font-size: 1.5rem;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbID} />
        ))}
      </div>
      <style>{`
        .movie-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          padding: 0 10px;
        }
      `}</style>
    </>
  );
}

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieGrid;
