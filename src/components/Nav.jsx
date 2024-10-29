import React from "react";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import bookmark from "/images/bookmark-add.png";
import bookmark2 from "/images/bookmark-remove.png";

function HomePage() {
	const options = [
		{ value: "popularity", label: "Popular" },
		{ value: "top-rated", label: "Top Rated" },
		{ value: "upcoming", label: "Upcoming" },
		{ value: "now-playing", label: "Now Playing" },
	];

	const [search, setSearch] = useState("");
	const [sort, setSort] = useState(options[0].value);
	const {
		movies,
		fetchUpcomingMovies,
		fetchPopularMovies,
		fetchTopRatedMovies,
		fetchNowPlayingMovies,
		toggleFavourite,
		toggleWatchlist,
		favourites,
		watchlist,
	} = useContext(MovieContext);

	const handleSortClick = (option) => {
		setSearch("");
		setSort(option);
	};

	function sortMovies(option) {
		setSearch("");
		setSort(option.target.value);
	}

	const filteredMovies = movies.filter((movie) => {
		if (search !== "") {
			return movie.title.toLowerCase().includes(search.toLowerCase());
		}
		return true;
	});

	useEffect(() => {
		switch (sort) {
			case "popularity":
				fetchPopularMovies();
				break;
			case "top-rated":
				fetchTopRatedMovies();
				break;
			case "upcoming":
				fetchUpcomingMovies();
				break;
			case "now-playing":
				fetchNowPlayingMovies();
				break;
			default:
				break;
		}
	}, [sort]);

	const sortedMovies = [...filteredMovies].sort((a, b) => {
		switch (sort) {
			case "popularity":
				return b.popularity - a.popularity;
			case "top-rated":
				return b.vote_average - a.vote_average;
			case "upcoming":
				return new Date(b.release_date) - new Date(a.release_date);
			case "now-playing":
				return new Date(a.release_date) - new Date(b.release_date);
			default:
				return 0;
		}
	});

	useEffect(() => {
		const buttons = document.querySelectorAll(".home-filter-btn");

		buttons.forEach((button) => {
			button.addEventListener("mousemove", (e) => {
				const rect = button.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				button.style.setProperty("--mouseX", `${x}px`);
				button.style.setProperty("--mouseY", `${y}px`);
			});
		});

		return () => {
			// Cleanup the event listeners when the component unmounts
			buttons.forEach((button) => {
				button.removeEventListener("mousemove", () => {});
			});
		};
	}, []);

	return (
		<div className="home">
			<div className="home-heading">
				<h1>Welcome to reel popcorn</h1>
				<h2>Where movie and popcorn lovers meet</h2>
			</div>
			<div className="home-search-filter">
				{options.map((option) => (
					<button
						key={option.value}
						onClick={() => handleSortClick(option.value)}
						className={`home-filter-btn ${
							sort === option.value ? "active neon-blue" : ""
						}`}>
						<div className="inner"></div>
						<span>{option.label}</span>
					</button>
				))}
			</div>
			<div className="home-movies">
				{sortedMovies.map((movie) => (
					<div
						className="home-movie-container neon-blue"
						key={movie.id}>
						<img
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							alt={movie.title}
						/>

						<div className="home-movie-info">
							<h3>{movie.title}</h3>
							<p>
								Released:{" "}
								{new Date(movie.release_date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</p>
							<div className="stars-container">
								<div
									className="stars"
									style={{
										"--w": `${
											(parseFloat(movie.vote_average) * 10).toFixed(0) / 2
										}%`,
									}}>
									{" "}
								</div>
								<p>{(parseFloat(movie.vote_average) * 10).toFixed(2)}%</p>
							</div>

							<p>{movie.overview.split(" ").slice(0, 20).join(" ") + "..."}</p>
							<Link to={`/movie/${movie.id}`}>
								<button className="neon-purple">More Info</button>
							</Link>
							<div className="home-button-group">
								<button
									className={`button-icon neon-pink`}
									onClick={() => toggleFavourite(movie)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										width="24"
										height="24"
										fill={
											favourites.some((fav) => fav.id === movie.id)
												? "#FF53cd"
												: "white"
										}>
										<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
									</svg>
								</button>
								<button
									className={`button-icon watchlist-button`}
									onClick={() => toggleWatchlist(movie)}>
									{watchlist.some((item) => item.id === movie.id) ? (
										<>
											<img src={bookmark} />
										</>
									) : (
										<>
											<img src={bookmark2} />
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default HomePage;
