import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";

function MemberDashboard() {
  const [subscription, setSubscription] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [subscriptionRes, reservationsRes, programsRes] =
        await Promise.all([
          api.get("/my-subscription"),
          api.get("/my-reservations"),
          api.get("/my-programs"),
        ]);

      setSubscription(subscriptionRes.data);
      setReservations(reservationsRes.data);
      setPrograms(programsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptedReservations = reservations.filter(
    (reservation) => reservation.status === "accepted"
  ).length;

  return (
    <div>
      <PageHeader
        title="Mon espace"
        description="Suivez votre abonnement, vos séances et votre programme"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        <StatCard
          title="Réservations"
          value={reservations.length}
          icon="◷"
          gradient="pink"
        />

        <StatCard
          title="Séances acceptées"
          value={acceptedReservations}
          icon="✓"
          gradient="purple"
        />

        <StatCard
          title="Programmes"
          value={programs.length}
          icon="◆"
          gradient="blue"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card>
          <p className="text-xs text-slate-400 uppercase">
            Mon abonnement
          </p>

          {subscription ? (
            <>
              <h2 className="text-xl font-bold text-slate-800 mt-2">
                {subscription.plan?.name || "Abonnement"}
              </h2>

              <div className="mt-3">
                <StatusBadge status={subscription.status} />
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <Info
                  label="Début"
                  value={subscription.start_date}
                />

                <Info
                  label="Fin"
                  value={subscription.end_date}
                />
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400 mt-4">
              Aucun abonnement actif.
            </p>
          )}
        </Card>

        <Card className="xl:col-span-2">
          <h2 className="font-bold text-slate-800">
            Mes réservations récentes
          </h2>

          <p className="text-xs text-slate-400 mt-1 mb-5">
            Vos dernières séances réservées
          </p>

          {reservations.length === 0 ? (
            <p className="text-sm text-slate-400 py-5">
              Aucune réservation.
            </p>
          ) : (
            <div className="space-y-3">
              {reservations.slice(0, 4).map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 rounded-xl p-4"
                >
                  <div>
                    <p className="font-semibold text-sm text-slate-700">
                      {reservation.activity?.name || "Séance"}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Coach : {reservation.coach?.name || "-"}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {reservation.session_date}{" "}
                      {reservation.start_time}
                    </p>
                  </div>

                  <StatusBadge status={reservation.status} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-700">
        {value || "-"}
      </span>
    </div>
  );
}

export default MemberDashboard;