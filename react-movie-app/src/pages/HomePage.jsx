import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { MovieContext } from '../context/MovieContext';


function HomePage() {
  const { movies } = useContext(MovieContext);

  return (
<div>
      <h1 className="home-heading">Top 12 Popular Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}


export default HomePage;