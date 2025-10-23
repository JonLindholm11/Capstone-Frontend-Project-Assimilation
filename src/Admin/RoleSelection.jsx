<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser as deleteUserAPI } from '/src/utils/api';

function RoleSelection({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Role mapping: backend uses role_id, frontend displays names
  const roleMap = {
    1: 'Admin',
    2: 'Salesman',
    3: 'Customer Service',
    4: 'Customer'
  };

  // Only staff roles - customers register via public registration page
  const availableRoles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Salesman' },
    { id: 3, name: 'Customer Service' }
  ];
  
  // The password reset modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // The state for registration form 
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState(4); // default to Customer

  // Fetch users from backend on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (userId, newRoleId) => {
    console.log('changing role for user:', userId, 'to role:', newRoleId);
    
    try {
      await updateUserRole(userId, newRoleId);
      
      // Update local state
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, role_id: newRoleId };
        }
        return user;
      });
      setUsers(updatedUsers);
      alert('Role updated successfully!');
    } catch (err) {
      console.error('Error updating role:', err);
      alert('Failed to update role. Please try again.');
    }
  };

  // function to register new user 
  const handleRegister = async (e) => {
=======
import { useState } from "react";
// import { FaUserShield, FaUserTie, FaUsers } from "react-icons/fa";

function RoleSelection() {
  // keeping track of users - will eventually pull from database
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      password: "********",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      password: "********",
    },
    {
      id: 3,
      name: "Jodson Cadet",
      email: "jodson@example.com",
      role: "manager",
      password: "********",
    },
    {
      id: 4,
      name: "Jon Linholm",
      email: "jon@example.com",
      role: "admin",
      password: "********",
    },
    {
      id: 5,
      name: "Jacob Sonsini",
      email: "jacob@example.com",
      role: "salesman",
      password: "********",
    },
    {
      id: 6,
      name: "Jose Pando",
      email: "jose@example.com",
      role: "salesman",
      password: "********",
    },
    {
      id: 7,
      name: "Daniel Bistel",
      email: "daniel@example.com",
      role: "salesman",
      password: "********",
    },
  ]);

  const availableRoles = ["user", "admin", "manager", "salesman", "customer"];

  // hardcoded current user role for now - will get from auth context later
  // replace with useAuth() when backend is ready
  const currentUserRole = "admin"; // change this to test different permissions

  // The password reset modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // The state for registration form
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState("user");

  const changeRole = (userId, newRole) => {
    console.log("changing role for user:", userId);
    // map through users and update the role
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // function to register new user
  const handleRegister = (e) => {
>>>>>>> origin/main
    e.preventDefault();

    // validation
    if (!registerName || !registerEmail || !registerPassword) {
<<<<<<< HEAD
      alert('Please fill in all fields');
      return;
    }
    
    // check if email already exists 
    const emailExists = users.find(u => u.email === registerEmail);
    if (emailExists) {
      alert('Email already exists!');
      return;
    }
    
    if (registerPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    try {
      // Call backend register endpoint
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerEmail,
          password: registerPassword,
          role_id: registerRole
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Refresh users list
      await fetchUsers();
      
      // clear the form after successful registration
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterRole(4);
      
      alert('User registered successfully!');
    } catch (err) {
      console.error('Error registering user:', err);
      alert('Failed to register user. Please try again.');
    }
  };

  // open password reset modal 
  const openPasswordReset = (user) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
    setNewPassword('');
    setConfirmPassword('');
=======
      alert("Please fill in all fields");
      return;
    }

    // check if email already exists
    const emailExists = users.find((u) => u.email == registerEmail);
    if (emailExists) {
      alert("Email already exists!");
      return;
    }

    if (registerPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // create new user object
    const newUser = {
      id: Date.now(), // simple way to generate unique id
      name: registerName,
      email: registerEmail,
      role: registerRole,
      password: "********", // password masked for security
    };

    console.log("registering new user:", newUser);
    setUsers([...users, newUser]);

    // clear the form after successful registration
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterRole("user");

    alert("User registered successfully!");
  };

  // open password reset modal
  const openPasswordReset = (user) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
    // clear form fields
    setNewPassword("");
    setConfirmPassword("");
>>>>>>> origin/main
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    // Password must be at least 3 characters
    if (newPassword.length < 3) {
      alert('Password must be at least 3 characters');
=======
    //The password must be at least 6 characters
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
>>>>>>> origin/main
      return;
    }

    // check if passwords match
    if (newPassword !== confirmPassword) {
<<<<<<< HEAD
      alert('Passwords do not match!');
      return;
    }
    
    // TODO: Add password reset endpoint to backend
    alert('Password reset feature coming soon! Backend endpoint needed.');
    console.log('password reset for user:', selectedUser.id);
    
=======
      alert("Passwords do not match!");
      return;
    }

    // update password in state | would send to backend eventually
    const updatedUsers = users.map((user) => {
      if (user.id == selectedUser.id) {
        return { ...user, password: "********" }; // keep it masked
      }
      return user;
    });

    setUsers(updatedUsers);
    alert("Password reset successfully!");
    console.log("password reset for user:", selectedUser.id);

>>>>>>> origin/main
    // close modal
    setShowPasswordModal(false);
    setSelectedUser(null);
  };

  function closeModal() {
    setShowPasswordModal(false);
    setSelectedUser(null);
    setNewPassword("");
    setConfirmPassword("");
  }

<<<<<<< HEAD
  // function to delete user - only admin
  const handleDeleteUser = async (userId) => {
    // check if current user has permission to delete
    if (currentUser?.role_id !== 1) {
      alert('Access Denied! Only admins can delete users.');
      console.log('delete attempt blocked for role:', currentUser?.role_id);
      return;
    }
    
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await deleteUserAPI(userId);
        
        // Update local state
        const filtered = users.filter(u => u.id !== userId);
        setUsers(filtered);
        console.log('deleted user:', userId);
        alert('User deleted successfully!');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
=======
  // function to delete user - only admin and manager
  // added permission check for security
  const deleteUser = (userId) => {
    // check if current user has permission to delete
    if (currentUserRole !== "admin" && currentUserRole !== "manager") {
      alert("Access Denied! Only admins and managers can delete users.");
      console.log("delete attempt blocked for role:", currentUserRole);
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const filtered = users.filter((u) => u.id !== userId);
      setUsers(filtered);
      console.log("deleted user:", userId);
      alert("User deleted successfully!");
>>>>>>> origin/main
    }
  };

  // helper function to check if delete button should show
<<<<<<< HEAD
  const canDelete = () => {
    return currentUser?.role_id === 1; // Only admin
  };

  if (loading) {
    return <div className="role-container"><p>Loading users...</p></div>;
  }

  if (error) {
    return (
      <div className="role-container">
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchUsers}>Retry</button>
      </div>
    );
  }
=======

  const canDelete = () => {
    return currentUserRole === "admin" || currentUserRole === "manager";
  };
>>>>>>> origin/main

  return (
    <div className="role-container">
      <h2>User Role Management</h2>

      {/* Show current user role */}
<<<<<<< HEAD
      <p style={{ color: '#666', marginBottom: '10px', fontSize: '14px' }}>
        Logged in as: <strong>{roleMap[currentUser?.role_id]}</strong>
      </p>
      
      {/* Only admins can register new users */}
      {currentUser?.role_id === 1 && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3>Register New User</h3>
          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Name:
                </label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Enter full name"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Email:
                </label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="email@example.com"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Password:
                </label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Role:
                </label>
                <select
                  value={registerRole}
                  onChange={(e) => setRegisterRole(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                >
                  {availableRoles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              type="submit"
              style={{
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Register User
            </button>
          </form>
        </div>
      )}
      
      {/* Existing users table */}
      <h3>Manage Existing Users</h3>
      <table className="role-table" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Role</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
=======
      <p style={{ color: "white", marginBottom: "10px", fontSize: "14px" }}>
        Logged in as: <strong>{currentUserRole}</strong>
      </p>

      {/* The Registration form  */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ color: "black" }}>Register New User</h3>
        <form onSubmit={handleRegister}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Name:
              </label>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Enter full name"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Email:
              </label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="email@example.com"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Password:
              </label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Min 6 characters"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Role:
              </label>
              <select
                value={registerRole}
                onChange={(e) => setRegisterRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Register User
          </button>
        </form>
      </div>

      {/* Existing users table */}
      <h3>Manage Existing Users</h3>
      <table
        className="role-table"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
                color: "black",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
                color: "black",
              }}
            >
              Email
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
                color: "black",
              }}
            >
              Role
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
                color: "black",
              }}
            >
              Password
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
                color: "black",
              }}
            >
              Actions
            </th>
>>>>>>> origin/main
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
<<<<<<< HEAD
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{user.id}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  {currentUser?.role_id === 1 ? (
                    <select 
                      value={user.role_id}
                      onChange={(e) => changeRole(user.id, Number(e.target.value))}
                      style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                      {availableRoles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{roleMap[user.role_id]}</span>
                  )}
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => openPasswordReset(user)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '8px'
=======
              <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px"}}>{user.name}</td>
                <td style={{ padding: "12px" }}>{user.email}</td>
                <td style={{ padding: "12px" }}>
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: "12px" }}>{user.password}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => openPasswordReset(user)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "8px",
>>>>>>> origin/main
                    }}
                  >
                    Reset Password
                  </button>
<<<<<<< HEAD
                  
                  {/* Only show delete button for admin */}
                  {canDelete() && (
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
=======

                  {/* Only show delete button for admin and manager */}
                  {canDelete() && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
>>>>>>> origin/main
                      }}
                    >
                      Delete
                    </button>
                  )}

                  {/* Show message if user can't delete */}
                  {!canDelete() && (
<<<<<<< HEAD
                    <span style={{ fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
=======
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        fontStyle: "italic",
                      }}
                    >
>>>>>>> origin/main
                      (No delete permission)
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Password Reset Modal*/}
      {showPasswordModal && (
<<<<<<< HEAD
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '400px',
            maxWidth: '90%'
          }}>
            <h3>Reset Password for {selectedUser?.email}</h3>
            <form onSubmit={handlePasswordReset}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>New Password:</label>
=======
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <h3>Reset Password for {selectedUser?.name}</h3>
            <form onSubmit={handlePasswordReset}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  New Password:
                </label>
>>>>>>> origin/main
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{
<<<<<<< HEAD
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
=======
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
>>>>>>> origin/main
                  }}
                  required
                />
              </div>
<<<<<<< HEAD
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
=======

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Confirm Password:
                </label>
>>>>>>> origin/main
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={{
<<<<<<< HEAD
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
=======
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
>>>>>>> origin/main
                  }}
                  required
                />
              </div>
<<<<<<< HEAD
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
=======

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
>>>>>>> origin/main
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
<<<<<<< HEAD
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
=======
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
>>>>>>> origin/main
                  }}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleSelection;