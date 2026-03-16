import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            Aero<span className="text-gradient">Space</span>
          </h3>
          <p className="footer-tagline">
            Premium travel experiences curated for the modern explorer. Fly higher, sleep better, explore further.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#">Flights</a></li>
            <li><a href="#">Hotels</a></li>
            <li><a href="#">Deals & Promos</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} AeroSpace Travel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
