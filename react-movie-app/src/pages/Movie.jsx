import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import heart from "/images/heart.png";

function Movie() {
  const { movies } = useContext(MovieContext);
  const { id } = useParams(); // get the id parameter from the URL

  // Convert URL parameter to a number for comparison if movie IDs are numbers
  const movieId = Number(id);

  // Find the movie by id, ensure you compare the same type (both numbers or both strings)
  const movie = movies.find((movie) => movie.id === movieId);

  // Check if movie is found before constructing imageUrl
  const imageUrl = movie
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";
  console.log(movie.vote_average);

  // Define the style object for the background image
  const cardContainerStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover", // Cover  the entire container
    backgroundPosition: "center", // Center the background image
  };

  return (
    <div className="card" style={cardContainerStyle}>
      {movie ? (
        <div className="card-container">
          {/* <img src={imageUrl} alt={movie.title} /> */}
          <h1>{movie.title}</h1>
          <div className="card-info">
            <p>{movie.vote_average}</p>
            <img src={heart} alt="heart" />
          </div>
          <p>{movie.overview}</p>
            <p>{movie.release_date}</p>
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
}

export default Movie;
