import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

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

  const handleExerciseChange = (e) => {
    const value =
      e.target.type === "number" && e.target.value !== ""
        ? Number(e.target.value)
        : e.target.value;

    setExerciseForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
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

      await loadPrograms();
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

      await loadPrograms();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'ajout de l'exercice"
      );
    }
  };

 return (
  <div>
    <PageHeader
      title="Programmes d'entraînement"
      description="Créez des programmes personnalisés pour vos adhérents"
    />

    {message && (
      <div className="mb-6 px-4 py-3 rounded-xl bg-pink-50 text-pink-600 text-sm">
        {message}
      </div>
    )}

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-7">
      {/* CREATE PROGRAM */}
      <Card>
        <h2 className="font-bold text-slate-800">
          Nouveau programme
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Assignez un programme personnalisé à un adhérent
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Adhérent"
            name="member_id"
            value={form.member_id}
            onChange={handleChange}
            required
          >
            <option value="">
              Choisir un adhérent
            </option>

            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </Select>

          <Input
            label="Titre du programme"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex : Programme prise de masse"
            required
          />

          <Input
            label="Objectif"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            placeholder="Ex : Prise de masse"
          />

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <Button type="submit" className="w-full">
            + Créer le programme
          </Button>
        </form>
      </Card>

      {/* ADD EXERCISE */}
      <Card>
        <h2 className="font-bold text-slate-800">
          Ajouter un exercice
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Complétez un programme avec des exercices
        </p>

        <form onSubmit={addExercise} className="space-y-4">
          <Select
            label="Programme"
            name="program_id"
            value={exerciseForm.program_id}
            onChange={handleExerciseChange}
            required
          >
            <option value="">
              Choisir un programme
            </option>

            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.title}
              </option>
            ))}
          </Select>

          <Select
            label="Exercice"
            name="exercise_id"
            value={exerciseForm.exercise_id}
            onChange={handleExerciseChange}
            required
          >
            <option value="">
              Choisir un exercice
            </option>

            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Séries"
              type="number"
              name="sets"
              value={exerciseForm.sets}
              onChange={handleExerciseChange}
            />

            <Input
              label="Répétitions"
              type="number"
              name="reps"
              value={exerciseForm.reps}
              onChange={handleExerciseChange}
            />

            <Input
              label="Poids (kg)"
              type="number"
              step="0.1"
              name="weight"
              value={exerciseForm.weight}
              onChange={handleExerciseChange}
            />

            <Input
              label="Repos (sec)"
              type="number"
              name="rest_seconds"
              value={exerciseForm.rest_seconds}
              onChange={handleExerciseChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Ajouter au programme
          </Button>
        </form>
      </Card>
    </div>

    {/* PROGRAM LIST */}
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-5">
        Mes programmes
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-pink-500 font-medium">
                  PROGRAMME
                </p>

                <h3 className="text-lg font-bold text-slate-800 mt-1">
                  {program.title}
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  {program.member?.name || "Adhérent"}
                </p>
              </div>

              <StatusBadge status={program.status} />
            </div>

            {program.goal && (
              <div className="mt-5 bg-violet-50 rounded-xl p-4">
                <p className="text-xs text-violet-400">
                  Objectif
                </p>

                <p className="text-sm font-semibold text-violet-700 mt-1">
                  {program.goal}
                </p>
              </div>
            )}

            {program.description && (
              <p className="text-sm text-slate-400 mt-4">
                {program.description}
              </p>
            )}

            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">
                Exercices
              </p>

              {!program.exercises ||
              program.exercises.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Aucun exercice ajouté.
                </p>
              ) : (
                <div className="space-y-3">
                  {program.exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="bg-slate-50 rounded-xl p-4"
                    >
                      <div className="flex justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-700">
                          {exercise.name}
                        </p>

                        <span className="text-xs text-slate-400">
                          {exercise.muscle_group}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                        {exercise.pivot?.sets && (
                          <span>
                            {exercise.pivot.sets} séries
                          </span>
                        )}

                        {exercise.pivot?.reps && (
                          <span>
                            {exercise.pivot.reps} reps
                          </span>
                        )}

                        {exercise.pivot?.weight && (
                          <span>
                            {exercise.pivot.weight} kg
                          </span>
                        )}

                        {exercise.pivot?.rest_seconds && (
                          <span>
                            Repos {exercise.pivot.rest_seconds}s
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);
}

export default Programs;