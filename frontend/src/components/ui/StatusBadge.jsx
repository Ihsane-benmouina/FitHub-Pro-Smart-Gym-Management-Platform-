function StatusBadge({ status }) {
    const styles = {
        active: "bg-emerald-50 text-emerald-600",
        accepted: "bg-emerald-50 text-emerald-600",
        paid: "bg-emerald-50 text-emerald-600",
        available: "bg-emerald-50 text-emerald-600",

        pending: "bg-amber-50 text-amber-600",
        maintenance: "bg-amber-50 text-amber-600",

        rejected: "bg-rose-50 text-rose-500",
        cancelled: "bg-rose-50 text-rose-500",
        failed: "bg-rose-50 text-rose-500",

        completed: "bg-violet-50 text-violet-600",
        inactive: "bg-slate-100 text-slate-500",
        available: "bg-emerald-50 text-emerald-600",
        maintenance: "bg-amber-50 text-amber-600",
        out_of_service: "bg-rose-50 text-rose-500",
        in_progress: "bg-blue-50 text-blue-600",
    };

    return (
        <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-500"
                }`}
        >
            {status}
        </span>
    );
}

export default StatusBadge;