import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

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
  const selectedSubscription = subscriptions.find(
  (subscription) =>
    subscription.id === Number(form.subscription_id)
);

return (
  <div>
    <PageHeader
      title="Paiements"
      description="Enregistrez les paiements des abonnements"
    />

    {message && (
      <div className="mb-6 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm">
        {message}
      </div>
    )}

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card className="xl:col-span-2">
        <h2 className="font-bold text-slate-800">
          Nouveau paiement
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Sélectionnez l'abonnement concerné
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Select
            label="Abonnement"
            name="subscription_id"
            value={form.subscription_id}
            onChange={handleSubscriptionChange}
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
                {subscription.member?.name} —{" "}
                {subscription.plan?.name}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Montant (DH)"
              type="number"
              step="0.01"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
            />

            <Select
              label="Mode de paiement"
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              required
            >
              <option value="">
                Choisir le mode
              </option>

              <option value="cash">
                Espèces
              </option>

              <option value="card">
                Carte
              </option>

              <option value="transfer">
                Virement
              </option>
            </Select>
          </div>

          <Input
            label="Référence"
            name="reference"
            value={form.reference}
            onChange={handleChange}
            placeholder="Optionnel"
          />

          <Button type="submit">
            Enregistrer le paiement
          </Button>
        </form>
      </Card>

      <Card>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl mb-5">
          $
        </div>

        <h2 className="font-bold text-slate-800">
          Encaissement
        </h2>

        <p className="text-sm text-slate-400 mt-2">
          Le paiement sera associé à l'abonnement sélectionné.
        </p>

        <div className="mt-6 space-y-4">
          <PaymentInfo
            label="Adhérent"
            value={
              selectedSubscription?.member?.name || "-"
            }
          />

          <PaymentInfo
            label="Formule"
            value={
              selectedSubscription?.plan?.name || "-"
            }
          />

          <PaymentInfo
            label="Montant"
            value={
              form.amount
                ? `${form.amount} DH`
                : "-"
            }
          />
        </div>
      </Card>
    </div>
  </div>
);

function PaymentInfo({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-100">
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}
}

export default Payments;