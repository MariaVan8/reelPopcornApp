import React from "react";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

import { Link } from "react-router-dom";

function HomePage() {
  const options = [
    { value: "popularity", label: "Popularity" },
    { value: "top-rated", label: "Top Rated" },
    { value: "upcoming", label: "Upcoming" },
    { value: "now-playing", label: "Now Playing" },
  ]

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(options[0].value);
  const { movies, fetchUpcomingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies ,toggleFavourite, toggleWatchlist, favourites, watchlist } =
    useContext(MovieContext);


  function sortMovies(option) {
    setSearch('');
    setSort(option.target.value);
  }

  const filteredMovies = movies.filter((movie) => {
    if (search !== "") {
      return movie.title.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  useEffect(() => {
    switch (sort) {
      case "popularity":
        fetchPopularMovies();
        break;
      case "top-rated":
        fetchTopRatedMovies();
        break;
      case "upcoming":
        fetchUpcomingMovies();
        break;
      case "now-playing":
        fetchNowPlayingMovies();
        break;
      default:
        break;
    }
  }, [sort]);
  
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sort) {
      case "popularity":
        return b.popularity - a.popularity;
      case "top-rated":
        return b.vote_average - a.vote_average;
      case "upcoming":
        return new Date(b.release_date) - new Date(a.release_date);
      case "now-playing":
        return new Date(a.release_date) - new Date(b.release_date);
      default:
        return 0;
    }
  });


  return (

    <div className="home">
      <div className="home-heading">
        <h1>welcome to reel popcorn</h1>
        <h2>where movie and popcorn lovers meet</h2>
      </div>
      <div className="home-search-filter">
        <input onChange={(e) => setSearch(e.target.value)} placeholder="Search Movie">
        </input>
        <select onChange={sortMovies}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="home-movies">
        {sortedMovies.map((movie) => (
          // <li key={movie.id}>
          <div className="home-movie-container" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="home-movie-info">
              <h3>{movie.title}</h3>
              {/* <p>Released: {movie.release_date}</p> */}
              <p>
                Released:{" "}
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>Rating: {parseFloat(movie.vote_average).toFixed(2)}</p>
              <p>
                {movie.overview.split(" ").slice(0, 20).join(" ") + "..."}
              </p>
              <Link to={`/movie/${movie.id}`}>
                <button>More Info</button>
              </Link>
              <div className="home-button-group">
                <button
                  className={`button-icon`}
                  onClick={() => toggleFavourite(movie)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill={
                      favourites.some((fav) => fav.id === movie.id)
                        ? "red"
                        : "white"
                    }
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <button
                  className={`button-icon watchlist-button`}
                  onClick={() => toggleWatchlist(movie)}
                >
                  {watchlist.some((item) => item.id === movie.id) ? (
                    <span>-</span>
                  ) : (
                    <span>+</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          // </li>
        ))}
      </div>
    </div>
  );
}
export default HomePage;
