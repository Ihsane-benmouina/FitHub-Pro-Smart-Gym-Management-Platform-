function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90",
    secondary:
      "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
    danger:
      "bg-rose-50 text-rose-500 hover:bg-rose-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;