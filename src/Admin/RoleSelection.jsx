import { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser as deleteUserAPI } from '../../utils/api';

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
  const [registerRole, setRegisterRole] = useState(2); // default to Salesman

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
    e.preventDefault();
    
    // validation
    if (!registerName || !registerEmail || !registerPassword) {
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
      setRegisterRole(2);
      
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
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    // Password must be at least 6 characters
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    // check if passwords match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    
    alert('Password reset feature coming soon! Backend endpoint needed.');
    console.log('password reset for user:', selectedUser.id);
    
    // close modal
    setShowPasswordModal(false);
    setSelectedUser(null);
  };

  function closeModal() {
    setShowPasswordModal(false);
    setSelectedUser(null);
    setNewPassword('');
    setConfirmPassword('');
  }

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
    }
  };

  // helper function to check if delete button should show
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

  return (
    <div className="role-container">
      <h2>User Role Management</h2>
      
      {/* Show current user role */}
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
          <h3>Register New Staff Member</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            For staff registration only. Customers register via the public registration page.
          </p>
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
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
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
                    }}
                  >
                    Reset Password
                  </button>
                  
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
                      }}
                    >
                      Delete
                    </button>
                  )}
                  
                  {/* Show message if user can't delete */}
                  {!canDelete() && (
                    <span style={{ fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
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
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
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
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
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
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
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