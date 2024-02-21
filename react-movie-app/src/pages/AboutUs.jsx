import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="about">
      <div className="about-heading">
        <h1>about reel popcorn</h1>
      </div>
      <div className="about-container">
        <div className="about-info">
          <h2>about our project</h2>
          <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
        </div>
        <div className="about-info">
          <h2>our team</h2>
          <p>This movie database is built on React by up and coming developers Pam, Maria, Charlotte and Alex A.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs