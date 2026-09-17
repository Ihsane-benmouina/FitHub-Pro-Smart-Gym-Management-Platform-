import { useEffect, useState } from "react";
import api from "../../api/axios";

function Exercises() {
  const [exercises, setExercises] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    muscle_group: "",
  });

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const response = await api.get("/exercises");
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/exercises", form);

      setForm({
        name: "",
        description: "",
        muscle_group: "",
      });

      loadExercises();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Exercices</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 block mb-3"
          required
        />

        <input
          type="text"
          placeholder="Groupe musculaire"
          value={form.muscle_group}
          onChange={(e) =>
            setForm({ ...form, muscle_group: e.target.value })
          }
          className="border p-2 block mb-3"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border p-2 block mb-3"
        />

        <button className="bg-black text-white px-4 py-2">
          Ajouter
        </button>
      </form>

      {exercises.map((exercise) => (
        <div key={exercise.id} className="border p-3 mb-2">
          <strong>{exercise.name}</strong>
          <p>{exercise.muscle_group}</p>
          <p>{exercise.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Exercises;