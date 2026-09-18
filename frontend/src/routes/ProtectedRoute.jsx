import { Navigate } from "react-router-dom";
import Navigation from "../components/common/Navigation";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export default ProtectedRoute;