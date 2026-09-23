import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

function Reservations() {
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

  const acceptReservation = async (id) => {
    try {
      await api.put(`/reservations/${id}/accept`);
      loadReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectReservation = async (id) => {
    try {
      await api.put(`/reservations/${id}/reject`);
      loadReservations();
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div>
    <PageHeader
      title="Réservations"
      description="Consultez et gérez les demandes de séances de vos adhérents"
    />

    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="font-bold text-slate-800">
          Mes réservations
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          {reservations.length} réservation(s)
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-400">
          Aucune réservation pour le moment.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-400 uppercase">
                <th className="px-6 py-4 font-medium">
                  Adhérent
                </th>

                <th className="px-6 py-4 font-medium">
                  Activité
                </th>

                <th className="px-6 py-4 font-medium">
                  Date
                </th>

                <th className="px-6 py-4 font-medium">
                  Statut
                </th>

                <th className="px-6 py-4 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="hover:bg-slate-50/60"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center font-semibold">
                        {reservation.member?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "M"}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {reservation.member?.name ||
                          "Adhérent"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {reservation.activity?.name || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">
                      {reservation.session_date}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {reservation.start_time}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={reservation.status}
                    />
                  </td>

                  <td className="px-6 py-4">
                    {reservation.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            acceptReservation(
                              reservation.id
                            )
                          }
                        >
                          Accepter
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() =>
                            rejectReservation(
                              reservation.id
                            )
                          }
                        >
                          Refuser
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Traité
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  </div>
);
}

export default Reservations;