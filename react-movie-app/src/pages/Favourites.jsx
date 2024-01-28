import React from "react";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

import { Link } from "react-router-dom";

function Favourites() {
  const { favourites, removeFromFavList, toggleWatchlist, watchlist } =
    useContext(MovieContext);

  return (
    <div>
      <div className="fav-container">
        <h1>Favourites</h1>
        <ul>
          {favourites.map((movie) => (
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
                  <div className="button-group">
                    <button
                      className={`button-icon`}
                      onClick={() => removeFromFavList(movie)}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Favourites;
