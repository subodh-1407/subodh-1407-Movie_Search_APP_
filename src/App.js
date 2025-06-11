import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#121212",
          color: "#e0e0e0",
        }}
      >
        {/* Responsive CSS */}
        <style>
          {`
            .app-header {
              background-color: #1f1f1f;
              padding: 1rem 2rem;
              box-shadow: 0 2px 4px rgba(0,0,0,0.5);
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
            }

            .header-title {
              margin: 0;
              font-size: 1.75rem;
              font-weight: 700;
            }

            .header-title a {
              color: #82c91e;
              text-decoration: none;
            }

            .header-nav {
              margin-top: 0.5rem;
              font-size: 1rem;
              font-weight: 500;
            }

            .header-nav a {
              color: #82c91e;
              text-decoration: none;
            }

            @media (max-width: 600px) {
              .app-header {
                flex-direction: column;
                align-items: flex-start;
              }

              .header-nav {
                margin-top: 0.5rem;
              }
            }
          `}
        </style>

        {/* Header */}
        <header className="app-header">
          <h1 className="header-title">
            <Link to="/">Movie Verse</Link>
          </h1>
          <nav className="header-nav">
            <Link to="/favorites">❤️ Favorites</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main
          style={{
            flexGrow: 1,
            padding: "1rem 2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#1f1f1f",
            textAlign: "center",
            padding: "1rem 2rem",
            marginTop: "auto",
            fontSize: "0.9rem",
            color: "#888",
          }}
        >
          <p>© Movie Search App (by :- SUBODH GANGWAR)</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
