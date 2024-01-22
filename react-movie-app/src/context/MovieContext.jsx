import React from 'react';
import { useState, useEffect } from 'react';

export const MovieContext = React.createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movie data when the component mounts
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=b49aeaca09961dbfa4e7d1b0fea43944")
      .then((response) => response.json())
      .then((data) => {
        // Sort movies based on popularity (descending order) and then limit to top 12
        const sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity).slice(0, 12);
        setMovies(sortedMovies);
        console.log(sortedMovies)
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []); 

  return (
    <MovieContext.Provider value={{ movies }}>
      {children}
    </MovieContext.Provider>
  );
};