import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      await loadExercises();
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div>
    <PageHeader
      title="Exercices"
      description="Créez et gérez votre bibliothèque d'exercices"
    />

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card>
        <h2 className="font-bold text-slate-800">
          Nouvel exercice
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Ajoutez un exercice à votre bibliothèque
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex : Développé couché"
            required
          />

          <Input
            label="Groupe musculaire"
            name="muscle_group"
            value={form.muscle_group}
            onChange={handleChange}
            placeholder="Ex : Pectoraux"
          />

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Description de l'exercice..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <Input
            label="Lien vidéo"
            name="video_url"
            value={form.video_url}
            onChange={handleChange}
            placeholder="https://..."
          />

          <Button type="submit" className="w-full">
            + Ajouter l'exercice
          </Button>
        </form>
      </Card>

      <div className="xl:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exercises.map((exercise, index) => (
            <Card key={exercise.id}>
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    index % 3 === 0
                      ? "bg-pink-50 text-pink-500"
                      : index % 3 === 1
                      ? "bg-violet-50 text-violet-500"
                      : "bg-blue-50 text-blue-500"
                  }`}
                >
                  ◆
                </div>

                {exercise.muscle_group && (
                  <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1 rounded-full">
                    {exercise.muscle_group}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-800 mt-5">
                {exercise.name}
              </h3>

              <p className="text-sm text-slate-400 mt-2">
                {exercise.description || "Aucune description"}
              </p>

              {exercise.video_url && (
                <a
                  href={exercise.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-sm font-medium text-pink-500"
                >
                  Voir la vidéo →
                </a>
              )}
            </Card>
          ))}
        </div>

        {exercises.length === 0 && (
          <Card>
            <p className="text-center text-sm text-slate-400">
              Aucun exercice disponible.
            </p>
          </Card>
        )}
      </div>
    </div>
  </div>
);
}

export default Exercises;