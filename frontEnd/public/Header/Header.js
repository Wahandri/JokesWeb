import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import exit2 from "../../images/exit2.png";
import "./Header.css";
import logotipo from "./logotipo.png";
import menu from "../../images/menu.png";

export default function Header() {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    // Eliminando el token del localStorage
    localStorage.removeItem("token");
    // Redirige al usuario a la página de inicio de sesión
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`baseHeader ${menuOpen ? "menuOpen" : ""}`}>
      <div className="header">
        <div className="imgContainer">
          <img className="img" src={logotipo} alt="" />
        </div>

        <img
          onClick={toggleMenu}
          className="menuNavbar"
          src={menu}
          title="Menu"
          width="35px"
          alt="menu"
        />

        <ul className="desktopNav">
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/jokes") ? "active" : ""}`}
            to="/jokes"
          >
            CHISTES
          </Link>
          <hr className="line" />
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/jokes/create") ? "active" : ""}`}
            to="/jokes/create"
          >
            AÑADIR CHISTE
          </Link>
          <hr className="line" />
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/top") ? "active" : ""}`}
            to="/top"
          >
            TOP 10
          </Link>
          <hr className="line" />
          <Link
            onClick={closeMenu}
            className={`linkLi ${isActive("/user") ? "active" : ""}`}
            to="/user"
          >
            PERFIL
          </Link>
        </ul>

        <div className="boxBtnExit" onClick={() => setConfirmLogout(true)}>
          <img className="btnExit" src={exit2} alt="" />
        </div>
      </div>
      {confirmLogout && (
        <div className="overlay" onClick={() => setConfirmLogout(false)}>
          <div className="logoutConfirm" onClick={(e) => e.stopPropagation()}>
            <p>¿Estás seguro de que quieres cerrar sesión?</p>
            <div className="flexRow">
              <button className="myBtn linkLi" onClick={handleLogout}>
                Aceptar
              </button>
              <button
                className="myBtn linkLi"
                onClick={() => setConfirmLogout(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
