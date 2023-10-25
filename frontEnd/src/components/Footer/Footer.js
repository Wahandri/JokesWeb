import React from 'react';
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Tu Sitio Web</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
