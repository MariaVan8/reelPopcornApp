import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    function blur(e){
        e.target.blur();
    }
  return (
    <nav onClick={blur}>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/AboutUs">About Us</NavLink></li>
            <li><NavLink to="/Favorites">Favorites</NavLink></li>
            <li><NavLink to="/WatchLater">Watch Later</NavLink></li>
        </ul></nav>
  )
}

export default Nav