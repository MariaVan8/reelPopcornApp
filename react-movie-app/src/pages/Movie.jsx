import React, { useContext,useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import heart from "/images/heart.png";
import full from "/images/hd.png";

function Movie() {
  const { movies } = useContext(MovieContext);
  const { id } = useParams(); // get the id parameter from the URL
  const [duration, setDuration] = useState('');
  const [ranking, setRanking] = useState(null);
  const [casting, setCasting] = useState([]);
  const [genres, setGenres] = useState([]);
  console.log(movies);

  useEffect(() => {
    // console.log(movies);
}, [movies]);

useEffect(() => {
  // Generate a random duration for the movie
  const hours = Math.floor(Math.random() * 3) + 1; // 1 to 3 hours
  const minutes = Math.floor(Math.random() * 60); // 0 to 59 minutes
  setDuration(`${hours}h ${minutes.toString().padStart(2, '0')}m`);

    // Generate a random ranking between 1 and 10
    const rank = Math.floor(Math.random() * 10) + 1;
    setRanking(`#${rank} in Movies Today`);

    const actors = [
      'Michael Rivers', 'Jessica Stone', 'David Hale', 'Emily Clarkson', 
      'Alex Duncan', 'Sarah Parker', 'Daniel Marsh', 'Olivia Turner', 
      'James Ford', 'Laura Brooks', 'Ethan Grant', 'Natalie Cooper', 
      'Ryan Bishop', 'Chloe Adams', 'Benjamin Knight', 'Sophia Bell', 
      'Aaron Chase', 'Isabella Hart', 'Christopher Dean', 'Grace Alexander'
    ];

        // Shuffle the array and pick the first three names
        actors.sort(() => 0.5 - Math.random());
        setCasting(actors.slice(0, 3));
    
        const genreList = [
          "Action", "Comedy", "Drama", "Fantasy", "Horror",
          "Mystery", "Romance", "Thriller", "Western", "Documentary",
          "Science Fiction", "Musical", "Biography", "Animation",
          "Crime", "Historical", "War", "Adventure", "Superhero", "Noir"
        ];

        genreList.sort(() => 0.5 - Math.random());
        setGenres(genreList.slice(0, 2));
    

}, []);


  // Convert URL parameter to a number for comparison if movie IDs are numbers
  const movieId = Number(id);

  // Find the movie by id, ensure you compare the same type (both numbers or both strings)
  const movie = movies.find((movie) => movie.id === movieId);

  // Check if movie is found before constructing imageUrl
  const imageUrl = movie
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";
  

  // Define the style object for the background image
  const cardContainerStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "contain", // Cover  the entire container
    backgroundPosition: "center", // Center the background image
    backgroundRepeat: "no-repeat", // Do not repeat the image
  };

  return (
    <div className="card" >
      <a href="/">BACK</a>
          <h1>{movie.title}</h1> 
      {movie ? (
        <>
        <div className="card-top">
        <div className="card-container" style={cardContainerStyle}> 
          <p className="hidden">.</p>
        </div>
        <div className="card-info">
          <p className="card-info-title"></p>
            <p>{movie.vote_average}</p>
          <button className="card-plus">+</button>
            <img src={heart} alt="heart" />
            <button className="card-btn">Play</button>
          </div>
        </div>

        <div className="card-bottom"> 
        <div className="card-extra">
        <p className="card-text">PG-13</p> 
        <p>{duration}</p>
        <img  className="card-icon" src={full} alt="high definition" />
        </div>
        <h2>{ranking}</h2>
          <p>{movie.overview}</p>
          <p><strong>Cast: </strong>{casting.join(', ')}</p>
          <p><strong>Genres: </strong>{genres.join(', ')}</p>
          <p>Released: {movie.release_date}</p>
          
        </div>
        </>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
}

export default Movie;
