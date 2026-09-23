import QRCode from "react-qr-code";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

function MyQrCode() {
  const user = JSON.parse(localStorage.getItem("user"));

 return (
  <div>
    <PageHeader
      title="Mon QR Code"
      description="Présentez ce QR Code à la réception pour accéder à la salle"
    />

    <div className="max-w-xl mx-auto">
      <Card>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center text-xl mb-4">
            ▣
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Mon accès FitHub
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Scannez ce code à l'entrée de la salle
          </p>

          <div className="inline-block bg-white border border-slate-100 shadow-sm rounded-2xl p-6 mt-7">
            <QRCode
              value={String(user.id)}
              size={220}
            />
          </div>

          <div className="mt-7 bg-gradient-to-r from-pink-50 to-violet-50 rounded-2xl p-5">
            <p className="text-xs text-slate-400">
              Adhérent
            </p>

            <p className="font-bold text-slate-800 mt-1">
              {user.name}
            </p>
          </div>

          <p className="text-xs text-slate-400 mt-5">
            Ce QR Code est personnel. Ne le partagez pas.
          </p>
        </div>
      </Card>
    </div>
  </div>
);
}

export default MyQrCode;