import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";

function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await api.get("/my-programs");
      setPrograms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 return (
  <div>
    <PageHeader
      title="Mes programmes"
      description="Consultez les programmes préparés par votre coach"
    />

    {programs.length === 0 ? (
      <Card>
        <div className="py-10 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center text-xl">
            ◆
          </div>

          <h2 className="font-bold text-slate-700 mt-4">
            Aucun programme
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Votre coach ne vous a pas encore assigné de programme.
          </p>
        </div>
      </Card>
    ) : (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-pink-500 font-semibold uppercase">
                  Programme personnel
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-2">
                  {program.title}
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Coach : {program.coach?.name || "-"}
                </p>
              </div>

              <StatusBadge status={program.status} />
            </div>

            {program.goal && (
              <div className="mt-5 p-4 bg-gradient-to-r from-pink-50 to-violet-50 rounded-xl">
                <p className="text-xs text-violet-400">
                  Mon objectif
                </p>

                <p className="font-semibold text-violet-700 mt-1">
                  {program.goal}
                </p>
              </div>
            )}

            {program.description && (
              <p className="text-sm text-slate-400 mt-4">
                {program.description}
              </p>
            )}

            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-4">
                Exercices
              </p>

              {!program.exercises ||
              program.exercises.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Aucun exercice disponible.
                </p>
              ) : (
                <div className="space-y-3">
                  {program.exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className="flex gap-4 bg-slate-50 rounded-xl p-4"
                    >
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-white text-pink-500 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-700">
                            {exercise.name}
                          </p>

                          <span className="text-xs text-slate-400">
                            {exercise.muscle_group}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-3">
                          {exercise.pivot?.sets && (
                            <ExerciseValue
                              label="Séries"
                              value={exercise.pivot.sets}
                            />
                          )}

                          {exercise.pivot?.reps && (
                            <ExerciseValue
                              label="Rép."
                              value={exercise.pivot.reps}
                            />
                          )}

                          {exercise.pivot?.weight && (
                            <ExerciseValue
                              label="Poids"
                              value={`${exercise.pivot.weight} kg`}
                            />
                          )}

                          {exercise.pivot?.rest_seconds && (
                            <ExerciseValue
                              label="Repos"
                              value={`${exercise.pivot.rest_seconds}s`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    )}
  </div>
);

function ExerciseValue({ label, value }) {
  return (
    <div className="bg-white rounded-lg px-3 py-2">
      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p className="text-xs font-bold text-slate-700 mt-0.5">
        {value}
      </p>
    </div>
  );
}
}

export default Programs;