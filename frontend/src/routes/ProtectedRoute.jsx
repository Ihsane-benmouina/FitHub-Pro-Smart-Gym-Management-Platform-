import { Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}

export default ProtectedRoute;