import { useEffect, useState } from "react";
import api from "../../api/axios";

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [message, setMessage] = useState("");
const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    member_id: "",
    title: "",
    description: "",
    goal: "",
    start_date: "",
    end_date: "",
  });

useEffect(() => {
  loadPrograms();
  loadMembers();
}, []);

  const loadPrograms = async () => {
    try {
      const response = await api.get("/coach/programs");
      setPrograms(response.data);
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
      await api.post("/programs", form);

      setMessage("Programme créé avec succès");

      setForm({
        member_id: "",
        title: "",
        description: "",
        goal: "",
        start_date: "",
        end_date: "",
      });

      loadPrograms();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la création"
      );
    }
  };

  const loadMembers = async () => {
  try {
    const response = await api.get("/members");
    setMembers(response.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Programmes d'entraînement
      </h1>

      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-8">
      <select
  name="member_id"
  value={form.member_id}
  onChange={handleChange}
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
          type="text"
          name="title"
          placeholder="Titre du programme"
          value={form.title}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <input
          type="text"
          name="goal"
          placeholder="Objectif"
          value={form.goal}
          onChange={handleChange}
          className="border p-2 block mb-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 block mb-3"
        />

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="border p-2 block mb-3"
        />

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          className="border p-2 block mb-3"
        />

        <button className="bg-black text-white px-4 py-2">
          Créer le programme
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">
        Mes programmes
      </h2>

      {programs.length === 0 ? (
        <p>Aucun programme.</p>
      ) : (
        programs.map((program) => (
          <div key={program.id} className="border p-4 mb-3">
            <h3 className="font-bold">{program.title}</h3>

            <p>Adhérent : {program.member?.name}</p>
            <p>Objectif : {program.goal}</p>
            <p>Statut : {program.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

const addExercise = async (programId) => {
  const exerciseId = prompt("Entrez l'ID de l'exercice");

  if (!exerciseId) return;

  try {
    await api.post(`/programs/${programId}/exercises`, {
      exercise_id: exerciseId,
      sets: 3,
      reps: 10,
      rest_seconds: 60,
    });

    setMessage("Exercice ajouté au programme");
    loadPrograms();
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      "Erreur lors de l'ajout de l'exercice"
    );
  }
};

export default Programs;