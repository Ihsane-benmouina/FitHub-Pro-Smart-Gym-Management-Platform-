import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";

function CoachDashboard() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const response = await api.get("/coach/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const pending = reservations.filter(
    (item) => item.status === "pending"
  ).length;

  const accepted = reservations.filter(
    (item) => item.status === "accepted"
  ).length;

  const completed = reservations.filter(
    (item) => item.status === "completed"
  ).length;

  return (
    <div>
      <PageHeader
        title="Espace Coach"
        description="Gérez vos séances et accompagnez vos adhérents"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        <StatCard
          title="Réservations"
          value={reservations.length}
          icon="◷"
          gradient="pink"
        />

        <StatCard
          title="À confirmer"
          value={pending}
          icon="◇"
          gradient="purple"
        />

        <StatCard
          title="Acceptées"
          value={accepted}
          icon="✓"
          gradient="blue"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-slate-800">
                Réservations récentes
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Vos dernières demandes de séance
              </p>
            </div>
          </div>

          {reservations.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">
              Aucune réservation.
            </p>
          ) : (
            <div className="space-y-3">
              {reservations.slice(0, 5).map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center font-semibold">
                      {reservation.member?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "M"}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {reservation.member?.name || "Adhérent"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {reservation.activity?.name || "Séance"}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={reservation.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="font-bold text-slate-800">
            Résumé
          </h2>

          <p className="text-xs text-slate-400 mt-1 mb-6">
            Votre activité
          </p>

          <div className="space-y-5">
            <CoachSummary
              label="Demandes en attente"
              value={pending}
              color="bg-pink-500"
            />

            <CoachSummary
              label="Séances acceptées"
              value={accepted}
              color="bg-violet-500"
            />

            <CoachSummary
              label="Séances terminées"
              value={completed}
              color="bg-blue-500"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function CoachSummary({ label, value, color }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${color}`} />

        <span className="text-sm text-slate-500">
          {label}
        </span>
      </div>

      <span className="font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

export default CoachDashboard;