import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPlaceholder from "./LoadingPlaceholder";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(BASE_URL, {
          params: { apikey: API_KEY, i: movieId, plot: "full" },
        });

        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error || "Movie not found.");
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  if (loading) return <LoadingPlaceholder />;

  if (error)
    return (
      <section className="error-message">
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">
          &larr; Back
        </button>
        <style>{`
          .error-message {
            padding: 2rem;
            text-align: center;
            color: #f44336;
            font-weight: 600;
          }
          .back-btn {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: transparent;
            border: 2px solid #82c91e;
            border-radius: 6px;
            color: #82c91e;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s, color 0.3s;
          }
          .back-btn:hover {
            background-color: #82c91e;
            color: #121212;
          }
        `}</style>
      </section>
    );

  return (
    <section className="movie-detail">
      <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">
        &larr; Back
      </button>
      <div className="movie-detail-content">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Image"}
          alt={`${movie.Title} poster`}
          className="movie-poster"
        />
        <div className="movie-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
        </div>
      </div>
      <style>{`
        .movie-detail {
          max-width: 900px;
          margin: 2rem auto;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          background-color: #1f1f1f;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
          color: #e0e0e0;
          font-family: 'Poppins', sans-serif;
        }
        .back-btn {
          margin-bottom: 1rem;
          padding: 0.5rem 1rem;
          border: none;
          background: transparent;
          color: #82c91e;
          cursor: pointer;
          font-size: 1.1rem;
          border-radius: 6px;
          transition: color 0.3s ease;
        }
        .back-btn:hover {
          text-decoration: underline;
        }
        .movie-detail-content {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .movie-poster {
            flex-shrink: 0;
            width: 300px;
            border-radius: 12px;
            object-fit: cover;
            box-shadow: 0 4px 8px rgba(0,0,0,0.7);
            margin: 0 auto; /* This centers it horizontally */
            display: block;
        }
        .movie-info {
          flex-grow: 1;
          min-width: 220px;
        }
        .movie-info h2 {
          margin-top: 0;
          color: #82c91e;
          font-weight: 700;
        }
        .movie-info p {
          margin: 8px 0;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .movie-detail-content {
            flex-direction: column;
            align-items: center;
          }
          .movie-poster {
            width: 100%;
            max-width: 300px;
          }
          .movie-info {
            min-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
