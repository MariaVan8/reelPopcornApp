import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Carousel from "./components/Carousel";
import "./scss/style.scss";
import HomePage from "./pages/HomePage";
import { MovieProvider } from "./context/MovieContext";
import AboutUs from "./pages/AboutUs";
import FavoriteMovies from "./pages/Favourites";
import Movie from "./pages/Movie";
import WatchLater from "./pages/WatchLater";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Header />
        <main>
          {/* <Carousel /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
            <Route path="/watchlater" element={<WatchLater />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
