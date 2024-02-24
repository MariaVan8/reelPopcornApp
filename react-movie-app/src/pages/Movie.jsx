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

  // Define a state to keep track of the screen width
const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 759px)").matches);
const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(window.matchMedia("(min-width: 760px)").matches);

// Define a function to update the state based on the screen width
const handleWindowSizeChange = () => {
  setIsMobile(window.matchMedia("(max-width: 759px)").matches);
  setIsTabletOrDesktop(window.matchMedia("(min-width: 760px)").matches);
};



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


// Set up an effect that adds the event listener when the component mounts and removes it when it unmounts
useEffect(() => {
  window.addEventListener('resize', handleWindowSizeChange);
  
  // Call the handler function immediately to set the initial state
  handleWindowSizeChange();

  // Cleanup the event listener when the component unmounts
  return () => {
    window.removeEventListener('resize', handleWindowSizeChange);
  };
}, []);


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

 
    // Construct image URL for the poster and backdrop
    const posterUrl = movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";
    const backdropUrl = movie ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "";
  
    // Define the style objects for poster and banner images
    const posterStyle = {
      backgroundImage: `url(${posterUrl})`,
      // Add any additional styles you need for mobile
    };
  
    const bannerStyle = {
      backgroundImage: `url(${backdropUrl})`,
      // Add any additional styles you need for desktop
    };

    const imageStyle = isMobile ? posterStyle : bannerStyle;

  return (
movie? (
  <>
    {/* <div className="card-big"> */}
  <div className="card-wrapper">
    <div className="card" style={imageStyle}>
      <div className="card-container">
        <h2 className="card-title">{movie.title}</h2>
        <button className="card-btn" onClick={openModal}><img src={play} alt="play"  width={"13rem"} height={"13rem"}/> Play</button>
        {showModal && <Trailer trailerUrl={trailerUrl} setShowModal={setShowModal} />}
      </div>
    </div>
  </div>
  <div className="card-bottom">
    <div className="card-info">
      <img src={heart} alt="heart" className="card-image" />
      <button>+</button>
      <div class="card-details">
      <span>{new Date(movie.release_date).getFullYear()}</span>
      <span>{duration}</span>
      <img src={full} alt="hd" />
      <img src={sub} alt="subtitles" />
      </div>
    
    </div>
    <div className="card-floor">
      <p>{movie.overview}</p>
      <div className="card-casting">
        <span><span className="card-text">Starring:</span> {casting.join(', ')}</span>
        <div><span className="card-text">Genres: </span>{genres.join(', ')}</div>
      </div>
    </div>
  </div>
  {/* </div> */}
  </>
):(
  <>
  </>
)
  );
}
export default Movie;