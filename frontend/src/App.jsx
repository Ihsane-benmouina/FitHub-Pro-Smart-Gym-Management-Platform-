import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CoachDashboard from "./pages/coach/CoachDashboard";
import ReceptionDashboard from "./pages/reception/ReceptionDashboard";
import MemberDashboard from "./pages/member/MemberDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import Availabilities from "./pages/coach/Availabilities";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach"
          element={
            <ProtectedRoute role="coach">
              <CoachDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reception"
          element={
            <ProtectedRoute role="receptionniste">
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member"
          element={
            <ProtectedRoute role="adherent">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach/availabilities"
          element={
            <ProtectedRoute role="coach">
              <Availabilities />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;