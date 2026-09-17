import { useEffect, useState } from "react";
import api from "../../api/axios";

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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Plans d'abonnement
      </h1>

      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-8">

        <input
          name="name"
          placeholder="Nom du plan"
          value={form.name}
          onChange={handleChange}
          className="border p-2 block mb-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 block mb-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          className="border p-2 block mb-2"
          required
        />

        <input
          type="number"
          name="duration_days"
          placeholder="Durée en jours"
          value={form.duration_days}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <button className="bg-black text-white px-4 py-2">
          Créer
        </button>

      </form>

      <h2 className="text-xl font-bold mb-4">
        Plans existants
      </h2>

      {plans.length === 0 ? (
        <p>Aucun plan.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan.id} className="border p-4 mb-3">

            <strong>{plan.name}</strong>

            <p>{plan.description}</p>
            <p>{plan.price} DH</p>
            <p>{plan.duration_days} jours</p>

          </div>
        ))
      )}

    </div>
  );
}

export default SubscriptionPlans;