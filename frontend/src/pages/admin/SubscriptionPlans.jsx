import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration_days: "",
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await api.get("/subscription-plans");
      setPlans(response.data);
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
      await api.post("/subscription-plans", form);

      setMessage("Plan créé avec succès");

      setForm({
        name: "",
        description: "",
        price: "",
        duration_days: "",
      });

      loadPlans();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la création"
      );
    }
  };
return (
  <div>
    <PageHeader
      title="Abonnements"
      description="Créez et gérez les formules d'abonnement FitHub Pro"
    />

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* FORMULAIRE */}
      <Card>
        <h2 className="font-bold text-slate-800">
          Nouveau plan
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Créez une nouvelle formule
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex : Premium"
            required
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
              placeholder="Description..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <Input
            label="Prix (DH)"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <Input
            label="Durée (jours)"
            type="number"
            name="duration_days"
            value={form.duration_days}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            className="w-full"
          >
            + Créer le plan
          </Button>
        </form>
      </Card>

      {/* PLANS */}
      <div className="xl:col-span-2">
        {message && (
          <div className="mb-5 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className="relative overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-sm p-6"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 ${
                  index % 3 === 0
                    ? "bg-pink-500"
                    : index % 3 === 1
                    ? "bg-violet-500"
                    : "bg-blue-500"
                }`}
              />

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Formule
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-2">
                {plan.name}
              </h3>

              <p className="text-sm text-slate-400 mt-3 min-h-10">
                {plan.description ||
                  "Abonnement FitHub Pro"}
              </p>

              <div className="mt-6">
                <span className="text-3xl font-bold text-slate-800">
                  {plan.price}
                </span>

                <span className="text-sm text-slate-400 ml-1">
                  DH
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between">
                <span className="text-xs text-slate-400">
                  Durée
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  {plan.duration_days} jours
                </span>
              </div>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <Card>
            <p className="text-center text-sm text-slate-400">
              Aucun plan d'abonnement.
            </p>
          </Card>
        )}
      </div>
    </div>
  </div>
);
}

export default SubscriptionPlans;