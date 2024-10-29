import React from "react";
import reelPopcornLogo from "/images/reel-popcorn.png";
import Nav from "./Nav";
import Carousel from "../components/Carousel";

function Header() {
	return (
		<header className="header">
			<Carousel />
			<div className="header-nav">
				<Nav />
			</div>
		</header>
	);
}

export default Header;
