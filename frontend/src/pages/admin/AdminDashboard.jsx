import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return <p className="p-6">Chargement...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Admin
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="border p-4">
          <p>Adhérents</p>
          <strong>{stats.total_members}</strong>
        </div>

        <div className="border p-4">
          <p>Coachs</p>
          <strong>{stats.total_coaches}</strong>
        </div>

        <div className="border p-4">
          <p>Abonnements actifs</p>
          <strong>{stats.active_subscriptions}</strong>
        </div>

        <div className="border p-4">
          <p>Revenus</p>
          <strong>{stats.total_revenue} DH</strong>
        </div>

        <div className="border p-4">
          <p>Réservations</p>
          <strong>{stats.total_reservations}</strong>
        </div>

        <div className="border p-4">
          <p>Équipements</p>
          <strong>{stats.total_equipment}</strong>
        </div>

        <div className="border p-4">
          <p>Équipements en maintenance</p>
          <strong>{stats.equipment_in_maintenance}</strong>
        </div>

        <div className="border p-4">
          <p>Présences aujourd'hui</p>
          <strong>{stats.today_attendances}</strong>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;