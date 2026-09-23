import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const response = await api.get("/my-payments");
      setPayments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div>
    <PageHeader
      title="Mes paiements"
      description="Consultez l'historique de vos paiements et abonnements"
    />

    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="font-bold text-slate-800">
          Historique des paiements
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          {payments.length} paiement(s)
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="py-12 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl">
            $
          </div>

          <p className="text-sm text-slate-400 mt-4">
            Aucun paiement enregistré.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-400 uppercase">
                <th className="px-6 py-4 font-medium">
                  Abonnement
                </th>

                <th className="px-6 py-4 font-medium">
                  Montant
                </th>

                <th className="px-6 py-4 font-medium">
                  Méthode
                </th>

                <th className="px-6 py-4 font-medium">
                  Date
                </th>

                <th className="px-6 py-4 font-medium">
                  Statut
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-slate-50/60"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-700">
                      {payment.subscription?.plan?.name ||
                        "Abonnement"}
                    </p>

                    {payment.reference && (
                      <p className="text-xs text-slate-400 mt-1">
                        Réf : {payment.reference}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-800">
                      {payment.amount} DH
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500 capitalize">
                    {payment.payment_method ||
                      payment.method ||
                      "-"}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {payment.paid_at || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={payment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  </div>
);
}

export default Payments;