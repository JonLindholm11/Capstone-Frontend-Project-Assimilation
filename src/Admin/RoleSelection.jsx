import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API;

function RoleSelection({ token }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API}/users`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const allUsers = await response.json();
        // Filter users with role_id 3 or above
        const filteredUsers = allUsers.filter(user => user.role_id >= 3);
        setUsers(filteredUsers);
      } else {
        setError("Failed to fetch users");
      }
      setLoading(false);
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRoleId) => {
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API}/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          role_id: parseInt(newRoleId)
        })
      });

      if (response.ok) {
        setMessage("Role updated successfully!");
        fetchUsers();
      } else {
        const errorText = await response.text();
        setError(errorText || "Failed to update role");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    }
  };

  const getRoleName = (roleId) => {
    switch(roleId) {
      case 1: return "Admin";
      case 2: return "Salesman";
      case 3: return "Customer Service";
      case 4: return "Customer";
      default: return "Unknown";
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="role-selection-section">
      <h2>Role Management</h2>
      <p>Manage user roles and permissions</p>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="users-list">
        {users.length === 0 ? (
          <p>No users found with role level 3 or above.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{getRoleName(user.role_id)}</td>
                  <td>
                    <select 
                      id={`role-${user.id}`}
                      defaultValue={user.role_id}
                      className="role-select"
                    >
                      <option value="1">Admin</option>
                      <option value="2">Salesman</option>
                      <option value="3">Customer Service</option>
                      <option value="4">Customer</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      onClick={() => {
                        const newRole = document.getElementById(`role-${user.id}`).value;
                        handleRoleChange(user.id, newRole);
                      }}
                      className="save-btn"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RoleSelection;