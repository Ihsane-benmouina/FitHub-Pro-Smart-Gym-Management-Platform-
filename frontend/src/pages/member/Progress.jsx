import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

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
  <div>
    <PageHeader
      title="Ma progression"
      description="Suivez l'évolution de vos performances et mesures physiques"
    />

    {progress.length === 0 ? (
      <Card>
        <div className="py-10 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl">
            ↗
          </div>

          <h2 className="font-bold text-slate-700 mt-4">
            Aucune mesure
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Votre coach n'a pas encore enregistré votre progression.
          </p>
        </div>
      </Card>
    ) : (
      <>
        {/* DERNIÈRE MESURE */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
          <MetricCard
            title="Poids"
            value={
              progress[0]?.weight
                ? `${progress[0].weight} kg`
                : "-"
            }
            color="pink"
          />

          <MetricCard
            title="Taille"
            value={
              progress[0]?.height
                ? `${progress[0].height} cm`
                : "-"
            }
            color="purple"
          />

          <MetricCard
            title="Masse grasse"
            value={
              progress[0]?.body_fat_percentage
                ? `${progress[0].body_fat_percentage}%`
                : "-"
            }
            color="blue"
          />

          <MetricCard
            title="Masse musculaire"
            value={
              progress[0]?.muscle_mass
                ? `${progress[0].muscle_mass} kg`
                : "-"
            }
            color="orange"
          />
        </div>

        {/* HISTORIQUE */}
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">
              Historique
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {progress.length} mesure(s) enregistrée(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase text-slate-400">
                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Poids
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Taille
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Masse grasse
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Masse musculaire
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {progress.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {record.recorded_at}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                      {record.weight
                        ? `${record.weight} kg`
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {record.height
                        ? `${record.height} cm`
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {record.body_fat_percentage
                        ? `${record.body_fat_percentage}%`
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {record.muscle_mass
                        ? `${record.muscle_mass} kg`
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </>
    )}
  </div>
);

function MetricCard({ title, value, color }) {
  const colors = {
    pink: "bg-pink-50 text-pink-500",
    purple: "bg-violet-50 text-violet-500",
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
  };

  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors[color]}`}
      >
        ↗
      </div>

      <p className="text-xs text-slate-400 mt-4">
        {title}
      </p>

      <p className="text-xl font-bold text-slate-800 mt-1">
        {value}
      </p>
    </div>
  );
}
}

export default Progress;