import { NavLink } from "react-router-dom";

function Sidebar({ user, open, onClose }) {
  const links = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: "⌂" },
      { name: "Utilisateurs", path: "/admin/users", icon: "♙" },
      { name: "Abonnements", path: "/admin/subscription-plans", icon: "◇" },
      { name: "Activités", path: "/admin/activities", icon: "◆" },
      { name: "Équipements", path: "/admin/equipment", icon: "▣" },
      { name: "Maintenances", path: "/admin/maintenances", icon: "⚙" },
    ],

    coach: [
      { name: "Accueil", path: "/coach", icon: "⌂" },
      { name: "Disponibilités", path: "/coach/availabilities", icon: "◷" },
      { name: "Réservations", path: "/coach/reservations", icon: "◇" },
      { name: "Exercices", path: "/coach/exercises", icon: "◆" },
      { name: "Programmes", path: "/coach/programs", icon: "▤" },
      { name: "Progression", path: "/coach/progress", icon: "↗" },
    ],

    receptionniste: [
      { name: "Accueil", path: "/reception", icon: "⌂" },
      { name: "Présences", path: "/reception/attendance", icon: "▣" },
      { name: "Paiements", path: "/reception/payments", icon: "$" },
    ],

    adherent: [
      { name: "Accueil", path: "/member", icon: "⌂" },
      { name: "Abonnement", path: "/member/subscriptions", icon: "◇" },
      { name: "Réservations", path: "/member/reservations", icon: "◷" },
      { name: "Programmes", path: "/member/programs", icon: "▤" },
      { name: "Progression", path: "/member/progress", icon: "↗" },
      { name: "Présences", path: "/member/attendance", icon: "✓" },
      { name: "Mon QR Code", path: "/member/qr-code", icon: "▣" },
      { name: "Paiements", path: "/member/payments", icon: "$" },
    ],
  };

  const roleLinks = links[user?.role] || [];
  const menuLinks = [
  ...roleLinks,
  {
    name: "Mon profil",
    path: "/profile",
    icon: "♙",
  },
];

  return (
    <>
      {/* OVERLAY MOBILE */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-50
          w-64
          min-h-screen
          bg-white
          border-r border-slate-100
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center font-bold text-lg">
              F
            </div>

            <div>
              <h1 className="font-bold text-slate-800">
                FitHub.
              </h1>

              <p className="text-[9px] tracking-widest text-slate-400">
                FITNESS MANAGEMENT
              </p>
            </div>
          </div>

          {/* CLOSE MOBILE */}
          <button
            onClick={onClose}
            className="lg:hidden w-9 h-9 rounded-xl bg-slate-50 text-slate-500"
          >
            ×
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <p className="px-6 mb-3 text-[10px] font-semibold tracking-widest text-slate-300 uppercase">
            Menu
          </p>

          <div className="space-y-1">
            {menuLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin" || link.path === "/coach" || link.path === "/reception" || link.path === "/member"}
                onClick={onClose}
                className={({ isActive }) =>
                  `relative mx-3 px-4 py-3 rounded-xl flex items-center gap-3 text-sm transition ${
                    isActive
                      ? "bg-pink-50 text-pink-500 font-semibold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-pink-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute -left-3 w-1 h-7 rounded-r-full bg-pink-500" />
                    )}

                    <span className="w-5 text-center">
                      {link.icon}
                    </span>

                    {link.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* USER ROLE */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-400">
              Connecté en tant que
            </p>

            <p className="text-sm font-semibold text-slate-700 capitalize mt-1">
              {user?.role}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;