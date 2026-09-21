import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (form.password !== form.password_confirmation) {
      setMessage("Les mots de passe ne correspondent pas");
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
      setMessage(
        error.response?.data?.message ||
          "Impossible de réinitialiser le mot de passe"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Nouveau mot de passe
      </h1>

      {message && (
        <p className="mb-4">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <input
          type="text"
          name="token"
          placeholder="Token"
          value={form.token}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Nouveau mot de passe"
          value={form.password}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
          minLength="8"
        />

        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmer le mot de passe"
          value={form.password_confirmation}
          onChange={handleChange}
          className="border p-2 block mb-3"
          required
          minLength="8"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Réinitialiser
        </button>
      </form>

      <div className="mt-6">
        <Link to="/login" className="underline">
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;