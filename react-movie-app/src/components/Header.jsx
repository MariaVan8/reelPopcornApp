import React from 'react'
import reelPopcornLogo from '/images/reel-popcorn.png';
import Nav from './Nav';

function Header() {
  return (
    <div className="main-header">
      <div className="main-nav">
        <img className="logo" src={reelPopcornLogo} alt="Reel Popcorn Logo" />
        <Nav />
      </div>
    </div>
  )
}

export default Header