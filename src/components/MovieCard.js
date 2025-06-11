import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieCard({ movie }) {
  return (
    <>
      <div className="movie-card">
        <Link to={`/movie/${movie.imdbID}`}>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/200x300?text=No+Image'}
            alt={`${movie.Title} poster`}
          />
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </Link>
      </div>
      <style>{`
        .movie-card {
          background: #1f1f1f;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.5);
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .movie-card:hover {
          transform: scale(1.05);
        }
        .movie-card img {
          display: block;
          width: 100%;
          height: 270px;
          object-fit: cover;
          border-bottom: 1px solid #333;
          border-radius: 12px 12px 0 0;
        }
        .movie-info {
          padding: 0.75rem 1rem 1rem 1rem;
          text-align: center;
          color: #e0e0e0;
        }
        .movie-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #82c91e;
        }
        .movie-info p {
          margin: 0;
          color: #bbb;
          font-size: 0.9rem;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Poster: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
