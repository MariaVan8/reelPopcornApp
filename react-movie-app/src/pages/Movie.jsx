import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
// import '../scss/partials.scss/_movie.scss';

function Movie() {
  const { movies } = useContext(MovieContext);
  const { id } = useParams(); // get the id parameter from the URL

  // Convert URL parameter to a number for comparison if movie IDs are numbers
  const movieId = Number(id);

  // Find the movie by id, ensure you compare the same type (both numbers or both strings)
  const movie = movies.find((movie) => movie.id === movieId);

  // Check if movie is found before constructing imageUrl
  const imageUrl = movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <div className='card'>
      {movie ? (
        <div className='card-container'>
          <img src={imageUrl} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
}

export default Movie;
