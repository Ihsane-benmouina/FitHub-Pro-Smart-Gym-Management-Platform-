import { useEffect, useState } from "react";
import api from "../../api/axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/coach/availabilities", form);

      setForm({
        day_of_week: "monday",
        start_time: "",
        end_time: "",
      });

      loadAvailabilities();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/coach/availabilities/${id}`);
      loadAvailabilities();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Mes disponibilités
      </h1>

      <form onSubmit={handleSubmit} className="mb-8">

        <select
          value={form.day_of_week}
          onChange={(e) =>
            setForm({
              ...form,
              day_of_week: e.target.value,
            })
          }
          className="border p-2 mr-2"
        >
          <option value="monday">Lundi</option>
          <option value="tuesday">Mardi</option>
          <option value="wednesday">Mercredi</option>
          <option value="thursday">Jeudi</option>
          <option value="friday">Vendredi</option>
          <option value="saturday">Samedi</option>
          <option value="sunday">Dimanche</option>
        </select>

        <input
          type="time"
          value={form.start_time}
          onChange={(e) =>
            setForm({
              ...form,
              start_time: e.target.value,
            })
          }
          className="border p-2 mr-2"
        />

        <input
          type="time"
          value={form.end_time}
          onChange={(e) =>
            setForm({
              ...form,
              end_time: e.target.value,
            })
          }
          className="border p-2 mr-2"
        />

        <button
          type="submit"
          className="bg-black text-white p-2"
        >
          Ajouter
        </button>

      </form>

      {availabilities.map((availability) => (
        <div
          key={availability.id}
          className="border p-3 mb-2"
        >
          <span>
            {availability.day_of_week} :{" "}
            {availability.start_time} -{" "}
            {availability.end_time}
          </span>

          <button
            onClick={() => handleDelete(availability.id)}
            className="ml-4"
          >
            Supprimer
          </button>
        </div>
      ))}

    </div>
  );
}

export default Availabilities;