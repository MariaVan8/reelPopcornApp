import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

function WatchLater() {
  const { watchlist, removeFromWatchlist } = useContext(MovieContext);

  return (
    <div>
      <h1>Watch Later</h1>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id}>
            {movie.title}{" "}
            <button onClick={() => removeFromWatchlist(movie)}>
              Remove from Watchlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WatchLater;
