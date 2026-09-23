function StatCard({ title, value, icon, gradient = "pink" }) {
  const gradients = {
    pink: "from-pink-500 to-rose-400",
    purple: "from-violet-600 to-purple-400",
    blue: "from-cyan-500 to-blue-400",
    orange: "from-amber-400 to-orange-500",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
        gradients[gradient]
      } p-5 text-white shadow-sm`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">
            {title}
          </p>

          <span className="text-xl">
            {icon}
          </span>
        </div>

        <p className="text-3xl font-bold mt-4">
          {value}
        </p>
      </div>

      <div className="absolute -bottom-10 -right-5 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-14 right-16 w-28 h-28 rounded-full bg-white/10" />
    </div>
  );
}

export default StatCard;