function PageHeader({ title, description, children }) {
  return (
    <div className="flex items-center justify-between mb-7">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

export default PageHeader;