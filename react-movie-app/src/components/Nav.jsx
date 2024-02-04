// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const Nav = () => {
//   function blur(e) {
//     e.target.blur();
//   }
//   return (
//     <nav className="nav" onClick={blur}>
//       <div className="nav-logo">LOGO</div>
//       <ul>
//         <li><NavLink to="/" className="nav-link">home</NavLink></li>
//         <li><NavLink to="/AboutUs" className="nav-link">about us</NavLink></li>
//         <li><NavLink to="/Favorites" className="nav-link">favourites</NavLink></li>
//         <li><NavLink to="/WatchLater" className="nav-link">watch later</NavLink></li>
//       </ul></nav>
//   )
// }

// export default Nav
// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';

// function Nav() {
//   const [isSticky, setSticky] = useState(false);

//   const offset = 0
//   const checkStickiness = () => setSticky(window.scrollY > offset);

//   useEffect(() => {
//     window.addEventListener('scroll', checkStickiness);

//     return () => {
//       window.removeEventListener('scroll', checkStickiness);
//     };
//   }, []);

//   return (
//     <nav className={`nav ${isSticky ? 'sticky' : ''}`} onClick={blur}>
//       <div className="nav-logo">LOGO</div>
//       <ul>
//         <li><NavLink to="/" className="nav-link">home</NavLink></li>
//         <li><NavLink to="/AboutUs" className="nav-link">about us</NavLink></li>
//         <li><NavLink to="/Favorites" className="nav-link">favourites</NavLink></li>
//         <li><NavLink to="/WatchLater" className="nav-link">watch later</NavLink></li>
//       </ul>
//     </nav>
//   );
// }

// export default Nav;
import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import reelPopcornLogo from '/images/reel-popcorn.png';

const Nav = () => {
  const navRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = navRef.current.offsetTop + logoHeight;

      if (window.scrollY >= offset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const setInitial = () => {
      setLogoHeight(navRef.current.querySelector('.logo').offsetHeight);
    };

    handleScroll(); // Call it once to set the initial state
    setInitial();  // Set the initial logo height

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setInitial); // Update initial offset on resize

    // Cleanup function to remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setInitial);
    };
  }, [logoHeight]);

  function blur(e) {
    e.target.blur();
  }

  return (
    <nav ref={navRef} className={`nav ${isSticky ? 'nav-sticky' : ''}`} onClick={blur}>
      <div className="nav-logo">
        <img className="logo" src={reelPopcornLogo} alt="Reel Popcorn Logo" />
      </div>
      <ul>
        <li><NavLink to="/" className="nav-link">home</NavLink></li>
        <li><NavLink to="/AboutUs" className="nav-link">about us</NavLink></li>
        <li><NavLink to="/Favorites" className="nav-link">favourites</NavLink></li>
        <li><NavLink to="/WatchLater" className="nav-link">watch later</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;

