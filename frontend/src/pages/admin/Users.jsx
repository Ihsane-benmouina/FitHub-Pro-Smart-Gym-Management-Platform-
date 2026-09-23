import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "coach",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
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

  const createUser = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/admin/users", form);
      setMessage("Compte créé avec succès");
      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "coach",
      });
      await loadUsers();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Erreur lors de la création du compte"
      );
    }
  };

  const changeRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}/role`, {
        role,
      });

      await loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.put(`/admin/users/${id}/status`);
      await loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Utilisateurs"
        description="Gérez les membres, coachs et utilisateurs de FitHub Pro"
      />

      <Card className="mb-6 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-slate-700">Créer un compte staff</h2>
            <p className="text-xs text-slate-400 mt-1">Coach ou réceptionniste</p>
          </div>
        </div>

        {message && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-600 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom"
            className="px-4 py-3 border border-slate-200 rounded-xl text-sm"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-3 border border-slate-200 rounded-xl text-sm"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className="px-4 py-3 border border-slate-200 rounded-xl text-sm"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white"
          >
            <option value="coach">Coach</option>
            <option value="receptionniste">Réceptionniste</option>
            <option value="admin">Admin</option>
          </select>

          <Button type="submit" className="w-full">Créer</Button>
        </form>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="font-semibold text-slate-700">
            Liste des utilisateurs
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {users.length} utilisateur(s)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-400 uppercase">
                <th className="px-6 py-4 font-medium">
                  Utilisateur
                </th>

                <th className="px-6 py-4 font-medium">
                  Email
                </th>

                <th className="px-6 py-4 font-medium">
                  Rôle
                </th>

                <th className="px-6 py-4 font-medium">
                  Statut
                </th>

                <th className="px-6 py-4 font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/60 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-white flex items-center justify-center font-semibold">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 min-w-48">
                    <Select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(user.id, e.target.value)
                      }
                    >
                      <option value="adherent">Adhérent</option>
                      <option value="coach">Coach</option>
                      <option value="receptionniste">
                        Réceptionniste
                      </option>
                      <option value="admin">Admin</option>
                    </Select>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={
                        user.is_active ? "active" : "inactive"
                      }
                    />
                  </td>

                  <td className="px-6 py-4">
                    <Button
                      variant={
                        user.is_active ? "danger" : "secondary"
                      }
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.is_active
                        ? "Désactiver"
                        : "Activer"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Users;