import { useEffect, useState } from "react";
import api from "../../api/axios";

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    serial_number: "",
    category: "",
    purchase_date: "",
    status: "available",
    location: "",
    notes: "",
  });

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const response = await api.get("/equipment");
      setEquipment(response.data);
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
      await api.post("/equipment", form);

      setMessage("Équipement ajouté avec succès");

      setForm({
        name: "",
        serial_number: "",
        category: "",
        purchase_date: "",
        status: "available",
        location: "",
        notes: "",
      });

      loadEquipment();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'ajout"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/equipment/${id}`);

      setMessage("Équipement supprimé avec succès");
      loadEquipment();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Gestion des équipements
      </h1>

      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nom"
          className="border p-2 block mb-2"
          required
        />

        <input
          name="serial_number"
          value={form.serial_number}
          onChange={handleChange}
          placeholder="Numéro de série"
          className="border p-2 block mb-2"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Catégorie"
          className="border p-2 block mb-2"
        />

        <input
          type="date"
          name="purchase_date"
          value={form.purchase_date}
          onChange={handleChange}
          className="border p-2 block mb-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 block mb-2"
        >
          <option value="available">Disponible</option>
          <option value="in_use">En utilisation</option>
          <option value="maintenance">Maintenance</option>
          <option value="out_of_service">Hors service</option>
        </select>

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Emplacement"
          className="border p-2 block mb-2"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="border p-2 block mb-3"
        />

        <button className="bg-black text-white px-4 py-2">
          Ajouter
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">
        Liste des équipements
      </h2>

      {equipment.length === 0 ? (
        <p>Aucun équipement.</p>
      ) : (
        equipment.map((item) => (
          <div key={item.id} className="border p-4 mb-3">
            <strong>{item.name}</strong>

            <p>Catégorie : {item.category}</p>
            <p>Statut : {item.status}</p>
            <p>Emplacement : {item.location}</p>

            <button
              onClick={() => handleDelete(item.id)}
              className="border px-3 py-1 mt-2"
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Equipment;