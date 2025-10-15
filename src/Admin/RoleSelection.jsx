import React, { useState } from 'react';

function RoleSelection() {
  // keeping track of users - will eventually pull from database
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', password: '********' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', password: '********' }
    { id: 3, name: 'Jodson Cadet', email: 'jodson@example.com', role: 'user', password: '********' },
    { id: 4, name: 'Jon Lindholm', email: 'jonl@example.com', role: 'user', password: '********' },
    { id: 5, name: 'Jacob Sonsini', email: 'jacobs@example.com', role: 'user', password: '********' },
    { id: 6, name: 'Jose Pando', email: 'josep@example.com', role: 'user', password: '********' },
    { id: 7, name: 'Daniel Bistel', email: 'danb@example.com', role: 'user', password: '********' }
  ]);

  const availableRoles = ['user', 'admin', 'manager', 'salesman', 'customer'];
  
  // state for password reset modal
  const [showPasswordModal, setShowPasswordModal]=useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // state for registration form - learned useState from a react tutorial
  const [registerName, setRegisterName]=useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword,setRegisterPassword]=useState('');
  const [registerRole,setRegisterRole]=useState('user');

  const changeRole = (userId, newRole) => {
    console.log('changing role for user:', userId);
    // map through users and update the role
    const updatedUsers = users.map(user => {
      if(user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // function to register new user - had to figure this out myself
  const handleRegister = (e) => {
    e.preventDefault();
    
    // validation
    if(!registerName || !registerEmail || !registerPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    // check if email already exists - got this idea from stack overflow
    const emailExists = users.find(u => u.email == registerEmail);
    if(emailExists) {
      alert('Email already exists!');
      return;
    }
    
    if(registerPassword.length < 6){
      alert('Password must be at least 6 characters');
      return;
    }
    
    // create new user object
    const newUser = {
      id: Date.now(), // simple way to generate unique id
      name: registerName,
      email: registerEmail,
      role: registerRole,
      password: '********' // masked for security
    };
    
    console.log('registering new user:', newUser);
    setUsers([...users, newUser]);
    
    // clear the form after successful registration
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterRole('user');
    
    alert('User registered successfully!');
  }

  // open password reset modal - learned about modals from youtube
  const openPasswordReset=(user)=> {
    setSelectedUser(user);
    setShowPasswordModal(true);
    // clear form fields
    setNewPassword('');
    setConfirmPassword('');
  }

  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    // validation - password must be at least 6 characters
    if(newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    // check if passwords match
    if(newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // update password in state (in real app would send to backend)
    const updatedUsers=users.map(user=> {
      if(user.id==selectedUser.id){
        return {...user, password: '********'}; // keep it masked
      }
      return user;
    });
    
    setUsers(updatedUsers);
    alert('Password reset successfully!');
    console.log('password reset for user:', selectedUser.id);
    
    // close modal
    setShowPasswordModal(false);
    setSelectedUser(null);
  }

  function closeModal() {
    setShowPasswordModal(false);
    setSelectedUser(null);
    setNewPassword('');
    setConfirmPassword('');
  }

  // function to delete user - added this feature
  const deleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if(confirmDelete) {
      const filtered = users.filter(u => u.id !== userId);
      setUsers(filtered);
      console.log('deleted user:', userId);
    }
  }

  return (
    <div className="role-container">
      <h2>User Role Management</h2>
      
      {/* Registration form - create new users */}
      <div style={{
        backgroundColor:'#f8f9fa',
        padding:'20px',
        borderRadius:'8px',
        marginBottom:'30px'
      }}>
        <h3>Register New User</h3>
        <form onSubmit={handleRegister}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginTop:'15px'}}>
            <div>
              <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
                Name:
              </label>
              <input
                type="text"
                value={registerName}
                onChange={(e)=>setRegisterName(e.target.value)}
                placeholder="Enter full name"
                style={{
                  width:'100%',
                  padding:'8px',
                  border:'1px solid #ccc',
                  borderRadius:'4px',
                  boxSizing:'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
                Email:
              </label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e)=> setRegisterEmail(e.target.value)}
                placeholder="email@example.com"
                style={{
                  width:'100%',
                  padding:'8px',
                  border:'1px solid #ccc',
                  borderRadius:'4px',
                  boxSizing:'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
                Password:
              </label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e)=>setRegisterPassword(e.target.value)}
                placeholder="Min 6 characters"
                style={{
                  width:'100%',
                  padding:'8px',
                  border:'1px solid #ccc',
                  borderRadius:'4px',
                  boxSizing:'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
                Role:
              </label>
              <select
                value={registerRole}
                onChange={(e)=>setRegisterRole(e.target.value)}
                style={{
                  width:'100%',
                  padding:'8px',
                  border:'1px solid #ccc',
                  borderRadius:'4px',
                  boxSizing:'border-box'
                }}
              >
                {availableRoles.map(role=>(
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
              marginTop:'15px',
              padding:'10px 20px',
              backgroundColor:'#28a745',
              color:'white',
              border:'none',
              borderRadius:'4px',
              cursor:'pointer',
              fontSize:'16px'
            }}
          >
            Register User
          </button>
        </form>
      </div>
      
      {/* Existing users table */}
      <h3>Manage Existing Users</h3>
      <table className="role-table" style={{width: '100%', marginTop: '20px',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{backgroundColor:'#f5f5f5'}}>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Name</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Email</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Role</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Password</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id} style={{borderBottom:'1px solid #eee'}}>
                <td style={{padding:'12px'}}>{user.name}</td>
                <td style={{padding:'12px'}}>{user.email}</td>
                <td style={{padding:'12px'}}>
                  <select 
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    style={{padding:'6px 10px',borderRadius:'4px',border:'1px solid #ccc'}}
                  >
                    {availableRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
                <td style={{padding:'12px'}}>{user.password}</td>
                <td style={{padding:'12px'}}>
                  <button 
                    onClick={()=>openPasswordReset(user)}
                    style={{
                      padding:'6px 12px',
                      backgroundColor:'#007bff',
                      color:'white',
                      border:'none',
                      borderRadius:'4px',
                      cursor:'pointer',
                      marginRight:'8px'
                    }}
                  >
                    Reset Password
                  </button>
                  <button 
                    onClick={()=>deleteUser(user.id)}
                    style={{
                      padding:'6px 12px',
                      backgroundColor:'#dc3545',
                      color:'white',
                      border:'none',
                      borderRadius:'4px',
                      cursor:'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Password Reset Modal - got the styling from w3schools modal tutorial */}
      {showPasswordModal && (
        <div style={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          bottom:0,
          backgroundColor:'rgba(0,0,0,0.5)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          zIndex:1000
        }}>
          <div style={{
            backgroundColor:'white',
            padding:'30px',
            borderRadius:'8px',
            width:'400px',
            maxWidth:'90%'
          }}>
            <h3>Reset Password for {selectedUser?.name}</h3>
            <form onSubmit={handlePasswordReset}>
              <div style={{marginBottom:'15px'}}>
                <label style={{display:'block',marginBottom:'5px'}}>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{
                    width:'100%',
                    padding:'8px',
                    border:'1px solid #ccc',
                    borderRadius:'4px',
                    boxSizing:'border-box'
                  }}
                  required
                />
              </div>
              
              <div style={{marginBottom:'20px'}}>
                <label style={{display:'block',marginBottom:'5px'}}>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={{
                    width:'100%',
                    padding:'8px',
                    border:'1px solid #ccc',
                    borderRadius:'4px',
                    boxSizing:'border-box'
                  }}
                  required
                />
              </div>
              
              <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
                <button 
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding:'8px 16px',
                    backgroundColor:'#6c757d',
                    color:'white',
                    border:'none',
                    borderRadius:'4px',
                    cursor:'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    padding:'8px 16px',
                    backgroundColor:'#28a745',
                    color:'white',
                    border:'none',
                    borderRadius:'4px',
                    cursor:'pointer'
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

export default RoleSelection;import React, { useState } from 'react';

function RoleSelection() {
  // keeping track of users - will eventually pull from database
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', password: '********' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', password: '********' }
  ]);

  const availableRoles = ['user', 'admin', 'manager', 'salesman'];
  
  const [showPasswordModal, setShowPasswordModal]=useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeRole = (userId, newRole) => {
    console.log('changing role for user:', userId);
    const updatedUsers = users.map(user => {
      if(user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // open password reset modal
  const openPasswordReset=(user)=> {
    setSelectedUser(user);
    setShowPasswordModal(true);
    setNewPassword('');
    setConfirmPassword('');
  }

  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    if(newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    if(newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // update password in state
    const updatedUsers=users.map(user=> {
      if(user.id==selectedUser.id){
        return {...user, password: '********'};
      }
      return user;
    });
    
    setUsers(updatedUsers);
    alert('Password reset successfully!');
    setShowPasswordModal(false);
    setSelectedUser(null);
  }

  const closeModal=()=> {
    setShowPasswordModal(false);
    setSelectedUser(null);
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="role-container">
      <h2>User Role Management</h2>
      
      <table className="role-table" style={{width: '100%', marginTop: '20px',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{backgroundColor:'#f5f5f5'}}>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Name</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Email</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Role</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Password</th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id} style={{borderBottom:'1px solid #eee'}}>
                <td style={{padding:'12px'}}>{user.name}</td>
                <td style={{padding:'12px'}}>{user.email}</td>
                <td style={{padding:'12px'}}>
                  <select 
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    style={{padding:'6px 10px',borderRadius:'4px',border:'1px solid #ccc'}}
                  >
                    {availableRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
                <td style={{padding:'12px'}}>{user.password}</td>
                <td style={{padding:'12px'}}>
                  <button 
                    onClick={()=>openPasswordReset(user)}
                    style={{
                      padding:'6px 12px',
                      backgroundColor:'#007bff',
                      color:'white',
                      border:'none',
                      borderRadius:'4px',
                      cursor:'pointer'
                    }}
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div style={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          bottom:0,
          backgroundColor:'rgba(0,0,0,0.5)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          zIndex:1000
        }}>
          <div style={{
            backgroundColor:'white',
            padding:'30px',
            borderRadius:'8px',
            width:'400px',
            maxWidth:'90%'
          }}>
            <h3>Reset Password for {selectedUser?.name}</h3>
            <form onSubmit={handlePasswordReset}>
              <div style={{marginBottom:'15px'}}>
                <label style={{display:'block',marginBottom:'5px'}}>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{
                    width:'100%',
                    padding:'8px',
                    border:'1px solid #ccc',
                    borderRadius:'4px',
                    boxSizing:'border-box'
                  }}
                  required
                />
              </div>
              
              <div style={{marginBottom:'20px'}}>
                <label style={{display:'block',marginBottom:'5px'}}>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={{
                    width:'100%',
                    padding:'8px',
                    border:'1px solid #ccc',
                    borderRadius:'4px',
                    boxSizing:'border-box'
                  }}
                  required
                />
              </div>
              
              <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
                <button 
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding:'8px 16px',
                    backgroundColor:'#6c757d',
                    color:'white',
                    border:'none',
                    borderRadius:'4px',
                    cursor:'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    padding:'8px 16px',
                    backgroundColor:'#28a745',
                    color:'white',
                    border:'none',
                    borderRadius:'4px',
                    cursor:'pointer'
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