function Input({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-slate-500 mb-2">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
      />
    </div>
  );
}

export default Input;