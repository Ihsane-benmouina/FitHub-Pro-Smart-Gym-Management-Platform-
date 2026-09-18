import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Navigation() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  return (
    <div className="p-4 border-b">
      <strong className="mr-6">FitHub Pro</strong>

      {user.role === "adherent" && (
        <>
          <Link className="mr-4" to="/member">
            Accueil
          </Link>

          <Link className="mr-4" to="/member/subscriptions">
            Abonnement
          </Link>

          <Link className="mr-4" to="/member/reservations">
            Réservations
          </Link>

          <Link className="mr-4" to="/member/programs">
            Programmes
          </Link>

          <Link className="mr-4" to="/member/attendance">
            Présences
          </Link>

          <Link className="mr-4" to="/member/qr-code">
            QR Code
          </Link>
        </>
      )}

      {user.role === "coach" && (
        <>
          <Link className="mr-4" to="/coach">
            Accueil
          </Link>

          <Link className="mr-4" to="/coach/availabilities">
            Disponibilités
          </Link>

          <Link className="mr-4" to="/coach/reservations">
            Réservations
          </Link>

          <Link className="mr-4" to="/coach/exercises">
            Exercices
          </Link>

          <Link className="mr-4" to="/coach/programs">
            Programmes
          </Link>
        </>
      )}

      {user.role === "receptionniste" && (
        <>
          <Link className="mr-4" to="/reception">
            Accueil
          </Link>

          <Link className="mr-4" to="/reception/attendance">
            Présences
          </Link>
        </>
      )}

      {user.role === "admin" && (
        <>
          <Link className="mr-4" to="/admin">
            Dashboard
          </Link>

          <Link className="mr-4" to="/admin/users">
            Utilisateurs
          </Link>

          <Link className="mr-4" to="/admin/subscription-plans">
            Abonnements
          </Link>

          <Link className="mr-4" to="/admin/equipment">
            Équipements
          </Link>

          <Link className="mr-4" to="/admin/maintenances">
            Maintenances
          </Link>
        </>
      )}

      <Link className="mr-4" to="/profile">
        Profil
      </Link>

      <LogoutButton />
    </div>
  );
}

export default Navigation;