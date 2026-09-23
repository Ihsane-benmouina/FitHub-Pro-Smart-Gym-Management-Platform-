import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        login: "",
        password: "",
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
            const response = await api.post("/auth/login", form);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const role = response.data.user.role;

            if (role === "admin") {
                navigate("/admin");
            } else if (role === "coach") {
                navigate("/coach");
            } else if (role === "receptionniste") {
                navigate("/reception");
            } else {
                navigate("/member");
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "Erreur de connexion"
            );
        }
    };

   return (
  <AuthLayout
    title="Bienvenue 👋"
    subtitle="Connectez-vous pour accéder à votre espace FitHub Pro."
  >
    {error && (
      <div className="mb-5 px-4 py-3 rounded-xl bg-rose-50 text-rose-500 text-sm">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Email ou nom d'utilisateur"
        type="text"
        name="login"
        value={form.login}
        onChange={handleChange}
        placeholder="Votre email ou username"
        required
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

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-pink-500 hover:text-pink-600"
        >
          Mot de passe oublié ?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full py-3"
      >
        Se connecter
      </Button>
    </form>

    <p className="text-center text-sm text-slate-400 mt-7">
      Pas encore membre ?{" "}
      <Link
        to="/register"
        className="font-semibold text-pink-500"
      >
        Créer un compte
      </Link>
    </p>
  </AuthLayout>
);
}

export default Login;
