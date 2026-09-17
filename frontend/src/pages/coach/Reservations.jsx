import { useEffect, useState } from "react";
import api from "../../api/axios";

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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Réservations
      </h1>

      {reservations.length === 0 ? (
        <p>Aucune réservation.</p>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="border p-4 mb-3"
          >
            <p>
              Adhérent : {reservation.member?.name}
            </p>

            <p>
              Activité : {reservation.activity?.name}
            </p>

            <p>Date : {reservation.session_date}</p>

            <p>
              Heure : {reservation.start_time} -{" "}
              {reservation.end_time}
            </p>

            <p>Statut : {reservation.status}</p>

            {reservation.status === "pending" && (
              <div className="mt-3">

                <button
                  onClick={() =>
                    acceptReservation(reservation.id)
                  }
                  className="bg-black text-white px-3 py-2 mr-2"
                >
                  Accepter
                </button>

                <button
                  onClick={() =>
                    rejectReservation(reservation.id)
                  }
                  className="border px-3 py-2"
                >
                  Refuser
                </button>

              </div>
            )}
          </div>
        ))
      )}

    </div>
  );
}

export default Reservations;