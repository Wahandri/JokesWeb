import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Tu Sitio Web</p>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/acerca-de">Acerca de</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
