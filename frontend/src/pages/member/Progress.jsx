import { useEffect, useState } from "react";
import api from "../../api/axios";

function Progress() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const response = await api.get("/my-progress");
      setProgress(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Ma progression
      </h1>

      {progress.length === 0 ? (
        <p>Aucune progression enregistrée.</p>
      ) : (
        progress.map((item) => (
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

            {item.coach && (
              <p>Coach : {item.coach.name}</p>
            )}

            {item.notes && <p>Notes : {item.notes}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default Progress;