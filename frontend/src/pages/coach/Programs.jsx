import { useEffect, useState } from "react";
import api from "../../api/axios";

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [members, setMembers] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [message, setMessage] = useState("");

  // Formulaire création programme
  const [form, setForm] = useState({
    member_id: "",
    title: "",
    description: "",
    goal: "",
    start_date: "",
    end_date: "",
  });

  // Formulaire ajout exercice
  const [exerciseForm, setExerciseForm] = useState({
    program_id: "",
    exercise_id: "",
    sets: 3,
    reps: 10,
    weight: "",
    rest_seconds: 60,
  });

  useEffect(() => {
    loadPrograms();
    loadMembers();
    loadExercises();
  }, []);

  // Charger les programmes du coach
  const loadPrograms = async () => {
    try {
      const response = await api.get("/coach/programs");
      setPrograms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Charger les adhérents
  const loadMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Charger les exercices
  const loadExercises = async () => {
    try {
      const response = await api.get("/exercises");
      setExercises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Modifier les champs du formulaire programme
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Créer un programme
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
          "Erreur lors de la création du programme"
      );
    }
  };

  // Ajouter un exercice à un programme
  const addExercise = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post(
        `/programs/${exerciseForm.program_id}/exercises`,
        {
          exercise_id: exerciseForm.exercise_id,
          sets: exerciseForm.sets,
          reps: exerciseForm.reps,
          weight: exerciseForm.weight || null,
          rest_seconds: exerciseForm.rest_seconds,
        }
      );

      setMessage("Exercice ajouté au programme avec succès");

      setExerciseForm({
        program_id: "",
        exercise_id: "",
        sets: 3,
        reps: 10,
        weight: "",
        rest_seconds: 60,
      });

      loadPrograms();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'ajout de l'exercice"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Programmes d'entraînement
      </h1>

      {message && (
        <p className="mb-4">
          {message}
        </p>
      )}

      {/* Création d'un programme */}
      <h2 className="text-xl font-bold mb-4">
        Créer un programme
      </h2>

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

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Créer le programme
        </button>
      </form>

      {/* Ajouter un exercice */}
      <h2 className="text-xl font-bold mb-4">
        Ajouter un exercice à un programme
      </h2>

      <form onSubmit={addExercise} className="mb-8">
        <select
          value={exerciseForm.program_id}
          onChange={(e) =>
            setExerciseForm({
              ...exerciseForm,
              program_id: e.target.value,
            })
          }
          className="border p-2 block mb-2"
          required
        >
          <option value="">Choisir un programme</option>

          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.title}
            </option>
          ))}
        </select>

        <select
          value={exerciseForm.exercise_id}
          onChange={(e) =>
            setExerciseForm({
              ...exerciseForm,
              exercise_id: e.target.value,
            })
          }
          className="border p-2 block mb-2"
          required
        >
          <option value="">Choisir un exercice</option>

          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          placeholder="Séries"
          value={exerciseForm.sets}
          onChange={(e) =>
            setExerciseForm({
              ...exerciseForm,
              sets: e.target.value,
            })
          }
          className="border p-2 block mb-2"
          required
        />

        <input
          type="number"
          min="1"
          placeholder="Répétitions"
          value={exerciseForm.reps}
          onChange={(e) =>
            setExerciseForm({
              ...exerciseForm,
              reps: e.target.value,
            })
          }
          className="border p-2 block mb-2"
          required
        />

        <input
          type="number"
          min="0"
          step="0.5"
          placeholder="Poids (kg)"
          value={exerciseForm.weight}
          onChange={(e) =>
            setExerciseForm({
              ...exerciseForm,
              weight: e.target.value,
            })
          }
          className="border p-2 block mb-2"
        />

        <input
          type="number"
          min="0"
          placeholder="Repos (secondes)"
          value={exerciseForm.rest_seconds}
          onChange={(e) =>
            setExerciseForm({
              ...exerciseForm,
              rest_seconds: e.target.value,
            })
          }
          className="border p-2 block mb-3"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Ajouter l'exercice
        </button>
      </form>

      {/* Liste des programmes */}
      <h2 className="text-xl font-bold mb-4">
        Mes programmes
      </h2>

      {programs.length === 0 ? (
        <p>Aucun programme.</p>
      ) : (
        programs.map((program) => (
          <div
            key={program.id}
            className="border p-4 mb-3"
          >
            <h3 className="font-bold">
              {program.title}
            </h3>

            <p>
              Adhérent : {program.member?.name}
            </p>

            <p>
              Objectif : {program.goal || "-"}
            </p>

            <p>
              Statut : {program.status}
            </p>

            {program.description && (
              <p>
                Description : {program.description}
              </p>
            )}

            {/* Exercices du programme */}
            {program.exercises?.length > 0 && (
              <div className="mt-4">
                <strong>Exercices :</strong>

                {program.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="border-l pl-3 mt-3"
                  >
                    <p className="font-semibold">
                      {exercise.name}
                    </p>

                    <p>
                      Séries : {exercise.pivot?.sets || "-"}
                    </p>

                    <p>
                      Répétitions :{" "}
                      {exercise.pivot?.reps || "-"}
                    </p>

                    {exercise.pivot?.weight && (
                      <p>
                        Poids : {exercise.pivot.weight} kg
                      </p>
                    )}

                    <p>
                      Repos :{" "}
                      {exercise.pivot?.rest_seconds || 0} sec
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Programs;