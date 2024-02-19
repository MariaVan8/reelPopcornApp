import React, { useContext,useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import Trailer from "../components/Trailer";
import heart from "/images/heart.png";
import full from "/images/hd.png";

function Movie() {
  const { movies } = useContext(MovieContext);
  const { id } = useParams(); // get the id parameter from the URL
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState('');
  const [ranking, setRanking] = useState(null);
  const [casting, setCasting] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const LANGUAGE = 'en-US';

  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'b49aeaca09961dbfa4e7d1b0fea43944';

  // Function to fetch trailer video based on movie id
  const fetchTrailerUrl = async (id) => {
    const API_URL = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${LANGUAGE}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      //filter and return the youtube id for the first one with type Trailer and published on Youtube
      const youtubeId = data.results.filter((obj) => {
        return obj.type === 'Trailer' && obj.site === 'YouTube';
      })[0].key;
      return `https://www.youtube.com/embed/${youtubeId}?&controls=1&modestbranding=1&playsinline=1&rel=0&autoplay=1`;
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
      return null;
    }
  };
// Function to open the modal and fetch trailer URL
const openModal = async () => {
  const url = await fetchTrailerUrl(id);
  setTrailerUrl(trailerUrl); // Set the trailer URL
  console.log(trailerUrl,"THIS IS THE URL");
  setShowModal(true); // Open the modal
};

// OR using useEffect to fetch when the component mounts or `id` changes
useEffect(() => {
  fetchTrailerUrl(id).then(setTrailerUrl);
}, [id]);

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
    height: "22rem",
  };

  return (
movie? (
  <div className="card">
    <a href="/">Back</a>
  <h2>{movie.title}</h2>
  <div className="card-top">

  <div className="card-container" style={cardContainerStyle}></div>

  </div>
  <div className="card-bottom">
    <p>{movie.overview}</p>
    <p>Release Date: {movie.release_date}</p>
  </div>
  </div>
):(
  <>
  </>
)
  );
}
export default Movie;