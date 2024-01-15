import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  function blur(e) {
    e.target.blur();
  }
  return (
    <nav className="nav" onClick={blur}>
      <ul>
        <li><NavLink to="/" className="nav-link">home</NavLink></li>
        <li><NavLink to="/AboutUs" className="nav-link">about us</NavLink></li>
        <li><NavLink to="/Favorites" className="nav-link">favourites</NavLink></li>
        <li><NavLink to="/WatchLater" className="nav-link">watch later</NavLink></li>
      </ul></nav>
  )
}

export default Nav