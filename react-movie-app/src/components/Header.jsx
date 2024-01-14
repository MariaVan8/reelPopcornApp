import React from 'react'
import reelPopcornLogo from '/images/reel-popcorn.png';
import Nav from './Nav';

function Header() {
  return (
    <div class="main-header">
      <div class="main-nav">
        <img class="logo" src={reelPopcornLogo} alt="Reel Popcorn Logo" />
        <Nav />
      </div>
    </div>
  )
}

export default Header