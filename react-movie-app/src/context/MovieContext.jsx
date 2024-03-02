import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

export const MovieContext = React.createContext();
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b49aeaca09961dbfa4e7d1b0fea43944';
const LANGUAGE = 'en-US';
// Create a provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);


  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });



  // Use effect to save favorites to both local storage and session storage whenever it changes
  useEffect(() => {
    const saveDataToStorage = () => {
      localStorage.setItem("favourites", JSON.stringify(favourites));
      sessionStorage.setItem("favourites", JSON.stringify(favourites));
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      sessionStorage.setItem("watchlist", JSON.stringify(watchlist));
    };

    // Save data before the browser window is closed or refreshed
    const handleBeforeUnload = () => {
      saveDataToStorage();
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [favourites, watchlist]);

  const fetchPopularMovies = async () => {
    let page = 1;
    let fetchedMovies = [];

    let uniqueMovieIds = new Set(); // Track unique movie IDs to avoid duplicates
    try {
      while (fetchedMovies.length < 24) {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const movies = data.results.filter(movie => movie.poster_path && !uniqueMovieIds.has(movie.id));
        movies.forEach(movie => {
          uniqueMovieIds.add(movie.id);
          if (fetchedMovies.length < 24) {
            fetchedMovies.push(movie);
          }
        });
        if (data.page >= data.total_pages) {
          break;
        }
        page++;
      }
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const fetchNowPlayingMovies = async () => {
    let page = 1;
    let fetchedMovies = [];
    let uniqueMovieIds = new Set();
    const limit = 24;
    try {
      while (fetchedMovies.length < limit) {
        const API_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const movies = data.results.filter((movie) => movie.poster_path && !uniqueMovieIds.has(movie.id));
        movies.forEach(movie => uniqueMovieIds.add(movie.id));
        fetchedMovies = [...fetchedMovies, ...movies.slice(0, limit - fetchedMovies.length)];
        if (data.page < data.total_pages) {
          page++;
        } else {
          break;
        }
      }
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
    }
  };
  const fetchUpcomingMovies = async () => {
    let page = 1;
    let fetchedMovies = [];
    let uniqueMovieIds = new Set();
    const limit = 24;
    try {
      while (fetchedMovies.length < limit) {
        const API_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const movies = data.results.filter((movie) => movie.poster_path && !uniqueMovieIds.has(movie.id));
        movies.forEach(movie => uniqueMovieIds.add(movie.id));
        fetchedMovies = [...fetchedMovies, ...movies.slice(0, limit - fetchedMovies.length)];
        if (data.page < data.total_pages) {
          page++;
        } else {
          break;
        }
      }
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    }
  };

  const fetchTopRatedMovies = async () => {
    let page = 1;
    let fetchedMovies = [];
    let uniqueMovieIds = new Set(); // Set to track unique movie IDs
    const limit = 24;
    try {
      while (fetchedMovies.length < limit) {
        const API_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const movies = data.results.filter((movie) => movie.poster_path && !uniqueMovieIds.has(movie.id)); // Check if movie ID is unique
        movies.forEach(movie => uniqueMovieIds.add(movie.id)); // Add movie IDs to the set
        fetchedMovies = [...fetchedMovies, ...movies.slice(0, limit - fetchedMovies.length)];
        if (data.page < data.total_pages) {
          page++;
        } else {
          break;
        }
      }
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
    }
  };


  useEffect(() => {



    // Load data from localStorage on component mount
    const loadFromStorage = () => {
      const storedFavourites = localStorage.getItem("favourites");
      const storedWatchlist = localStorage.getItem("watchlist");

      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }

      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
    };

    // Fetch movie data when the component mounts
    fetchPopularMovies();
  }, [setMovies, setFavourites, setWatchlist]);


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

    fetchPopularMovies,
    fetchUpcomingMovies,
    fetchNowPlayingMovies,
    fetchTopRatedMovies,
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
