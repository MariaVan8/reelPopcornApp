import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

export const MovieContext = React.createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = sessionStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = sessionStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  // Use effect to save favorites to both local storage and session storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
    sessionStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const fetchMovies = () => {
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
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    };

    // Fetch movie data when the component mounts
    fetchMovies();
  }, []);

  // Function to toggle a movie's favorite status
  const toggleFavourite = (movie) => {
    const isFavourite = favourites.some((fav) => fav.id === movie.id);

    if (isFavourite) {
      removeFromFavList(movie);
    } else {
      addToFavList(movie);
    }
  };

  // Function to toggle a movie's watchlist status
  const toggleWatchlist = (movie) => {
    const isWatchlist = watchlist.some((item) => item.id === movie.id);

    if (isWatchlist) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
  };

  const addToFavList = (movie) => {
    const updatedFavourites = [...favourites, movie];
    setFavourites(updatedFavourites);
  };

  const removeFromFavList = (movie) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== movie.id);
    setFavourites(updatedFavourites);
  };

  const addToWatchlist = (movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
  };

  const removeFromWatchlist = (movie) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    setWatchlist(updatedWatchlist);
  };

  const contextValue = {
    movies,
    favourites,
    watchlist,
    toggleFavourite,
    toggleWatchlist,
    addToFavList,
    addToWatchlist,
    removeFromFavList,
    removeFromWatchlist,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
