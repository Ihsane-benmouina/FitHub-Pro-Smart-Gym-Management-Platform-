import { useEffect, useState } from "react";
import api from "../../api/axios";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration_minutes: "",
    capacity: "",
  });

  const [coachForm, setCoachForm] = useState({
    activity_id: "",
    coach_id: "",
  });

  useEffect(() => {
    loadActivities();
    loadCoaches();
  }, []);

  const loadActivities = async () => {
    try {
      const response = await api.get("/activities");
      setActivities(response.data);
    } catch (error) {
      console.error(error);
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createActivity = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/activities", form);

      setMessage("Activité créée avec succès");

      setForm({
        name: "",
        description: "",
        duration_minutes: "",
        capacity: "",
      });

      loadActivities();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la création"
      );
    }
  };

  const assignCoach = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post(
        `/activities/${coachForm.activity_id}/coaches`,
        {
          coach_id: coachForm.coach_id,
        }
      );

      setMessage("Coach associé avec succès");

      setCoachForm({
        activity_id: "",
        coach_id: "",
      });

      loadActivities();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'association"
      );
    }
  };

  const removeCoach = async (activityId, coachId) => {
    try {
      await api.delete(
        `/activities/${activityId}/coaches/${coachId}`
      );

      setMessage("Coach retiré avec succès");

      loadActivities();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  const deleteActivity = async (id) => {
    try {
      await api.delete(`/activities/${id}`);

      setMessage("Activité supprimée avec succès");

      loadActivities();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Impossible de supprimer l'activité"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Gestion des activités
      </h1>

      {message && (
        <p className="mb-4">{message}</p>
      )}

      <h2 className="text-xl font-bold mb-4">
        Ajouter une activité
      </h2>

      <form
        onSubmit={createActivity}
        className="mb-8"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nom de l'activité"
          className="border p-2 block mb-2"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 block mb-2"
        />

        <input
          type="number"
          min="1"
          name="duration_minutes"
          value={form.duration_minutes}
          onChange={handleChange}
          placeholder="Durée en minutes"
          className="border p-2 block mb-2"
        />

        <input
          type="number"
          min="1"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          placeholder="Capacité"
          className="border p-2 block mb-3"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Ajouter
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">
        Associer un coach
      </h2>

      <form
        onSubmit={assignCoach}
        className="mb-8"
      >
        <select
          value={coachForm.activity_id}
          onChange={(e) =>
            setCoachForm({
              ...coachForm,
              activity_id: e.target.value,
            })
          }
          className="border p-2 block mb-2"
          required
        >
          <option value="">
            Choisir une activité
          </option>

          {activities.map((activity) => (
            <option
              key={activity.id}
              value={activity.id}
            >
              {activity.name}
            </option>
          ))}
        </select>

        <select
          value={coachForm.coach_id}
          onChange={(e) =>
            setCoachForm({
              ...coachForm,
              coach_id: e.target.value,
            })
          }
          className="border p-2 block mb-3"
          required
        >
          <option value="">
            Choisir un coach
          </option>

          {coaches.map((coach) => (
            <option key={coach.id} value={coach.id}>
              {coach.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Associer
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">
        Liste des activités
      </h2>

      {activities.length === 0 ? (
        <p>Aucune activité.</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="border p-4 mb-4"
          >
            <h3 className="font-bold">
              {activity.name}
            </h3>

            <p>
              {activity.description || "Aucune description"}
            </p>

            <p>
              Durée : {activity.duration_minutes || "-"} min
            </p>

            <p>
              Capacité : {activity.capacity || "-"}
            </p>

            <div className="mt-3">
              <strong>Coachs :</strong>

              {!activity.coaches ||
              activity.coaches.length === 0 ? (
                <p>Aucun coach associé.</p>
              ) : (
                activity.coaches.map((coach) => (
                  <div
                    key={coach.id}
                    className="mt-2"
                  >
                    {coach.name}

                    <button
                      onClick={() =>
                        removeCoach(
                          activity.id,
                          coach.id
                        )
                      }
                      className="border px-2 py-1 ml-3"
                    >
                      Retirer
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() =>
                deleteActivity(activity.id)
              }
              className="border px-3 py-2 mt-4"
            >
              Supprimer l'activité
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Activities;