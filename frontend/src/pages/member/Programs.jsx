import { useEffect, useState } from "react";
import api from "../../api/axios";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Mes programmes
      </h1>

      {programs.length === 0 ? (
        <p>Aucun programme.</p>
      ) : (
        programs.map((program) => (
          <div key={program.id} className="border p-4 mb-4">
            <h2 className="font-bold">{program.title}</h2>

            <p>Coach : {program.coach?.name}</p>
            <p>Objectif : {program.goal}</p>
            <p>{program.description}</p>

            <h3 className="font-bold mt-4">Exercices</h3>

            {program.exercises?.length === 0 ? (
              <p>Aucun exercice.</p>
            ) : (
              program.exercises?.map((exercise) => (
                <div key={exercise.id} className="ml-4 mt-2">
                  <strong>{exercise.name}</strong>
                  <p>
                    {exercise.pivot?.sets} séries ×{" "}
                    {exercise.pivot?.reps} répétitions
                  </p>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Programs;