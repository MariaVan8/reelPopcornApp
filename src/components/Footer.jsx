import React, { useEffect, useState, useRef } from 'react';
import tmdbLogo from '/images/tmdb-logo.svg';
import { NavLink } from 'react-router-dom';


function Footer() {
  return (

    <footer className="footer">
      <div className="footer-waves">
        <div className="footer-wave" id="wave1"></div>
        <div className="footer-wave" id="wave2"></div>
        <div className="footer-wave" id="wave3"></div>
        <div className="footer-wave" id="wave4"></div>
      </div>
      <div className="footer-links">
        <ul>
          <li><NavLink to="/" className="nav-link">home</NavLink></li>
          <li><NavLink to="/AboutUs" className="nav-link">about us</NavLink></li>
          <li><NavLink to="/Favorites" className="nav-link">favourites</NavLink></li>
          <li><NavLink to="/WatchLater" className="nav-link">watch later</NavLink></li>
        </ul>
        <img className="footer-logo" src={tmdbLogo} alt="TMDB logo" />
      </div>
      <div className="footer-copyright">
        <p>&copy; reel popcorn 2024 | pam, maria, charlotte & alex a</p>
      </div>
    </footer>
  )
}

export default Footer