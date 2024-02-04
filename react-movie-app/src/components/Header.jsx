import React from 'react'
import reelPopcornLogo from '/images/reel-popcorn.png';
import Nav from './Nav';
import Carousel from "../components/Carousel";

function Header() {
  return (
    <header className='header'>
      <Carousel />
      {/* <div className="main-header"> */}
      <div className="header-nav">
        {/* <img className="logo" src={reelPopcornLogo} alt="Reel Popcorn Logo" /> */}
        <Nav />
        {/* </div> */}
      </div>
    </header>
  )
}

export default Header