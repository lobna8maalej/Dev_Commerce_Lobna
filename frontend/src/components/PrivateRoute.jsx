import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Pas connecté
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Vérification du rôle
  if (role && user?.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;