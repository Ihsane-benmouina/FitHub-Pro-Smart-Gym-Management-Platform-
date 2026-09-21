import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setToken("");

    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(response.data.message);

      // Pour le développement seulement.
      // Plus tard le token doit normalement être envoyé par email.
      if (response.data.token) {
        setToken(response.data.token);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Une erreur est survenue"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Mot de passe oublié
      </h1>

      <p className="mb-4">
        Entrez votre adresse email pour réinitialiser votre mot de passe.
      </p>

      {message && (
        <p className="mb-4">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 block mb-3"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Envoyer
        </button>
      </form>

      {token && (
        <div className="mt-6">
          <p className="mb-2">
            Token de réinitialisation :
          </p>

          <p className="border p-2 mb-3 break-all">
            {token}
          </p>

          <Link
            to={`/reset-password?token=${encodeURIComponent(
              token
            )}&email=${encodeURIComponent(email)}`}
            className="underline"
          >
            Réinitialiser mon mot de passe
          </Link>
        </div>
      )}

      <div className="mt-6">
        <Link to="/login" className="underline">
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;