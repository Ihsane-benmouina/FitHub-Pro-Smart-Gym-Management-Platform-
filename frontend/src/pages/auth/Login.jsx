import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Link } from "react-router-dom";
function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    FitHub Pro
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Connectez-vous à votre espace
                </p>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mb-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mb-4"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white p-3 rounded-lg"
                    >
                        Se connecter
                    </button>

                </form>
                <p className="text-center mt-5 text-gray-500">
                    Pas encore de compte ?{" "}
                    <Link to="/register" className="font-semibold text-gray-900">
                        S'inscrire
                    </Link>
                </p>
                <div className="mt-4">
  <Link
    to="/forgot-password"
    className="underline"
  >
    Mot de passe oublié ?
  </Link>
</div>
            </div>
        </div>
    );
}

export default Login;
