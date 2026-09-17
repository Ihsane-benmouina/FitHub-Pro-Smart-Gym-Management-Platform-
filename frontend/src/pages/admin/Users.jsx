import { useEffect, useState } from "react";
import api from "../../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
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

  const changeRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}/role`, {
        role: role,
      });

      setMessage("Rôle modifié avec succès");
      loadUsers();
    } catch (error) {
      setMessage("Erreur lors de la modification");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.put(`/admin/users/${id}/status`);

      setMessage("Statut modifié avec succès");
      loadUsers();
    } catch (error) {
      setMessage("Erreur lors de la modification");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Gestion des utilisateurs
      </h1>

      {message && <p className="mb-4">{message}</p>}

      {users.length === 0 ? (
        <p>Aucun utilisateur.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="border p-4 mb-3">

            <strong>{user.name}</strong>

            <p>{user.email}</p>

            <p>
              Statut : {user.is_active ? "Actif" : "Désactivé"}
            </p>

            <select
              value={user.role}
              onChange={(e) =>
                changeRole(user.id, e.target.value)
              }
              className="border p-2 mt-2"
            >
              <option value="adherent">Adhérent</option>
              <option value="coach">Coach</option>
              <option value="receptionniste">
                Réceptionniste
              </option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={() => toggleStatus(user.id)}
              className="border px-3 py-2 ml-3"
            >
              {user.is_active ? "Désactiver" : "Activer"}
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default Users;