import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    email: searchParams.get("email") || "",
    token: searchParams.get("token") || "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await api.post(
        "/auth/reset-password",
        form
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Impossible de réinitialiser le mot de passe"
      );
    }
  };

  return (
  <AuthLayout
    title="Nouveau mot de passe"
    subtitle="Choisissez un nouveau mot de passe sécurisé."
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
        label="Email"
        type="email"
        name="email"
        value={form.email}
        readOnly
      />

      <Input
        label="Nouveau mot de passe"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
        required
      />

      <Input
        label="Confirmer le mot de passe"
        type="password"
        name="password_confirmation"
        value={form.password_confirmation}
        onChange={handleChange}
        placeholder="••••••••"
        required
      />

      <Button
        type="submit"
        className="w-full py-3"
      >
        Modifier le mot de passe
      </Button>
    </form>

    <div className="text-center mt-7">
      <Link
        to="/login"
        className="text-sm text-slate-500 hover:text-pink-500"
      >
        ← Retour à la connexion
      </Link>
    </div>
  </AuthLayout>
);
}

export default ResetPassword;