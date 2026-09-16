import { useEffect, useState } from "react";
import api from "../../api/axios";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Historique des paiements
      </h1>

      {payments.length === 0 ? (
        <p>Aucun paiement.</p>
      ) : (
        payments.map((payment) => (
          <div key={payment.id} className="border p-4 mb-3">
            <p>Montant : {payment.amount} DH</p>
            <p>Méthode : {payment.payment_method}</p>
            <p>Statut : {payment.status}</p>
            <p>Date : {payment.paid_at}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Payments;