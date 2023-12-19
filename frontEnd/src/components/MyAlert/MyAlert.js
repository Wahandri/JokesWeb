import React from "react";
import "./MyAlert.css";

export default function MyAlert({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>{message}</h4>
        <div className="modal-actions">
          <button onClick={onConfirm}>Aceptar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
