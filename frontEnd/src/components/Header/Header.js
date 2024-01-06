import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import exit2 from "../../images/exit2.png";
import "./Header.css";
import logotipo from "./logotipo.png";
// import payaso2 from "./payaso2.png";

export default function Header() {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Eliminando el token del localStorage
    localStorage.removeItem("token");
    // Redirige al usuario a la página de inicio de sesión
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="baseHeader">
      <div className="header">
        <div className="imgContainer">
          <img className="img" src={logotipo} alt="" />
        </div>

        <Link
          className={`linkLi ${isActive("/jokes") ? "active" : ""}`}
          to="/jokes"
        >
          CHISTES
        </Link>
        <Link
          className={`linkLi ${isActive("/jokes/create") ? "active" : ""}`}
          to="/jokes/create"
        >
          AÑADIR CHISTE
        </Link>
        <Link
          className={`linkLi ${isActive("/top") ? "active" : ""}`}
          to="/top"
        >
          TOP 10
        </Link>
        <Link
          className={`linkLi ${isActive("/user") ? "active" : ""}`}
          to="/user"
        >
          PERFIL
        </Link>
        {/* <Link to="/user">
          <img className="img2" src={payaso2} alt="Perfil" />
        </Link> */}
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
