import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../api/axios";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Gestion des présences
      </h1>

      {message && (
        <p className="mb-4">
          {message}
        </p>
      )}

      <div
        id="qr-reader"
        className="max-w-md mb-6"
      ></div>

      <p className="mb-2">
        ID Adhérent
      </p>

      <input
        type="number"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        className="border p-2 block mb-4"
        placeholder="ID Adhérent"
      />

      <button
        onClick={checkIn}
        className="bg-black text-white px-4 py-2 mr-3"
      >
        Enregistrer l'entrée
      </button>

      <button
        onClick={checkOut}
        className="border px-4 py-2"
      >
        Enregistrer la sortie
      </button>
    </div>
  );
}

export default Attendance;