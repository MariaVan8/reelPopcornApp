import React, { useState, useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";

function Carousel() {
    const [sort, setSort] = useState("popularity");
    const { movies } = useContext(MovieContext);

    useEffect(() => {
        console.log(movies);
    }, [movies]);

    let sortedMovies = [...movies]; // create a copy of movies to sort

    switch (sort) {
        case "popularity":
            sortedMovies.sort((a, b) => b.popularity - a.popularity);
            break;
        // Add more cases here for other sorting options
        default:
            break;
    }
    sortedMovies = sortedMovies.slice(0, 6);
    return (
        <div className="carousel">

            <div className="carousel-container">
                {sortedMovies.map((movie) => (
                    <div className="carousel-movie" key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;