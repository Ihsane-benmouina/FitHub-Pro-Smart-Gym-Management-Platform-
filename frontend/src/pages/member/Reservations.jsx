import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [activities, setActivities] = useState([]);

  const [form, setForm] = useState({
    coach_id: "",
    activity_id: "",
    session_date: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    loadReservations();
    loadCoaches();
    loadActivities();
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

      await loadReservations();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Erreur lors de la réservation"
      );
    }
  };

  const loadCoaches = async () => {
    try {
      const response = await api.get("/coaches");
      setCoaches(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadActivities = async () => {
    try {
      const response = await api.get("/activities");
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div>
    <PageHeader
      title="Mes réservations"
      description="Réservez une séance avec l'un de nos coachs"
    />

    {message && (
      <div className="mb-6 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm">
        {message}
      </div>
    )}

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card>
        <h2 className="font-bold text-slate-800">
          Nouvelle réservation
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Planifiez votre prochaine séance
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Activité"
            name="activity_id"
            value={form.activity_id}
            onChange={handleChange}
            required
          >
            <option value="">Choisir une activité</option>

            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </Select>

          <Select
            label="Coach"
            name="coach_id"
            value={form.coach_id}
            onChange={handleChange}
            required
          >
            <option value="">Choisir un coach</option>

            {coaches.map((coach) => (
              <option key={coach.id} value={coach.id}>
                {coach.name}
              </option>
            ))}
          </Select>

          <Input
            label="Date"
            type="date"
            name="session_date"
            value={form.session_date}
            onChange={handleChange}
            required
          />

          <Input
            label="Heure"
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
          />

          <Input
            label="Heure de fin"
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="w-full">
            Réserver la séance
          </Button>
        </form>
      </Card>

      <div className="xl:col-span-2">
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">
              Historique des réservations
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {reservations.length} réservation(s)
            </p>
          </div>

          {reservations.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400">
              Aucune réservation.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center">
                        ◷
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-700">
                          {reservation.activity?.name || "Séance"}
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          Coach {reservation.coach?.name || "-"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {reservation.session_date} à{" "}
                          {reservation.start_time}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={reservation.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  </div>
);
}

export default Reservations;