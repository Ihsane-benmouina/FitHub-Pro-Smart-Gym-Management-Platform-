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
import Subscriptions from "./pages/member/Subscriptions";
import Payments from "./pages/member/Payments";

import MemberReservations from "./pages/member/Reservations";
import CoachReservations from "./pages/coach/Reservations";

import Exercises from "./pages/coach/Exercises";
import CoachPrograms from "./pages/coach/Programs";
import MemberPrograms from "./pages/member/Programs";

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

        <Route
          path="/member/subscriptions"
          element={
            <ProtectedRoute role="adherent">
              <Subscriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/payments"
          element={
            <ProtectedRoute role="adherent">
              <Payments />
            </ProtectedRoute>
          }
        />


        <Route
          path="/member/reservations"
          element={
            <ProtectedRoute role="adherent">
              <MemberReservations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach/reservations"
          element={
            <ProtectedRoute role="coach">
              <CoachReservations />
            </ProtectedRoute>
          }
        />



        <Route
          path="/coach/exercises"
          element={
            <ProtectedRoute role="coach">
              <Exercises />
            </ProtectedRoute>
          }
        />

        <Route
          path="/coach/programs"
          element={
            <ProtectedRoute role="coach">
              <CoachPrograms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/programs"
          element={
            <ProtectedRoute role="adherent">
              <MemberPrograms />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;