import React from "react";
import { Route, Navigate } from "react-router-dom";

// Componente que implementa una ruta privada
const PrivateRoute = ({ element: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
