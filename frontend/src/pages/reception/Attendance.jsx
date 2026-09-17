import { useState } from "react";
import api from "../../api/axios";

function Attendance() {
  const [memberId, setMemberId] = useState("");
  const [message, setMessage] = useState("");

  const checkIn = async () => {
    try {
      const response = await api.post("/attendance/check-in", {
        member_id: memberId,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Erreur lors de l'entrée"
      );
    }
  };

  const checkOut = async () => {
    try {
      const response = await api.post("/attendance/check-out", {
        member_id: memberId,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Erreur lors de la sortie"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Gestion des présences
      </h1>

      {message && <p className="mb-4">{message}</p>}

      <input
        type="number"
        placeholder="ID Adhérent"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        className="border p-2 block mb-4"
      />

      <button
        onClick={checkIn}
        className="bg-black text-white px-4 py-2 mr-3"
      >
        Enregistrer l'entrée
      </button>

      <button
        onClick={checkOut}
        className="border px-4 py-2"
      >
        Enregistrer la sortie
      </button>
    </div>
  );
}

export default Attendance;