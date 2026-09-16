import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Créer un compte
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Rejoignez FitHub Pro
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-3"
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirmer le mot de passe"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-3 rounded-lg"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center mt-5 text-gray-500">
          Déjà un compte ?{" "}
          <Link to="/login" className="font-semibold text-gray-900">
            Se connecter
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;