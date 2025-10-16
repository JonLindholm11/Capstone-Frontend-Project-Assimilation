import { useState } from "react";
// import { FaClipboardList, FaTags, FaMoneyBill } from "react-icons/fa";
import './Admin.css'; 
import OrderManagement from './OrderManagement';
import CustomerPricing from './CustomerPricing';
import RoleSelection from './RoleSelection';
import SpecialPricing from './SpecialPricing';
import CustomerListing from './CustomerListing';

//Jodson Branch


// Admin dashboard component
function AdminPage() {
  // keeping track of which section to show
  const [activeSection, setActiveSection] = useState('orders');
  
  // const currentSection, setCurrentSection

  const renderSection = () => {
  
    if(activeSection == 'orders') {
      return <OrderManagement />;
    }
    else if(activeSection == 'customer-pricing') {
      return <CustomerPricing />;
    }
    else if(activeSection == 'roles') {
      return <RoleSelection />;
    }
    else if(activeSection == 'specials') {
      return <SpecialPricing />;
    }
    else if(activeSection == 'customers') {
      return <CustomerListing />;
    }
    else {
      // fallback to orders page
      return <OrderManagement />;
    }
  };

  const handleSectionChange = (section) => {
    console.log('switching to:', section);
    setActiveSection(section);
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage orders, customers, and pricing</p>
      </div>

      {/* navigation buttons for different sections */}
      <div className="admin-navigation">
        <button 
          className={activeSection=='orders'?'nav-active':''}
          onClick={()=>handleSectionChange('orders')}
        >
          Order Management
        </button>
        <button 
          className={activeSection == 'customer-pricing' ? 'nav-active' : ''}
          onClick={() => {
            handleSectionChange('customer-pricing')
          }}
        >
          Customer Pricing
        </button>
        <button 
          className={activeSection=='roles' ? 'nav-active':''}
          onClick={()=> handleSectionChange('roles')}
        >
          User Roles
        </button>
        <button 
          className={activeSection == 'specials'?'nav-active':''}
          onClick={()=>{handleSectionChange('specials')}}
        >
          Special Pricing
        </button>
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


// export default function AdminPage() {
//   return (
//     <div>
//       <h1>Admin Page</h1>
//       <RoleSelection />
//       <SalesmanSelection />
//       <CustomerListing />
//       <SpecialPricing />
//     </div>
//   );
// }