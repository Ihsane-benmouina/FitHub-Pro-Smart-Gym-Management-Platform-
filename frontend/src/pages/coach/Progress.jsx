import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

function Progress() {
  const [members, setMembers] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    member_id: "",
    weight: "",
    height: "",
    body_fat_percentage: "",
    muscle_mass: "",
    notes: "",
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async (memberId) => {
    if (!memberId) {
      setHistory([]);
      return;
    }

    try {
      const response = await api.get(
        `/members/${memberId}/progress`
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemberChange = (e) => {
    const memberId = e.target.value;

    setForm({
      ...form,
      member_id: memberId,
    });

    loadHistory(memberId);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/progress-records", form);

      setMessage("Progression enregistrée avec succès");

      await loadHistory(form.member_id);

      setForm({
        ...form,
        weight: "",
        height: "",
        body_fat_percentage: "",
        muscle_mass: "",
        notes: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement"
      );
    }
  };

  return (
  <div>
    <PageHeader
      title="Suivi de progression"
      description="Enregistrez et consultez l'évolution de vos adhérents"
    />

    {message && (
      <div className="mb-6 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm">
        {message}
      </div>
    )}

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card>
        <h2 className="font-bold text-slate-800">
          Nouvelle mesure
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Ajoutez les nouvelles données physiques
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Adhérent"
            name="member_id"
            value={form.member_id}
            onChange={handleMemberChange}
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Poids (kg)"
              type="number"
              step="0.1"
              name="weight"
              value={form.weight}
              onChange={handleChange}
            />

            <Input
              label="Taille (cm)"
              type="number"
              step="0.1"
              name="height"
              value={form.height}
              onChange={handleChange}
            />

            <Input
              label="Masse grasse (%)"
              type="number"
              step="0.1"
              name="body_fat_percentage"
              value={form.body_fat_percentage}
              onChange={handleChange}
            />

            <Input
              label="Masse musculaire"
              type="number"
              step="0.1"
              name="muscle_mass"
              value={form.muscle_mass}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">
              Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <Button type="submit" className="w-full">
            Enregistrer
          </Button>
        </form>
      </Card>

      <div className="xl:col-span-2">
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">
              Historique de progression
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Évolution physique de l'adhérent
            </p>
          </div>

          {history.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400">
              Sélectionnez un adhérent pour consulter son historique.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {history.map((record) => (
                <div key={record.id} className="p-6">
                  <div className="flex justify-between mb-5">
                    <p className="font-semibold text-slate-700">
                      Mesure
                    </p>

                    <span className="text-xs text-slate-400">
                      {record.recorded_at}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Metric
                      label="Poids"
                      value={
                        record.weight
                          ? `${record.weight} kg`
                          : "-"
                      }
                    />

                    <Metric
                      label="Taille"
                      value={
                        record.height
                          ? `${record.height} cm`
                          : "-"
                      }
                    />

                    <Metric
                      label="Masse grasse"
                      value={
                        record.body_fat_percentage
                          ? `${record.body_fat_percentage}%`
                          : "-"
                      }
                    />

                    <Metric
                      label="Masse musculaire"
                      value={
                        record.muscle_mass
                          ? `${record.muscle_mass} kg`
                          : "-"
                      }
                    />
                  </div>

                  {record.notes && (
                    <p className="text-sm text-slate-400 mt-4">
                      {record.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  </div>
);

function Metric({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="font-bold text-slate-700 mt-1">
        {value}
      </p>
    </div>
  );
}
}

export default Progress;