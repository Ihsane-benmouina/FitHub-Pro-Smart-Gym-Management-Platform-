import { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
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
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue"
      );
    }
  };

  return (
  <AuthLayout
    title="Mot de passe oublié ?"
    subtitle="Entrez votre email pour réinitialiser votre mot de passe."
  >
    {message && (
      <div className="mb-5 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-sm">
        {message}
      </div>
    )}

    {error && (
      <div className="mb-5 px-4 py-3 bg-rose-50 text-rose-500 rounded-xl text-sm">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Adresse email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="nom@email.com"
        required
      />

      <Button
        type="submit"
        className="w-full py-3"
      >
        Envoyer la demande
      </Button>
    </form>

    {/* Garder ceci seulement si ton backend retourne
        le token en développement */}
    {token && (
      <div className="mt-5 p-4 bg-amber-50 rounded-xl">
        <p className="text-xs text-amber-600">
          Token de développement
        </p>

        <p className="text-xs text-slate-500 break-all mt-2">
          {token}
        </p>

        <Link
          to={`/reset-password?token=${token}&email=${email}`}
          className="inline-block mt-3 text-sm font-semibold text-pink-500"
        >
          Réinitialiser le mot de passe →
        </Link>
      </div>
    )}

    <div className="text-center mt-7">
      <Link
        to="/login"
        className="text-sm font-medium text-slate-500 hover:text-pink-500"
      >
        ← Retour à la connexion
      </Link>
    </div>
  </AuthLayout>
);
}

export default ForgotPassword;