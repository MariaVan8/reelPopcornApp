import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import reelPopcornLogo from "/images/reel-popcorn.png";

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
      setLogoHeight(navRef.current.querySelector(".logo").offsetHeight);
    };

    handleScroll(); // Call it once to set the initial state
    setInitial(); // Set the initial logo height

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setInitial); // Update initial offset on resize

    // Cleanup function to remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setInitial);
    };
  }, [logoHeight]);

  function blur(e) {
    e.target.blur();
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav ref={navRef} className={`nav neon-purple ${isSticky ? 'nav-sticky' : ''}`} onClick={blur}>
      <div className="nav-logo">
        <img className="logo" src={reelPopcornLogo} alt="Reel Popcorn Logo" />
      </div>
      <input type="checkbox" id="navi-toggle" className="checkbox" />
      <label htmlFor="navi-toggle" className="button" onClick={toggleMenu}>
        <span className="icon">&nbsp;</span>
      </label>
      <div className="background">&nbsp;</div>

      <nav className="nav-menu">
        <ul className="list">
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => {
                document.getElementById("navi-toggle").checked = false;
              }}
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/AboutUs"
              className="nav-link"
              onClick={() => {
                document.getElementById("navi-toggle").checked = false;
              }}
            >
              about us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Favorites"
              className="nav-link"
              onClick={() => {
                document.getElementById("navi-toggle").checked = false;
              }}
            >
              favourites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/WatchLater"
              className="nav-link"
              onClick={() => {
                document.getElementById("navi-toggle").checked = false;
              }}
            >
              watch later
            </NavLink>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Nav;
