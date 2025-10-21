import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import './Admin.css'; 
import OrderManagement from './OrderManagement';
import CustomerPricing from './CustomerPricing';
import RoleSelection from './RoleSelection';
import SpecialPricing from './SpecialPricing';
import CustomerService from './CustomerService';

//Jodson Branch | Connected to backend with role-based permissions

// Admin dashboard component
function AdminPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('orders');
  const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  // check if user is logged in and has permission
  if (!token) {
    console.log('no token, redirecting to admin login');
    navigate('/admin'); // Redirect to admin login page
    return;
  }

  // decode JWT token to get user info
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('decoded token payload:', payload);
    
    // check if user has admin access
    const allowedRoles = [1, 2, 3]; // admin, salesman, customer service
    
    if (!allowedRoles.includes(payload.role_id)) {
      alert('Access Denied! Only staff members can access the admin panel.');
      navigate('/');
      return;
    }

    setCurrentUser(payload);
    setLoading(false);
  } catch (error) {
    console.error('error decoding token:', error);
    navigate('/admin'); // Redirect to admin login page
  }
}, [token, navigate]);

  // helper functions to check user role
  const isAdmin = () => currentUser?.role_id === 1;
  const isSalesman = () => currentUser?.role_id === 2;
  // const isCustomerService = () => currentUser?.role_id === 3;
  // get role name for display
  const getRoleName = () => {
    if (!currentUser) return '';
    switch(currentUser.role_id) {
      case 1: return 'Admin';
      case 2: return 'Salesman';
      case 3: return 'Customer Service';
      default: return 'User';
    }
  };

  const renderSection = () => {
    if(activeSection == 'orders') {
      return <OrderManagement currentUser={currentUser} />;
    }
    else if(activeSection == 'customer-pricing') {
      return <CustomerPricing currentUser={currentUser} />;
    }
    else if(activeSection == 'roles') {
      return <RoleSelection currentUser={currentUser} />;
    }
    else if(activeSection == 'specials') {
      return <SpecialPricing currentUser={currentUser} />;
    }
    else if(activeSection == 'customers') {
      return <CustomerService currentUser={currentUser} />;
    }
    else {
      return <OrderManagement currentUser={currentUser} />;
    }
  };

  const handleSectionChange = (section) => {
    console.log('switching to:', section);
    setActiveSection(section);
  }

  // show loading screen while checking permissions
  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage orders, customers, and pricing</p>
        <p className="user-info">
          Logged in as: <strong>{getRoleName()}</strong>
        </p>
      </div>

      {/* navigation buttons - different tabs based on role */}
      <div className="admin-navigation">
        {/* Everyone can see Order Management */}
        <button 
          className={activeSection=='orders'?'nav-active':''}
          onClick={()=>handleSectionChange('orders')}
        >
          Order Management
        </button>

        {/* Only Admin and Salesman see Customer Pricing */}
        {(isAdmin() || isSalesman()) && (
          <button 
            className={activeSection == 'customer-pricing' ? 'nav-active' : ''}
            onClick={() => {
              handleSectionChange('customer-pricing')
            }}
          >
            Customer Pricing
          </button>
        )}

        {/* Only Admin sees User Roles */}
        {isAdmin() && (
          <button 
            className={activeSection=='roles' ? 'nav-active':''}
            onClick={()=> handleSectionChange('roles')}
          >
            User Roles
          </button>
        )}

        {/* Only Admin sees Special Pricing */}
        {isAdmin() && (
          <button 
            className={activeSection == 'specials'?'nav-active':''}
            onClick={()=>{handleSectionChange('specials')}}
          >
            Special Pricing
          </button>
        )}

        {/* Everyone can see Customer Management */}
        <button 
          className={activeSection=='customers'?'nav-active':''}
          onClick={() => handleSectionChange('customers')}
        >
          Customer Management
        </button>
      </div>

      <div className="admin-content-area">
        {renderSection()}
      </div>
    </div>
  );
}

export default AdminPage;