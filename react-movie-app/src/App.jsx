import React, { useState } from 'react'
import reelPopcornLogo from '/images/reel-popcorn.png'
import './App.css'

function App() {
 //load api data with fetch
const [movies, setMovies] = useState([]);
fetch("https://api.themoviedb.org/3/movie/popular?api_key=b49aeaca09961dbfa4e7d1b0fea43944")
.then((response) => response.json())
.then((data) => {
  console.log(data);

  
});
  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={reelPopcornLogo} className="logo" alt="Reel Popcorn logo" />
        </a>
      </div>
    </>
  )
}

export default App;
