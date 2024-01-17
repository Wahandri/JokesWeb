import React, { useState } from "react";

import "./Header.css";
import logo from "../../images/logotipo.png";
import exit from "../../images/exit.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import menu from "../../images/menu.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminando el token del localStorage
    localStorage.removeItem("token");
    // Redirige al usuario a la página de inicio de sesión
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="contentHeader">
      <div className={`boxHeader ${menuOpen ? "menuOpen" : ""}`}>
        <Link
          to="/jokes"
          onClick={closeMenu}
          className="imgLogo contenedor-rotacion"
        >
          <img className="imgLogo rotacion" src={logo} title="Inicio" alt="" />
        </Link>
        <div className="menuButton" onClick={toggleMenu}>
          <img src={menu} title="Menu" width="35px" alt="menu" />
        </div>
        <ul className="navBar">
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/jokes") ? "active" : ""}`}
            to="/jokes"
          >
            Inicio
          </Link>
          <hr className="line" />
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/jokes/create") ? "active" : ""}`}
            to="/jokes/create"
          >
            Añadir
          </Link>
          <hr className="line" />
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/user") ? "active" : ""}`}
            to="/user"
          >
            Perfil
          </Link>
          <hr className="line" />
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/top") ? "active" : ""}`}
            to="/top"
          >
            Top
          </Link>
        </ul>
        <div className="socialNetworkIcons">
          <div className="boxBtnExit" onClick={() => setConfirmLogout(true)}>
            <img className="btnExit" src={exit} alt="" />
          </div>
        </div>
        {confirmLogout && (
          <div className="overlay" onClick={() => setConfirmLogout(false)}>
            <div className="logoutConfirm" onClick={(e) => e.stopPropagation()}>
              <p>¿Estás seguro de que quieres cerrar sesión?</p>
              <div className="flexBtw">
                <button className="linkLi" onClick={handleLogout}>
                  Aceptar
                </button>
                <button
                  className="linkLi"
                  onClick={() => setConfirmLogout(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="empyHeader"> </div>
      <div className="spaceHeader"> </div>
    </div>
  );
}
