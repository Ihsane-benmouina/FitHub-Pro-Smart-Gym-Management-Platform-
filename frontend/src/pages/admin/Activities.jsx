import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

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

      await loadActivities();
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

      await loadActivities();
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

      await loadActivities();
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

      await loadActivities();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Impossible de supprimer l'activité"
      );
    }
  };

 return (
  <div>
    <PageHeader
      title="Activités"
      description="Gérez les activités sportives et leurs coachs"
    />

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-7">

      {/* AJOUT ACTIVITÉ */}
      <Card>
        <div className="mb-6">
          <h2 className="font-bold text-slate-800">
            Nouvelle activité
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Ajoutez une activité proposée par la salle
          </p>
        </div>

        <form
          onSubmit={createActivity}
          className="space-y-4"
        >
          <Input
            label="Nom de l'activité"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex : Musculation"
            required
          />

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description de l'activité..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              rows="4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Durée"
              type="number"
              min="1"
              name="duration_minutes"
              value={form.duration_minutes}
              onChange={handleChange}
              placeholder="60 minutes"
            />

            <Input
              label="Capacité"
              type="number"
              min="1"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="20 personnes"
            />
          </div>

          <Button type="submit">
            + Ajouter l'activité
          </Button>
        </form>
      </Card>

      {/* ASSOCIATION COACH */}
      <Card>
        <div className="mb-6">
          <h2 className="font-bold text-slate-800">
            Associer un coach
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Affectez un coach à une activité
          </p>
        </div>

        <form
          onSubmit={assignCoach}
          className="space-y-4"
        >
          <Select
            label="Activité"
            value={coachForm.activity_id}
            onChange={(e) =>
              setCoachForm({
                ...coachForm,
                activity_id: e.target.value,
              })
            }
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
          </Select>

          <Select
            label="Coach"
            value={coachForm.coach_id}
            onChange={(e) =>
              setCoachForm({
                ...coachForm,
                coach_id: e.target.value,
              })
            }
            required
          >
            <option value="">
              Choisir un coach
            </option>

            {coaches.map((coach) => (
              <option
                key={coach.id}
                value={coach.id}
              >
                {coach.name}
              </option>
            ))}
          </Select>

          <Button type="submit">
            Associer le coach
          </Button>
        </form>
      </Card>
    </div>

    {message && (
      <div className="mb-6 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm">
        {message}
      </div>
    )}

    {/* LISTE */}
    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="font-bold text-slate-800">
          Activités disponibles
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          {activities.length} activité(s)
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-400">
          Aucune activité disponible.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="border border-slate-100 rounded-2xl p-5 hover:shadow-md transition"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center mb-4">
                ◆
              </div>

              <h3 className="font-bold text-slate-800">
                {activity.name}
              </h3>

              <p className="text-xs text-slate-400 mt-2 min-h-8">
                {activity.description ||
                  "Aucune description"}
              </p>

              <div className="flex gap-4 mt-5 text-xs">
                <div>
                  <span className="text-slate-400">
                    Durée
                  </span>

                  <p className="font-semibold text-slate-700 mt-1">
                    {activity.duration_minutes || "-"} min
                  </p>
                </div>

                <div>
                  <span className="text-slate-400">
                    Capacité
                  </span>

                  <p className="font-semibold text-slate-700 mt-1">
                    {activity.capacity || "-"}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500 mb-3">
                  Coachs
                </p>

                {!activity.coaches ||
                activity.coaches.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    Aucun coach associé
                  </p>
                ) : (
                  <div className="space-y-2">
                    {activity.coaches.map((coach) => (
                      <div
                        key={coach.id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-slate-600">
                          {coach.name}
                        </span>

                        <button
                          onClick={() =>
                            removeCoach(
                              activity.id,
                              coach.id
                            )
                          }
                          className="text-xs text-rose-500"
                        >
                          Retirer
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="danger"
                className="w-full mt-5"
                onClick={() =>
                  deleteActivity(activity.id)
                }
              >
                Supprimer
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  </div>
);
}

export default Activities;