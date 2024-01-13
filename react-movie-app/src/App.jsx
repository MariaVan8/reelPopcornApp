import React, { useState, useEffect } from 'react';
import reelPopcornLogo from '/images/reel-popcorn.png';
import './App.css';

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
    <>
      <div>
        <a href="#" target="_blank">
          <img src={reelPopcornLogo} className="logo" alt="Reel Popcorn logo" />
        </a>
      </div>

      <div>
        <h1>Top 12 Popular Movies</h1>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
