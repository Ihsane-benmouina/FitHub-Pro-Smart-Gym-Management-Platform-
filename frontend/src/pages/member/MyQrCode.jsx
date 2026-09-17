import QRCode from "react-qr-code";

function MyQrCode() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Mon QR Code
      </h1>

      <p className="mb-4">
        Présentez ce QR Code à la réception.
      </p>

      <div className="bg-white p-4 inline-block">
        <QRCode value={String(user.id)} size={200} />
      </div>

      <p className="mt-4">
        Adhérent : {user.name}
      </p>
    </div>
  );
}

export default MyQrCode;