import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Attendance() {
  const [memberId, setMemberId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setMemberId(decodedText);
        setMessage("QR Code détecté");
        scanner.clear();
      },
      () => {
        // On ignore les erreurs pendant le scan
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  const checkIn = async () => {
    if (!memberId) {
      setMessage("Scannez un QR Code ou entrez un ID");
      return;
    }

    try {
      const response = await api.post("/attendance/check-in", {
        member_id: memberId,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'entrée"
      );
    }
  };

  const checkOut = async () => {
    if (!memberId) {
      setMessage("Scannez un QR Code ou entrez un ID");
      return;
    }

    try {
      const response = await api.post("/attendance/check-out", {
        member_id: memberId,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la sortie"
      );
    }
  };

 return (
  <div>
    <PageHeader
      title="Gestion des présences"
      description="Scannez le QR Code d'un adhérent pour enregistrer sa présence"
    />

    {message && (
      <div className="mb-6 px-4 py-3 bg-pink-50 text-pink-600 rounded-xl text-sm">
        {message}
      </div>
    )}

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* QR SCANNER */}
      <Card>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center text-2xl mb-4">
            ▣
          </div>

          <h2 className="font-bold text-slate-800">
            Scanner un QR Code
          </h2>

          <p className="text-sm text-slate-400 mt-2 mb-6">
            Placez le QR Code de l'adhérent devant la caméra
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div
            id="qr-reader"
            className="overflow-hidden rounded-2xl border border-slate-100"
          />
        </div>
      </Card>

      {/* MANUAL */}
      <Card>
        <h2 className="font-bold text-slate-800">
          Enregistrement manuel
        </h2>

        <p className="text-xs text-slate-400 mt-1 mb-6">
          Utilisez cette option si le QR Code ne peut pas être scanné
        </p>

        <div className="space-y-4">
          <Input
            label="Identifiant de l'adhérent"
            type="number"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Ex : 12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              className="w-full"
              onClick={checkIn}
            >
              Enregistrer l'entrée
            </Button>

            <Button
              variant="secondary"
              className="w-full"
              onClick={checkOut}
            >
              Enregistrer la sortie
            </Button>
          </div>
        </div>

        <div className="mt-8 p-5 bg-slate-50 rounded-2xl">
          <p className="text-xs font-semibold text-slate-500 uppercase">
            Comment ça marche ?
          </p>

          <div className="space-y-4 mt-4">
            <Step number="1" text="L'adhérent présente son QR Code." />
            <Step number="2" text="La réception scanne le code." />
            <Step number="3" text="FitHub Pro vérifie son abonnement." />
            <Step number="4" text="La présence est enregistrée." />
          </div>
        </div>
      </Card>
    </div>
  </div>
);

function Step({ number, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 shrink-0 rounded-full bg-white border border-pink-100 text-pink-500 flex items-center justify-center text-xs font-bold">
        {number}
      </div>

      <p className="text-sm text-slate-500">
        {text}
      </p>
    </div>
  );
}
}

export default Attendance;