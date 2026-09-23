import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/register", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/member");
    } catch (error) {
      setError(
        error.response?.data?.message || "Erreur lors de l'inscription"
      );
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez FitHub Pro et commencez votre parcours sportif."
    >
      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-rose-50 text-rose-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nom complet"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Votre nom"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="nom@email.com"
          required
        />

        <Input
          label="Téléphone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Votre téléphone"
        />

        <Input
          label="Mot de passe"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <Input
          label="Confirmation"
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
          Créer mon compte
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-7">
        Vous avez déjà un compte ?{" "}
        <Link
          to="/login"
          className="font-semibold text-pink-500"
        >
          Se connecter
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;