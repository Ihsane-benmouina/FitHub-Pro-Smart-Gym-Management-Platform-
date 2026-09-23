import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

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
  <div>
    <PageHeader
      title="Mon abonnement"
      description="Consultez votre formule et découvrez les abonnements FitHub Pro"
    />

    {message && (
      <div className="mb-6 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm">
        {message}
      </div>
    )}

    {subscription && (
      <Card className="mb-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="text-xs uppercase text-pink-500 font-semibold">
              Abonnement actuel
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-2">
              {subscription.plan?.name}
            </h2>

            <div className="mt-3">
              <StatusBadge status={subscription.status} />
            </div>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="text-xs text-slate-400">Début</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                {subscription.start_date}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Expiration</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                {subscription.end_date}
              </p>
            </div>
          </div>
        </div>
      </Card>
    )}

    <div className="mb-5">
      <h2 className="text-lg font-bold text-slate-800">
        Nos formules
      </h2>

      <p className="text-sm text-slate-400 mt-1">
        Choisissez la formule adaptée à vos objectifs
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div
          key={plan.id}
          className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
        >
          <div
            className={`h-2 ${
              index % 3 === 0
                ? "bg-gradient-to-r from-pink-500 to-rose-400"
                : index % 3 === 1
                ? "bg-gradient-to-r from-violet-500 to-purple-400"
                : "bg-gradient-to-r from-cyan-500 to-blue-500"
            }`}
          />

          <div className="p-6">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Formule FitHub
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-2">
              {plan.name}
            </h3>

            <p className="text-sm text-slate-400 mt-3 min-h-10">
              {plan.description || "Abonnement FitHub Pro"}
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-slate-800">
                {plan.price}
              </span>

              <span className="text-sm text-slate-400 ml-1">
                DH
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Valable {plan.duration_days} jours
            </p>

            <Button
              className="w-full mt-6"
              onClick={() => subscribe(plan.id)}
            >
              Choisir cette formule
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Subscriptions;