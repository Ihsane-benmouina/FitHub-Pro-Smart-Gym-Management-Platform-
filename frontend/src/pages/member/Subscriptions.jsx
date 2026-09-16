import { useEffect, useState } from "react";
import api from "../../api/axios";

function Subscriptions() {
  const [plans, setPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPlans();
    loadSubscription();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await api.get("/subscription-plans");
      setPlans(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSubscription = async () => {
    try {
      const response = await api.get("/my-subscription");
      setSubscription(response.data.subscription);
    } catch (error) {
      console.error(error);
    }
  };

  const subscribe = async (planId) => {
    try {
      await api.post("/subscriptions", {
        subscription_plan_id: planId,
      });

      setMessage("Abonnement créé avec succès");
      loadSubscription();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Erreur lors de l'abonnement"
      );
    }
  };

  const renew = async () => {
    try {
      await api.put(`/subscriptions/${subscription.id}/renew`);

      setMessage("Abonnement renouvelé avec succès");
      loadSubscription();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Erreur lors du renouvellement"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Abonnements
      </h1>

      {message && <p className="mb-4">{message}</p>}

      {subscription && (
        <div className="border p-4 mb-8">
          <h2 className="font-bold mb-2">Mon abonnement</h2>

          <p>Plan : {subscription.plan?.name}</p>
          <p>Début : {subscription.start_date}</p>
          <p>Fin : {subscription.end_date}</p>
          <p>Statut : {subscription.status}</p>

          <button
            onClick={renew}
            className="bg-black text-white px-4 py-2 mt-3"
          >
            Renouveler
          </button>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">
        Plans disponibles
      </h2>

      {plans.map((plan) => (
        <div key={plan.id} className="border p-4 mb-3">
          <h3 className="font-bold">{plan.name}</h3>

          <p>{plan.description}</p>
          <p>Prix : {plan.price} DH</p>
          <p>Durée : {plan.duration_days} jours</p>

          <button
            onClick={() => subscribe(plan.id)}
            className="bg-black text-white px-4 py-2 mt-2"
          >
            S'abonner
          </button>
        </div>
      ))}
    </div>
  );
}

export default Subscriptions;