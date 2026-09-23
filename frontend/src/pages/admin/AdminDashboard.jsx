import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_members: 0,
    total_coaches: 0,
    active_subscriptions: 0,
    total_revenue: 0,
    total_reservations: 0,
    total_equipment: 0,
    equipment_in_maintenance: 0,
    today_attendances: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Vue d'ensemble de votre salle de sport"
      />

      {/* CARTES PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        <StatCard
          title="Adhérents"
          value={stats.total_members}
          icon="♙"
          gradient="pink"
        />

        <StatCard
          title="Abonnements actifs"
          value={stats.active_subscriptions}
          icon="◇"
          gradient="purple"
        />

        <StatCard
          title="Présences aujourd'hui"
          value={stats.today_attendances}
          icon="↗"
          gradient="blue"
        />

        <StatCard
          title="Revenus"
          value={`${stats.total_revenue} DH`}
          icon="◉"
          gradient="orange"
        />
      </div>

      {/* GRANDE ZONE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-7">

        {/* Aperçu */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-bold text-slate-800">
                Aperçu de l'activité
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Statistiques générales de FitHub Pro
              </p>
            </div>

            <span className="text-xs bg-pink-50 text-pink-500 px-3 py-2 rounded-lg">
              Ce mois
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-slate-400">
                Coachs
              </p>

              <p className="text-2xl font-bold text-slate-800 mt-2">
                {stats.total_coaches}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Réservations
              </p>

              <p className="text-2xl font-bold text-slate-800 mt-2">
                {stats.total_reservations}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Équipements
              </p>

              <p className="text-2xl font-bold text-slate-800 mt-2">
                {stats.total_equipment}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                En maintenance
              </p>

              <p className="text-2xl font-bold text-slate-800 mt-2">
                {stats.equipment_in_maintenance}
              </p>
            </div>
          </div>

          {/* Visualisation simple */}
          <div className="mt-10 h-48 flex items-end gap-4 border-b border-slate-100">
            <div className="flex-1 h-[35%] rounded-t-xl bg-pink-100" />
            <div className="flex-1 h-[55%] rounded-t-xl bg-pink-200" />
            <div className="flex-1 h-[45%] rounded-t-xl bg-violet-200" />
            <div className="flex-1 h-[75%] rounded-t-xl bg-violet-300" />
            <div className="flex-1 h-[60%] rounded-t-xl bg-blue-200" />
            <div className="flex-1 h-[90%] rounded-t-xl bg-gradient-to-t from-pink-500 to-violet-500" />
            <div className="flex-1 h-[70%] rounded-t-xl bg-orange-200" />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 mt-3 px-2">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>
        </div>

        {/* Résumé */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-800">
            État de la salle
          </h2>

          <p className="text-xs text-slate-400 mt-1 mb-7">
            Résumé opérationnel
          </p>

          <div className="space-y-6">
            <SummaryItem
              title="Adhérents inscrits"
              value={stats.total_members}
              color="bg-pink-500"
            />

            <SummaryItem
              title="Coachs disponibles"
              value={stats.total_coaches}
              color="bg-violet-500"
            />

            <SummaryItem
              title="Abonnements actifs"
              value={stats.active_subscriptions}
              color="bg-blue-500"
            />

            <SummaryItem
              title="Maintenance"
              value={stats.equipment_in_maintenance}
              color="bg-orange-400"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <MiniCard
          title="Réservations"
          value={stats.total_reservations}
          description="Sessions enregistrées"
        />

        <MiniCard
          title="Équipements"
          value={stats.total_equipment}
          description="Matériels enregistrés"
        />

        <MiniCard
          title="Revenus"
          value={`${stats.total_revenue} DH`}
          description="Paiements confirmés"
        />

      </div>
    </div>
  );
}

function SummaryItem({ title, value, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`w-3 h-3 rounded-full ${color}`}
        />

        <span className="text-sm text-slate-500">
          {title}
        </span>
      </div>

      <span className="font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

function MiniCard({ title, value, description }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <p className="text-xs text-slate-400">
        {title}
      </p>

      <p className="text-2xl font-bold text-slate-800 mt-2">
        {value}
      </p>

      <p className="text-xs text-slate-400 mt-3">
        {description}
      </p>
    </div>
  );
}

export default AdminDashboard;