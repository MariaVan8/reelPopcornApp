import React from 'react'
import reelPopcornLogo from '/images/reel-popcorn.png';
import Nav from './Nav';

function Header() {
  return (
    <header className='header'>
      {/* <div className="main-header"> */}
      <div className="header-nav">
        <img className="logo" src={reelPopcornLogo} alt="Reel Popcorn Logo" />
        <Nav />
        {/* </div> */}
      </div>
    </header>
  )
}

export default Header