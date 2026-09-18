import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className="border px-3 py-2"
    >
      Déconnexion
    </button>
  );
}

export default LogoutButton;