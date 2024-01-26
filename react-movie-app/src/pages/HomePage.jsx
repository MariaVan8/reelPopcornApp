import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';


import { Link } from 'react-router-dom';

function HomePage() {
  const { movies, toggleFavourite, toggleWatchlist, favourites, watchlist } =
    useContext(MovieContext);

  return (
    <div>
      <h1 className="home-heading">Top 12 Popular Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <div className="movie-container">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                {/* <p>Released: {movie.release_date}</p> */}
                <p>Released: {new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                <p>Rating: {parseFloat(movie.vote_average).toFixed(2)}</p>
                <p>{movie.overview.split(" ").slice(0, 20).join(" ") + "..."}</p>
                <Link to={`/movies/${movie.id}`}>
                  <button>More Info</button>
                </Link>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default HomePage;
