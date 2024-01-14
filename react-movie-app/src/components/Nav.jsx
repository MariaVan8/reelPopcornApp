import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  function blur(e) {
    e.target.blur();
  }
  return (
    <nav class="nav" onClick={blur}>
      <ul>
        <li><NavLink to="/">home</NavLink></li>
        <li><NavLink to="/AboutUs">about us</NavLink></li>
        <li><NavLink to="/Favorites">favourites</NavLink></li>
        <li><NavLink to="/WatchLater">watch later</NavLink></li>
      </ul></nav>
  )
}

export default Nav