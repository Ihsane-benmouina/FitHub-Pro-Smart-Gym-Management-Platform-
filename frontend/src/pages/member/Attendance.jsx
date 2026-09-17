import { useEffect, useState } from "react";
import api from "../../api/axios";

function Attendance() {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    loadAttendances();
  }, []);

  const loadAttendances = async () => {
    try {
      const response = await api.get("/my-attendances");
      setAttendances(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Historique des présences
      </h1>

      {attendances.length === 0 ? (
        <p>Aucune présence enregistrée.</p>
      ) : (
        attendances.map((attendance) => (
          <div
            key={attendance.id}
            className="border p-4 mb-3"
          >
            <p>Entrée : {attendance.check_in_at}</p>

            <p>
              Sortie :{" "}
              {attendance.check_out_at || "Pas encore sortie"}
            </p>

            <p>Méthode : {attendance.method}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Attendance;