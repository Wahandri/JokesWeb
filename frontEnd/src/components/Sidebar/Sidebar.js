import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyAlert from "../MyAlert/MyAlert";
import { useUserContext } from "../../UserContext";
import exit2 from "../../images/exit2.png";
import sidebar from "../../images/sidebar.png";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useUserContext();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    window.location.reload();
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const showAlertOnClick = () => {
    setShowAlert(true);
  };

  return (
    <div className="boxSidebar">
      <div className={`sidebar-container ${showSidebar ? "visible" : ""}`}>
        {showSidebar && (
          <div className="sidebarBox">
            <Link className="linkLi" to="/">
              <p className="myBtn">CHISTES</p>
            </Link>
            <Link
              className="linkLi"
              to="/jokes/create"
              onClick={showAlertOnClick}
            >
              <p className="myBtn">AÑADIR CHISTE</p>
            </Link>
            <Link className="linkLi" to="/top">
              <p className="myBtn">TOP 10</p>
            </Link>
            <Link className="linkLi" to="/user" onClick={showAlertOnClick}>
              <p className="myBtn">PERFIL</p>
            </Link>
            {user && showSidebar && (
              <div
                className="boxBtnExit"
                onClick={() => setConfirmLogout(true)}
              >
                <img className="btnExit" src={exit2} alt="" />
              </div>
            )}
          </div>
        )}
        {confirmLogout && (
          <div className="logoutConfirm">
            <p>Quieres cerrar la sesion?</p>
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
        )}
      </div>
      <div className="" onClick={toggleSidebar}>
        <img title="Sidebar" className="btnSidebar" src={sidebar} alt="" />
      </div>
      {showAlert && (
        <MyAlert
          isOpen={showAlert}
          message="Debes iniciar sesión para continuar"
          onConfirm={() => {
            setShowAlert(false);
            navigate("/login");
          }}
          onCancel={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
