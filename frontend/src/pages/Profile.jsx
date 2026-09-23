import { useEffect, useState } from "react";
import api from "../api/axios";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";


function Profile() {
  const [user, setUser] = useState(null);
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

      const profileUser = response.data.user;

      setUser(profileUser);
      setForm({
        name: profileUser.name || "",
        phone: profileUser.phone || "",
        birth_date: profileUser.birth_date || "",
        gender: profileUser.gender || "",
        address: profileUser.address || "",
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
  <div>
    <PageHeader
      title="Mon profil"
      description="Consultez et modifiez vos informations personnelles"
    />

    {message && (
      <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-600 text-sm">
        {message}
      </div>
    )}

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* PROFILE CARD */}
      <Card>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <h2 className="font-bold text-slate-800 mt-4">
            {user?.name}
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            {user?.email}
          </p>

          <span className="inline-block mt-4 px-3 py-1 bg-pink-50 text-pink-500 rounded-full text-xs font-medium capitalize">
            {user?.role}
          </span>
        </div>
      </Card>

      {/* FORM */}
      <Card className="xl:col-span-2">
        <h2 className="font-bold text-slate-800 mb-6">
          Informations personnelles
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom complet"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Téléphone"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
            />

            <Input
              label="Date de naissance"
              type="date"
              name="birth_date"
              value={form.birth_date || ""}
              onChange={handleChange}
            />

            <Select
              label="Genre"
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
            >
              <option value="">
                Sélectionner
              </option>

              <option value="homme">
                Homme
              </option>

              <option value="femme">
                Femme
              </option>
            </Select>
          </div>

          <Input
            label="Adresse"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
          />

          <Button type="submit">
            Enregistrer les modifications
          </Button>
        </form>
      </Card>
    </div>
  </div>
);
}

export default Profile;