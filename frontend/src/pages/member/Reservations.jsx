import { useEffect, useState } from "react";
import api from "../../api/axios";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    coach_id: "",
    activity_id: "",
    session_date: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const response = await api.get("/my-reservations");
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/reservations", form);

      setMessage("Réservation créée avec succès");

      setForm({
        coach_id: "",
        activity_id: "",
        session_date: "",
        start_time: "",
        end_time: "",
      });

      loadReservations();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la réservation"
      );
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Mes réservations
      </h1>

      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-8">

        <input
          type="number"
          name="coach_id"
          placeholder="ID Coach"
          value={form.coach_id}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <input
          type="number"
          name="activity_id"
          placeholder="ID Activité"
          value={form.activity_id}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <input
          type="date"
          name="session_date"
          value={form.session_date}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <input
          type="time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <input
          type="time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Réserver
        </button>

      </form>

      <h2 className="text-xl font-bold mb-4">
        Historique
      </h2>

      {reservations.length === 0 ? (
        <p>Aucune réservation.</p>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="border p-4 mb-3"
          >
            <p>
              Coach : {reservation.coach?.name}
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
          </div>
        ))
      )}

    </div>
  );
}

export default Reservations;