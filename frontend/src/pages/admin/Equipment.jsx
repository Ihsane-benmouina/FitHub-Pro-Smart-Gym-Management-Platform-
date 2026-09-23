import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    serial_number: "",
    category: "",
    purchase_date: "",
    status: "available",
    location: "",
    notes: "",
  });

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const response = await api.get("/equipment");
      setEquipment(response.data);
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
      await api.post("/equipment", form);

      setMessage("Équipement ajouté avec succès");

      setForm({
        name: "",
        serial_number: "",
        category: "",
        purchase_date: "",
        status: "available",
        location: "",
        notes: "",
      });

      await loadEquipment();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'ajout"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/equipment/${id}`);

      setMessage("Équipement supprimé avec succès");
      await loadEquipment();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  return (
  <div>
    <PageHeader
      title="Équipements"
      description="Gérez le matériel et les équipements de votre salle"
    />

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* FORMULAIRE */}
      <Card>
        <div className="mb-6">
          <h2 className="font-bold text-slate-800">
            Nouvel équipement
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Ajoutez un équipement à FitHub Pro
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex : Tapis de course"
            required
          />

          <Input
            label="Numéro de série"
            name="serial_number"
            value={form.serial_number}
            onChange={handleChange}
            placeholder="Ex : FIT-001"
          />

          <Input
            label="Catégorie"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Ex : Cardio"
          />

          <Input
            label="Localisation"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Ex : Salle cardio"
          />

          <Input
            label="Date d'achat"
            type="date"
            name="purchase_date"
            value={form.purchase_date}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full">
            + Ajouter l'équipement
          </Button>
        </form>
      </Card>

      {/* LISTE */}
      <div className="xl:col-span-2">
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">
              Liste des équipements
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {equipment.length} équipement(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-400 uppercase">
                  <th className="px-6 py-4 font-medium">
                    Équipement
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Catégorie
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Localisation
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Statut
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {equipment.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center">
                          ◆
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {item.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {item.serial_number || "Sans numéro"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {item.category || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {item.location || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {equipment.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-400">
              Aucun équipement enregistré.
            </div>
          )}
        </Card>
      </div>
    </div>
  </div>
);
}

export default Equipment;