import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer'; 
import './App.css';
import HomePage from './pages/HomePage';

import AboutUs from './pages/AboutUs';
import FavoriteMovies from './pages/Favourites';
import Movie  from './pages/Movie';
import WatchLater from './pages/WatchLater';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movie data when the component mounts
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=b49aeaca09961dbfa4e7d1b0fea43944")
      .then((response) => response.json())
      .then((data) => {
        // Sort movies based on popularity (descending order) and then limit to top 12
        const sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity).slice(0, 12);
        setMovies(sortedMovies);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
    
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (

    <BrowserRouter>
  
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/favorite-movies" element={<FavoriteMovies />} />
          <Route path="/watch-later" element={<WatchLater />} />
        </Routes>
      </main>

      <Footer />
      </BrowserRouter>
  );
}

export default App;
