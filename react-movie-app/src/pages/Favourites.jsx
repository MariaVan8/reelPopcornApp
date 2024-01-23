import React, { createContext, useState, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

function Favourites() {
  const { favourites, removeFromFavList } = useContext(MovieContext);

  return (
    <div>
      <h1>Favourites</h1>
      <ul>
        {favourites.map((movie) => (
          <li key={movie.id}>
            {movie.title}{" "}
            <button onClick={() => removeFromFavList(movie)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;
