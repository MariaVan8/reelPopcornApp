import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

export const MovieContext = React.createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // Load favorites from local storage when the component mounts
  useEffect(() => {
    console.log("Loading Favourites from Local Storage");
    const storedFavourites = JSON.parse(localStorage.getItem("favourites"));
    console.log("Stored Favourites:", storedFavourites);
    if (storedFavourites) {
      setFavourites(storedFavourites);
    }
  }, []);

  useEffect(() => {
    console.log("Saving Favourites to Local Storage");
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    // Fetch movie data when the component mounts
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=b49aeaca09961dbfa4e7d1b0fea43944"
    )
      .then((response) => response.json())
      .then((data) => {
        // Sort movies based on popularity (descending order) and then limit to top 12
        const sortedMovies = data.results
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 12);
        setMovies(sortedMovies);
        console.log(sortedMovies);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  useEffect(() => {
    // Save favorites to local storage whenever it changes
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Function to toggle a movie's favorite status
  const toggleFavourite = (movie) => {
    const isFavourite = favourites.some((fav) => fav.id === movie.id);

    if (isFavourite) {
      removeFromFavList(movie);
    } else {
      addToFavList(movie);
    }
  };

  const addToFavList = (movie) => {
    setFavourites((prevFavourites) => [...prevFavourites, movie]);
  };

  const removeFromFavList = (movie) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.id !== movie.id)
    );
  };
  const contextValue = {
    movies,
    favourites,
    toggleFavourite,
    addToFavList,
    removeFromFavList,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
