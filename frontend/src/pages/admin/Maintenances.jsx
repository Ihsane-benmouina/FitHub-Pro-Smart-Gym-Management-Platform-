import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

function Maintenances() {
  const [maintenances, setMaintenances] = useState([]);
  const [message, setMessage] = useState("");
  const [equipment, setEquipment] = useState([]);

  const [form, setForm] = useState({
    equipment_id: "",
    description: "",
    type: "preventive",
    scheduled_date: "",
    cost: "",
  });

 useEffect(() => {
  loadMaintenances();
  loadEquipment();
}, []);

  const loadMaintenances = async () => {
    try {
      const response = await api.get("/maintenances");
      setMaintenances(response.data);
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
      await api.post("/maintenances", form);

      setMessage("Maintenance créée avec succès");

      setForm({
        equipment_id: "",
        description: "",
        type: "preventive",
        scheduled_date: "",
        cost: "",
      });

      await loadMaintenances();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la création"
      );
    }
  };

  const completeMaintenance = async (id) => {
    try {
      await api.put(`/maintenances/${id}/complete`, {
        cost: 0,
      });

      setMessage("Maintenance terminée avec succès");
      await loadMaintenances();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la modification"
      );
    }
  };
  const loadEquipment = async () => {
  try {
    const response = await api.get("/equipment-list");
    setEquipment(response.data);
  } catch (error) {
    console.error(error);
  }
};

 return (
  <div>
    <PageHeader
      title="Maintenances"
      description="Suivez les interventions et l'état des équipements"
    />

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* FORM */}
      <Card>
        <div className="mb-6">
          <h2 className="font-bold text-slate-800">
            Nouvelle maintenance
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Signalez une intervention sur un équipement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Équipement"
            name="equipment_id"
            value={form.equipment_id}
            onChange={handleChange}
            required
          >
            <option value="">
              Choisir un équipement
            </option>

            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
                {item.serial_number
                  ? ` - ${item.serial_number}`
                  : ""}
              </option>
            ))}
          </Select>

          <Select
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">
              Choisir le type
            </option>

            <option value="preventive">
              Préventive
            </option>

            <option value="corrective">
              Corrective
            </option>
          </Select>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Décrivez le problème ou l'intervention..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              required
            />
          </div>

          <Input
            label="Date prévue"
            type="date"
            name="scheduled_date"
            value={form.scheduled_date}
            onChange={handleChange}
          />

          <Input
            label="Coût (DH)"
            type="number"
            step="0.01"
            min="0"
            name="cost"
            value={form.cost}
            onChange={handleChange}
            placeholder="0.00"
          />

          <Button type="submit" className="w-full">
            + Créer la maintenance
          </Button>
        </form>
      </Card>

      {/* LIST */}
      <div className="xl:col-span-2">
        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">
              Historique des maintenances
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {maintenances.length} intervention(s)
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {maintenances.map((maintenance) => (
              <div
                key={maintenance.id}
                className="p-6 hover:bg-slate-50/50 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                      ⚙
                    </div>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-slate-700">
                          {maintenance.equipment?.name ||
                            "Équipement"}
                        </h3>

                        <StatusBadge
                          status={maintenance.status}
                        />
                      </div>

                      <p className="text-sm text-slate-400 mt-2">
                        {maintenance.description}
                      </p>

                      <div className="flex flex-wrap gap-5 mt-3 text-xs text-slate-400">
                        <span>
                          Type : {maintenance.type}
                        </span>

                        {maintenance.scheduled_date && (
                          <span>
                            Prévue :{" "}
                            {maintenance.scheduled_date}
                          </span>
                        )}

                        {maintenance.cost && (
                          <span>
                            Coût : {maintenance.cost} DH
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {maintenance.status !== "completed" && (
                    <Button
                      onClick={() =>
                        completeMaintenance(
                          maintenance.id
                        )
                      }
                    >
                      Terminer
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {maintenances.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-400">
              Aucune maintenance enregistrée.
            </div>
          )}
        </Card>
      </div>
    </div>
  </div>
);
}

export default Maintenances;