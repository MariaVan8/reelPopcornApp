import React, { useContext,useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import Trailer from "../components/Trailer";
import heart from "/images/heart.png";
import full from "/images/hd.png";
import sub from "/images/subtitles.png"; 
import play from "/images/play.png";
import back from "/images/arrow.png";

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
  };

  return (
movie? (
  <>
  
  <div className="card">
  <a href="/"><img src={back} alt="back" className="card-icon" /></a>
  <h2 className="card-title">{movie.title}</h2>
  <div className="card-top">
  <div className="card-container" style={cardContainerStyle}></div>
  <div className="card-right">
    <button>+</button>
  <img src={heart} alt="heart" className="card-image" />
  <button className="card-btn" onClick={openModal}><img src={play} alt="play"  width={"10rem"} height={"10rem"}/> Play</button>
  {showModal && <Trailer trailerUrl={trailerUrl} setShowModal={setShowModal} />}

  </div>
  </div>
  <div className="card-bottom">
    <div className="card-info">
    <span>{new Date(movie.release_date).getFullYear()}</span>
      <span>{duration}</span>
    <img src={full} alt="hd" />
    <img src={sub} alt="subtitles" />
    </div>
    <div className="card-floor">
    <p>{movie.overview}</p>
    <div className="card-casting">
      <span><span className="card-text">Starring:</span> {casting.join(', ')}</span>
      <div><span className="card-text">Genres: </span>{genres.join(', ')}</div>
      </div>
      </div>


  </div>
  </div>
  </>
):(
  <>
  </>
)
  );
}
export default Movie;