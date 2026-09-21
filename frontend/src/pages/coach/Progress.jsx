import { useEffect, useState } from "react";
import api from "../../api/axios";

function Progress() {
  const [members, setMembers] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    member_id: "",
    weight: "",
    height: "",
    body_fat_percentage: "",
    muscle_mass: "",
    notes: "",
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async (memberId) => {
    if (!memberId) {
      setHistory([]);
      return;
    }

    try {
      const response = await api.get(
        `/members/${memberId}/progress`
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemberChange = (e) => {
    const memberId = e.target.value;

    setForm({
      ...form,
      member_id: memberId,
    });

    loadHistory(memberId);
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
      await api.post("/progress-records", form);

      setMessage("Progression enregistrée avec succès");

      loadHistory(form.member_id);

      setForm({
        ...form,
        weight: "",
        height: "",
        body_fat_percentage: "",
        muscle_mass: "",
        notes: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Suivi de progression
      </h1>

      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-8">
        <select
          name="member_id"
          value={form.member_id}
          onChange={handleMemberChange}
          className="border p-2 block mb-3"
          required
        >
          <option value="">Choisir un adhérent</option>

          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          step="0.1"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          placeholder="Poids (kg)"
          className="border p-2 block mb-3"
        />

        <input
          type="number"
          step="0.1"
          name="height"
          value={form.height}
          onChange={handleChange}
          placeholder="Taille (cm)"
          className="border p-2 block mb-3"
        />

        <input
          type="number"
          step="0.1"
          name="body_fat_percentage"
          value={form.body_fat_percentage}
          onChange={handleChange}
          placeholder="Masse grasse (%)"
          className="border p-2 block mb-3"
        />

        <input
          type="number"
          step="0.1"
          name="muscle_mass"
          value={form.muscle_mass}
          onChange={handleChange}
          placeholder="Masse musculaire (kg)"
          className="border p-2 block mb-3"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="border p-2 block mb-3"
        />

        <button className="bg-black text-white px-4 py-2">
          Enregistrer
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">
        Historique
      </h2>

      {!form.member_id ? (
        <p>Choisissez un adhérent.</p>
      ) : history.length === 0 ? (
        <p>Aucune progression enregistrée.</p>
      ) : (
        history.map((item) => (
          <div key={item.id} className="border p-4 mb-3">
            <p>
              Date :{" "}
              {new Date(item.recorded_at).toLocaleDateString()}
            </p>

            <p>Poids : {item.weight || "-"} kg</p>
            <p>Taille : {item.height || "-"} cm</p>

            <p>
              Masse grasse :{" "}
              {item.body_fat_percentage || "-"} %
            </p>

            <p>
              Masse musculaire :{" "}
              {item.muscle_mass || "-"} kg
            </p>

            {item.notes && <p>Notes : {item.notes}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default Progress;