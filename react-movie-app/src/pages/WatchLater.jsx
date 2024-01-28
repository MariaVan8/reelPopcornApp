import React from "react";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

import { Link } from "react-router-dom";

function WatchLater() {
  const { watchlist, removeFromWatchlist } = useContext(MovieContext);

  return (
    <div className="home-container">
      <h1>Watch Later</h1>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id}>
            <div className="movie-container">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
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
                <Link to={`/movies/${movie.id}`}>
                  <button>More Info</button>
                </Link>
                <button onClick={() => removeFromFavList(movie)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WatchLater;
