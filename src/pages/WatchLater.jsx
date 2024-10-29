import React from "react";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import bookmark from "/images/bookmark-add.png";
import bookmark2 from "/images/bookmark-remove.png";
import { Link } from "react-router-dom";

function WatchLater() {
  const { toggleFavourite, toggleWatchlist, watchlist, favourites } =
    useContext(MovieContext);

  return (
    <div className="watchlater-container neon-green">
      <h1>watch later</h1>
      <ul>
        {watchlist.length === 0 ? (
          <div>
            <h3>Sorry you have nothing in your watch later.</h3>
            <p> Return to the <Link
              to="/"
              className="no-favorites"
              onClick={() => {
                document.getElementById("navi-toggle").checked = false;
                const h1Element = document.querySelector("h3");
                if (h1Element) {
                  const yOffset = -100; // Adjust this value to leave space for the navigation bar
                  const y =
                    h1Element.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Home Page
            </Link> to add to your watch later</p>
          </div>
        ) : (
          watchlist.map((movie) => (
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
                  {/* <p>Rating: {parseFloat(movie.vote_average).toFixed(2)}</p> */}

                  <p>
                    {movie.overview.split(" ").slice(0, 20).join(" ") + "..."}
                  </p>
                  <Link to={`/movie/${movie.id}`}>
                    <button className="neon-purple">More Info</button>
                  </Link>
                  <div className="button-group">
                    <button
                      className={`button-icon neon-pink`}
                      onClick={() => toggleFavourite(movie)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill={
                          favourites.some((fav) => fav.id === movie.id)
                            ? "#FF53cd"
                            : "white"
                        }
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    <button
                      className={`button-icon watchlist-button `}
                      onClick={() => toggleWatchlist(movie)}
                    >
                      {watchlist.some((item) => item.id === movie.id) ? (
                        <>
                          <img className="bookmark" src={bookmark} />
                        </>

                      ) : (
                        <>
                          <img className="bookmark" src={bookmark2} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default WatchLater;
