import { useEffect, useState } from "react";
import api from "../../api/axios";

function Maintenances() {
  const [maintenances, setMaintenances] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    equipment_id: "",
    description: "",
    type: "preventive",
    scheduled_date: "",
  });

  useEffect(() => {
    loadMaintenances();
  }, []);

  const loadMaintenances = async () => {
    try {
      const response = await api.get("/maintenances");
      setMaintenances(response.data);
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
      await api.post("/maintenances", form);

      setMessage("Maintenance créée avec succès");

      setForm({
        equipment_id: "",
        description: "",
        type: "preventive",
        scheduled_date: "",
      });

      loadMaintenances();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la création"
      );
    }
  };

  const completeMaintenance = async (id) => {
    try {
      await api.put(`/maintenances/${id}/complete`, {
        cost: 0,
      });

      setMessage("Maintenance terminée avec succès");
      loadMaintenances();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la modification"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Maintenances
      </h1>

      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="number"
          name="equipment_id"
          value={form.equipment_id}
          onChange={handleChange}
          placeholder="ID Équipement"
          className="border p-2 block mb-2"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 block mb-2"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 block mb-2"
        >
          <option value="preventive">
            Préventive
          </option>

          <option value="corrective">
            Corrective
          </option>
        </select>

        <input
          type="date"
          name="scheduled_date"
          value={form.scheduled_date}
          onChange={handleChange}
          className="border p-2 block mb-3"
        />

        <button className="bg-black text-white px-4 py-2">
          Créer maintenance
        </button>
      </form>

      {maintenances.length === 0 ? (
        <p>Aucune maintenance.</p>
      ) : (
        maintenances.map((maintenance) => (
          <div
            key={maintenance.id}
            className="border p-4 mb-3"
          >
            <strong>
              {maintenance.equipment?.name}
            </strong>

            <p>{maintenance.description}</p>
            <p>Type : {maintenance.type}</p>
            <p>Statut : {maintenance.status}</p>
            <p>Date prévue : {maintenance.scheduled_date}</p>

            {maintenance.status !== "completed" && (
              <button
                onClick={() =>
                  completeMaintenance(maintenance.id)
                }
                className="bg-black text-white px-3 py-2 mt-2"
              >
                Terminer
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Maintenances;