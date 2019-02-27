import React from 'react';
import ThreeSheds from './ThreeSheds.png';
import ApexShedLogoTransparent from '../../ApexShedLogoTransparent.png';
import './navbar.css';

export default function Navbar() {
	return (
		<div className="navbar">
			<div className="upper-navbar">
				<img src={ApexShedLogoTransparent} className="logo-navbar" alt="Apex Logo" />
				<div className="navbar-text">
					<h2 className="website-title">ApexShedCompany.com</h2>
					<i>Utah's Best value for Storage sheds and outbuildings</i>
					<h1>(801)754-3334</h1>
					<h2 className="free-estimate">Call for FREE On-Site Estimate</h2>
				</div>
				<img className="shed-image-navbar" src={ThreeSheds} alt="Three Sheds" />
			</div>
			<div className="lower-navbar">
				<a className="apex-link" href="https://www.apexshedcompany.com/">
					Home
				</a>
				<a className="apex-link" href="https://www.apexshedcompany.com/shed-styles.html">
					Shed Styles
				</a>
				<a className="apex-link" href="https://www.apexshedcompany.com/financing.html">
					Financing
				</a>
				<a className="apex-link" href="https://www.apexshedcompany.com/do-it-yourself-kits.html">
					Do-It-Yourself Kits
				</a>
				<a className="apex-link" href="https://www.apexshedcompany.com/custom-options.html">
					Custom Options
				</a>
				<a className="apex-link" href="https://www.apexshedcompany.com/our-story.html">
					Our Story
				</a>
				<a className="apex-link" href="https://www.apexshedcompany.com/shed-promotions.html">
					Shed Promotions
				</a>
			</div>
		</div>
	);
}
