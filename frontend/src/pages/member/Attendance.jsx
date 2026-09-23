import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

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
  <div>
    <PageHeader
      title="Mes présences"
      description="Consultez votre historique d'accès à la salle"
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
      <AttendanceStat
        title="Total des visites"
        value={attendances.length}
        icon="✓"
        color="pink"
      />

      <AttendanceStat
        title="Entrées"
        value={
          attendances.filter(
            (attendance) => attendance.check_in_at
          ).length
        }
        icon="→"
        color="purple"
      />

      <AttendanceStat
        title="Sorties enregistrées"
        value={
          attendances.filter(
            (attendance) => attendance.check_out_at
          ).length
        }
        icon="←"
        color="blue"
      />
    </div>

    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="font-bold text-slate-800">
          Historique des visites
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Vos dernières présences à FitHub Pro
        </p>
      </div>

      {attendances.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-400">
          Aucune présence enregistrée.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {attendances.map((attendance) => (
            <div
              key={attendance.id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Visite FitHub
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Méthode : {attendance.method || "QR Code"}
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <TimeInfo
                  label="Entrée"
                  value={attendance.check_in_at}
                />

                <TimeInfo
                  label="Sortie"
                  value={attendance.check_out_at || "En cours"}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  </div>
);

function AttendanceStat({ title, value, icon, color }) {
  const colors = {
    pink: "bg-pink-50 text-pink-500",
    purple: "bg-violet-50 text-violet-500",
    blue: "bg-blue-50 text-blue-500",
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        {title}
      </p>

      <p className="text-2xl font-bold text-slate-800 mt-1">
        {value}
      </p>
    </div>
  );
}

function TimeInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-700 mt-1">
        {value}
      </p>
    </div>
  );
}
}

export default Attendance;