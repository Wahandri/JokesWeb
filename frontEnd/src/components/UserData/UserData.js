import React, { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import atras from "../../images/atras.png";
import "./UserDate.css";
import { useUserContext } from "../../UserContext";

export default function UserData() {
  const { user, updateUser } = useUserContext();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showUsernameChangeConfirm, setShowUsernameChangeConfirm] =
    useState(false);
  const [showPasswordChangeConfirm, setShowPasswordChangeConfirm] =
    useState(false);

  const handleChangeUsername = async () => {
    if (newUsername.trim() === "") {
      setMessage("El nuevo nombre de usuario no puede estar vacío.");
      return;
    }

    // Realiza una solicitud para verificar si el nuevo nombre de usuario ya existe
    const isUsernameAvailable = await checkUsernameAvailability(newUsername);

    if (!isUsernameAvailable) {
      setMessage("El nuevo nombre de usuario ya está en uso. Elije otro.");
      return;
    }

    // Resto del código para cambiar el nombre de usuario
  };

  // Función para verificar la disponibilidad del nombre de usuario
  const checkUsernameAvailability = async (username) => {
    try {
      // Realiza una solicitud al servidor para verificar la disponibilidad del nombre de usuario
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const response = await fetch(`/users/username-available`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.available;
      }

      return false;
    } catch (error) {
      console.error(
        "Error al verificar la disponibilidad del nombre de usuario:",
        error
      );
      return false;
    }
  };

  const confirmUsernameChange = async () => {
    try {
      // Realizar la solicitud para cambiar el nombre de usuario
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(`/users/change/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        updateUser({ ...user, username: newUsername }); // Actualizar el nombre de usuario en el contexto
        setMessage("Nombre de usuario cambiado exitosamente");
        setNewUsername("");
        setShowUsernameChangeConfirm(false);
      } else {
        const data = await response.json();
        setMessage(data.message || "Error al cambiar el nombre de usuario.");
        setShowUsernameChangeConfirm(false);
      }
    } catch (error) {
      setMessage(
        "Error al cambiar el nombre de usuario. Inténtalo de nuevo más tarde."
      );
      setShowUsernameChangeConfirm(false);
    }
  };

  // Función para verificar y cambiar la contraseña
  const handleChangePassword = async () => {
    if (newPassword.trim() === "") {
      setMessage("La nueva contraseña no puede estar vacía.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden. Inténtalo de nuevo.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    // Mostrar el cuadro de diálogo de confirmación de contraseña
    setShowPasswordChangeConfirm(true);
  };

  const confirmPasswordChange = async () => {
    try {
      // Realizar la solicitud para cambiar la contraseña
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(`/users/change-password/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setMessage("Contraseña cambiada exitosamente");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordChangeConfirm(false); // Ocultar la confirmación
      } else {
        const data = await response.json();
        setMessage(data.message || "Error al cambiar la contraseña.");
        setShowPasswordChangeConfirm(false); // En caso de error, ocultar la confirmación
      }
    } catch (error) {
      setMessage(
        "Error al cambiar la contraseña. Inténtalo de nuevo más tarde."
      );
      setShowPasswordChangeConfirm(false); // En caso de error, ocultar la confirmación
    }
  };

  const cancelUsernameChange = () => {
    setShowUsernameChangeConfirm(false);
  };

  const cancelPasswordChange = () => {
    setShowPasswordChangeConfirm(false);
  };

  return (
    <div className="pading">
      <Header title="Cambiar Datos" />
      <div className="flex">
        <Link className="linkLi" to="/user">
          <img src={atras} alt="Atras" width="40px" />
        </Link>
        <div className="flex colums boxComponent">
          <div className="boxArea">
            <p>Nombre de usuario actual: {user.username}</p>
            <input
              type="text"
              placeholder="Nuevo nombre de usuario"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button className="bt" onClick={handleChangeUsername}>
              Cambiar Nombre de Usuario
            </button>
            {showUsernameChangeConfirm && (
              <div>
                <p>
                  ¿Estás seguro de que deseas cambiar el nombre de usuario de "
                  {user.username}" a "{newUsername}"?
                </p>
                <button className="bt" onClick={confirmUsernameChange}>
                  Sí
                </button>
                <button className="bt" onClick={cancelUsernameChange}>
                  No
                </button>
              </div>
            )}
          </div>
          <div className="boxArea">
            <p>Cambiar Contraseña</p>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="bt" onClick={handleChangePassword}>
              Cambiar Contraseña
            </button>
            {showPasswordChangeConfirm && (
              <div>
                <p>¿Estás seguro de que deseas cambiar tu contraseña?</p>
                <button className="bt" onClick={confirmPasswordChange}>
                  Sí
                </button>
                <button className="bt" onClick={cancelPasswordChange}>
                  No
                </button>
              </div>
            )}
          </div>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
