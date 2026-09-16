import { useEffect, useState } from "react";
import api from "../api/axios";


function Profile() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    birth_date: "",
    gender: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await api.get("/profile");

      const user = response.data.user;

      setForm({
        name: user.name || "",
        phone: user.phone || "",
        birth_date: user.birth_date || "",
        gender: user.gender || "",
        address: user.address || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/profile", form);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Profil modifié avec succès");
    } catch (error) {
      setMessage("Erreur lors de la modification");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Mon profil
      </h1>

      {message && (
        <p className="mb-4">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg">

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nom"
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Téléphone"
          className="border p-2 w-full mb-3"
        />

        <input
          type="date"
          name="birth_date"
          value={form.birth_date}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        >
          <option value="">Genre</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>

        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Adresse"
          className="border p-2 w-full mb-3"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Modifier
        </button>

      </form>

    </div>
  );
}

export default Profile;