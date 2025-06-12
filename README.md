# 🎬 React Movie Search Application

A responsive, beginner-friendly movie search application built using **React.js**. Users can search for movies, view details, filter results, and save favorites locally.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [API Reference](#api-reference)
- [Implemented Features](#implemented-features)
- [Future Improvements](#future-improvements)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Author](#author)

---

## 📄 Overview

This project is a simple React app designed to help beginners learn key React concepts such as hooks, API calls, routing, debounced search, and local storage. It integrates with a public movie API and is built with mobile-first responsive design in mind.

---

## 🚀 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/movie-search-app.git
   cd movie-search-app
Install Dependencies

npm install
Configure Environment Variables
Create a .env file in the root directory and add your OMDb API key:

REACT_APP_API_KEY=your_api_key_here
You can get a free API key from OMDb API.

Run the App Locally

npm start
📡 API Reference
Using the OMDb API:

Search Movies

GET /?apikey=YOUR_API_KEY&s=search_query&page=1
Get Movie Details

GET /?apikey=YOUR_API_KEY&i=movie_id


✅ Implemented Features


🔍 Core Functionality
Search for movies using a keyword

Display results in a responsive grid

View movie title, release year, and poster

Navigate to a detailed view of a selected movie

Pagination to load more results



⚙️ Technical Features
Built using React functional components and hooks

API integration using fetch or axios

Loading indicators and error handling for API states

Debounced search to reduce API calls

Client-side routing using React Router

Responsive and mobile-friendly layout

Clear button


❤️ User Experience Enhancements
Loading skeletons/placeholders for smooth UX

Display friendly error messages

Mobile-responsive grid system

Movie filters (e.g., by year, rating)

Favorites saved with localStorage



🌱 Future Improvements
🎛️ Add advanced filtering (genre, language, etc.)

⭐ Improve favorites view and syncing

🔁 Switch to infinite scroll instead of pagination

📊 Integrate third-party movie ratings or reviews

🌓 Add dark/light mode toggle

🧪 Add unit and integration tests



🛠️ Tech Stack
React.js

React Router DOM

Axios / Fetch

HTML5 / CSS3

JavaScript (ES6+)

OMDb API



📁 Folder Structure

src/
├── components/
│   ├── MovieCard.jsx
│   ├── MovieDetail.jsx
│   └── SearchBar.jsx
├── pages/
│   ├── Home.jsx
│   └── MovieDetailPage.jsx
├── services/
│   └── api.js
├── utils/
│   └── debounce.js
├── App.js
└── index.js


Deployed link : https://subodh-1407-movie-search-app.vercel.app/


👨‍💻 Author
SUBODH GANGWAR
