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


  const fetchPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=b49aeaca09961dbfa4e7d1b0fea43944`
    )
      .then((response) => response.json())
      .then((data) => {

        // Sort movies based on popularity (descending order) and then limit to top 12
        const popularMovies = data.results
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 12);

        setMovies(popularMovies);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });


  };
  const fetchTopRatedMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=b49aeaca09961dbfa4e7d1b0fea43944"
    )
      .then((response) => response.json())
      .then((data) => {
        const topRated = data.results
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 12);
       setMovies(topRated); // Set movies state here
    
      })
      .catch((error) => {
        console.error("Error fetching upcoming movie data:", error);
      });
  };
  const fetchNowPlayingMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=b49aeaca09961dbfa4e7d1b0fea43944"
    )
      .then((response) => response.json())
      .then((data) => {
        const upcomingMovies = data.results
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
          .slice(0, 12);
       setMovies(upcomingMovies); // Set movies state here

      })
      .catch((error) => {
        console.error("Error fetching upcoming movie data:", error);
      });
  };
  const fetchUpcomingMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=b49aeaca09961dbfa4e7d1b0fea43944"
    )
      .then((response) => response.json())
      .then((data) => {
        const upcomingMovies = data.results
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .slice(0, 12);
          console.log("fetching upcoming movies", data)
       setMovies(upcomingMovies); // Set movies state here
      console.log("fetching upcoming movies", upcomingMovies)
      console.log(upcomingMovies,"upcoming moviest  his const should be")
      })
      .catch((error) => {
        console.error("Error fetching upcoming movie data:", error);
      });
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
