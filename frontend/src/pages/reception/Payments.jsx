import { useEffect, useState } from "react";
import api from "../../api/axios";

function Payments() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    subscription_id: "",
    amount: "",
    payment_method: "cash",
    reference: "",
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const response = await api.get("/subscriptions-list");
      setSubscriptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscriptionChange = (e) => {
    const subscriptionId = e.target.value;

    const subscription = subscriptions.find(
      (item) => String(item.id) === String(subscriptionId)
    );

    setForm({
      ...form,
      subscription_id: subscriptionId,
      amount: subscription?.plan?.price || "",
    });
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
      await api.post("/payments", form);

      setMessage("Paiement enregistré avec succès");

      setForm({
        subscription_id: "",
        amount: "",
        payment_method: "cash",
        reference: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement du paiement"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Enregistrer un paiement
      </h1>

      {message && (
        <p className="mb-4">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-1">
          Abonnement
        </label>

        <select
          value={form.subscription_id}
          onChange={handleSubscriptionChange}
          className="border p-2 block mb-4"
          required
        >
          <option value="">
            Choisir un abonnement
          </option>

          {subscriptions.map((subscription) => (
            <option
              key={subscription.id}
              value={subscription.id}
            >
              {subscription.member?.name} -{" "}
              {subscription.plan?.name}
            </option>
          ))}
        </select>

        <label className="block mb-1">
          Montant
        </label>

        <input
          type="number"
          step="0.01"
          min="0"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Montant"
          className="border p-2 block mb-4"
          required
        />

        <label className="block mb-1">
          Mode de paiement
        </label>

        <select
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
          className="border p-2 block mb-4"
          required
        >
          <option value="cash">
            Espèces
          </option>

          <option value="card">
            Carte
          </option>

          <option value="transfer">
            Virement
          </option>
        </select>

        <label className="block mb-1">
          Référence
        </label>

        <input
          type="text"
          name="reference"
          value={form.reference}
          onChange={handleChange}
          placeholder="Référence (optionnel)"
          className="border p-2 block mb-4"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Enregistrer le paiement
        </button>
      </form>
    </div>
  );
}

export default Payments;