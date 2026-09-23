import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Header({ user, onMenuClick }) {
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
    <header className="h-20 bg-white border-b border-slate-100 px-4 md:px-6 xl:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* HAMBURGER MOBILE */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl border border-slate-100 text-slate-600 flex items-center justify-center"
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>

        <div>
          <h2 className="text-sm md:text-base font-bold text-slate-800">
            Bonjour, {user?.name} 👋
          </h2>

          <p className="hidden sm:block text-xs text-slate-400 mt-1">
            Bienvenue sur votre espace FitHub Pro
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* NOTIFICATION VISUELLE */}
        <button className="relative w-10 h-10 rounded-xl bg-slate-50 text-slate-500">
          ♢

          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full" />
        </button>

        {/* USER */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700">
              {user?.name}
            </p>

            <p className="text-xs text-slate-400 capitalize">
              {user?.role}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        </div>

        <button
          onClick={logout}
          className="text-xs md:text-sm font-medium text-slate-400 hover:text-rose-500 transition"
        >
          <span className="hidden sm:inline">
            Déconnexion
          </span>

          <span className="sm:hidden">
            ↪
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;