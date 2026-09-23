import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Availabilities() {
  const [availabilities, setAvailabilities] = useState([]);

  const [form, setForm] = useState({
    day_of_week: "monday",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const loadAvailabilities = async () => {
    try {
      const response = await api.get("/coach/availabilities");
      setAvailabilities(response.data);
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

    try {
      await api.post("/coach/availabilities", form);

      setForm({
        day_of_week: "monday",
        start_time: "",
        end_time: "",
      });

      await loadAvailabilities();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/coach/availabilities/${id}`);
      await loadAvailabilities();
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div>
    <PageHeader
      title="Mes disponibilités"
      description="Définissez les jours et horaires pendant lesquels vous êtes disponible"
    />

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card>
        <h2 className="font-bold text-slate-800">
          Ajouter un créneau
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Configurez une nouvelle disponibilité
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Jour"
            name="day_of_week"
            value={form.day_of_week}
            onChange={handleChange}
            required
          >
            <option value="">Choisir un jour</option>
            <option value="monday">Lundi</option>
            <option value="tuesday">Mardi</option>
            <option value="wednesday">Mercredi</option>
            <option value="thursday">Jeudi</option>
            <option value="friday">Vendredi</option>
            <option value="saturday">Samedi</option>
            <option value="sunday">Dimanche</option>
          </Select>

          <Input
            label="Heure de début"
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
            + Ajouter le créneau
          </Button>
        </form>
      </Card>

      <div className="xl:col-span-2">
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">
              Planning hebdomadaire
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {availabilities.length} créneau(x)
            </p>
          </div>

          {availabilities.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400">
              Aucune disponibilité enregistrée.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {availabilities.map((availability) => (
                <div
                  key={availability.id}
                  className="border border-slate-100 rounded-2xl p-5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-3">
                        ◷
                      </div>

                      <p className="font-semibold text-slate-700 capitalize">
                        {availability.day_of_week}
                      </p>

                      <p className="text-sm text-slate-400 mt-2">
                        {availability.start_time} —{" "}
                        {availability.end_time}
                      </p>
                    </div>

                    <Button
                      variant="danger"
                      onClick={() =>
                        deleteAvailability(availability.id)
                      }
                    >
                      Supprimer
                    </Button>
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

export default Availabilities;