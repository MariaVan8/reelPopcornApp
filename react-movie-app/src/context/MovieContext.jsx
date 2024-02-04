import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

export const MovieContext = React.createContext();

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

          // // Sort by coming soon (ascending order based on release date)
          // const sortByComingSoon = (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate);

          // // Sort by now playing (those playing now come first)
          // const sortByNowPlaying = (a, b) => b.isNowPlaying - a.isNowPlaying;

          // // Sort by top rated (descending order)
          // const sortByTopRated = (a, b) => b.rating - a.rating;
          // // Sort by popularity (descending order)
          // const sortByPopularity = (a, b) => b.popularity - a.popularity;

          // // Use the appropriate sorting function based on the `sort` state
          // let sortedMovies;
          // switch (sort) {
          //   case 'comingSoon':
          //     sortedMovies = data.results.sort(sortByComingSoon);
          //     break;
          //   case 'nowPlaying':
          //     sortedMovies = data.results.sort(sortByNowPlaying);
          //     break;
          //   case 'topRated':
          //     sortedMovies = data.results.sort(sortByTopRated);
          //     break;
          //   default: // 'popularity'
          //     sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity);
          //     break;
          // }

          // // Limit to top 12
          // sortedMovies = sortedMovies.slice(0, 12);

          // setMovies(sortedMovies);


        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    };

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
