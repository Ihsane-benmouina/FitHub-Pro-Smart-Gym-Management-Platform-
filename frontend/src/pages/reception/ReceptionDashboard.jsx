import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";

function ReceptionDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);

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

  const activeSubscriptions = subscriptions.filter(
    (item) => item.status === "active"
  ).length;

  const pendingSubscriptions = subscriptions.filter(
    (item) => item.status === "pending"
  ).length;

  return (
    <div>
      <PageHeader
        title="Espace Réception"
        description="Gérez les présences et les paiements des adhérents"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        <StatCard
          title="Abonnements"
          value={subscriptions.length}
          icon="◇"
          gradient="pink"
        />

        <StatCard
          title="Actifs"
          value={activeSubscriptions}
          icon="✓"
          gradient="purple"
        />

        <StatCard
          title="En attente"
          value={pendingSubscriptions}
          icon="◷"
          gradient="orange"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl mb-5">
            ▣
          </div>

          <h2 className="font-bold text-slate-800">
            Gestion des présences
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Scannez le QR Code d'un adhérent pour enregistrer son entrée ou sa sortie.
          </p>
        </Card>

        <Card>
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center text-xl mb-5">
            $
          </div>

          <h2 className="font-bold text-slate-800">
            Gestion des paiements
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Enregistrez les paiements liés aux abonnements des adhérents.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default ReceptionDashboard;