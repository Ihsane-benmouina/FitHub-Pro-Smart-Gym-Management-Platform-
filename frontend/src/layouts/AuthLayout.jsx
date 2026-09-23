import { Link } from "react-router-dom";

function AuthLayout({
  children,
  title,
  subtitle,
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 p-12 text-white">
        <div className="absolute w-72 h-72 rounded-full bg-white/10 -top-20 -left-20" />
        <div className="absolute w-96 h-96 rounded-full bg-white/10 -bottom-40 -right-24" />

        <div className="relative z-10 flex flex-col justify-between w-full">
          <Link to="/login" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white text-pink-500 flex items-center justify-center font-bold text-xl">
              F
            </div>

            <div>
              <h1 className="font-bold text-xl">
                FitHub.
              </h1>

              <p className="text-[10px] tracking-widest text-white/70">
                FITNESS MANAGEMENT
              </p>
            </div>
          </Link>

          <div className="max-w-md">
            <p className="text-sm font-medium text-white/70 mb-3">
              FIT • TRAIN • PROGRESS
            </p>

            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Votre salle.
              <br />
              Votre progression.
              <br />
              <span className="text-white/70">
                Une seule plateforme.
              </span>
            </h2>

            <p className="mt-6 text-white/75 leading-relaxed">
              Gérez vos entraînements, abonnements,
              réservations et performances avec FitHub Pro.
            </p>
          </div>

          <p className="text-xs text-white/50">
            © 2026 FitHub Pro
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center font-bold">
              F
            </div>

            <div>
              <p className="font-bold text-slate-800">
                FitHub.
              </p>

              <p className="text-[9px] tracking-widest text-slate-400">
                FITNESS MANAGEMENT
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              {title}
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;