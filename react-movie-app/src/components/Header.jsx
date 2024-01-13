import React from 'react'
import reelPopcornLogo from '/images/reel-popcorn.png';
import Nav from './Nav';

function Header() {
  return (
    <div>
      <Nav/>
      <img src={reelPopcornLogo} alt="Reel Popcorn Logo" />
    </div>
  )
}

export default Header