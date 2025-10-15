import React, { useState } from 'react';

function CustomerListing() {
  // sample customer data - That will eventually come from API
  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC Corp', contact: 'Mike Johnson', email: 'mike@abc.com', phone: '555-0101', salesmanId: 1 },
    { id: 2, name: 'XYZ Inc', contact: 'Sarah Williams', email: 'sarah@xyz.com', phone: '555-0102', salesmanId: 1 },
    {id:3,name:'Tech Solutions', contact: 'David Brown',email:'david@tech.com',phone: '555-0103', salesmanId: 2}
  ]);

  const [search,setSearch]=useState('');
  const [selectedCustomer,setSelectedCustomer] = useState(null);
  
  // salesman data - this will come from backend eventually
  const salesmen = [
    {id:1,name:'Robert Garcia'},
    { id: 2, name: 'Emily Davis' },
    {id:3, name:'Michael Chen'}
  ];

  // filter customers based on search - using for loop because it's easier for me to understand
  let filteredCustomers = [];
  for(let i=0; i<customers.length; i++) {
    const customer = customers[i];
    const searchLower=search.toLowerCase();
    
    // The check if search matches customer name or contact
    if(customer.name.toLowerCase().includes(searchLower) || 
       customer.contact.toLowerCase().includes(searchLower)) {
      filteredCustomers.push(customer);
    }
  }

  const deleteCustomer = (id) => {
    const confirmDelete=window.confirm('Delete this customer?');
    
    if(confirmDelete==true) {
      const remaining = customers.filter(c => c.id!=id);
      setCustomers(remaining);
      console.log('deleted customer:', id);
    }
  };
  
  // helper function to get salesman name by id
  function getSalesmanName(salesmanId){
    const salesman = salesmen.find(s=>s.id==salesmanId);
    return salesman ? salesman.name : 'Not assigned';
  }

  // function to update customer salesman assignment
  const updateSalesman = (customerId, newSalesmanId) => {
    console.log('assigning salesman', newSalesmanId, 'to customer', customerId);
    const updated=customers.map(c=>
      c.id==customerId ? {...c,salesmanId:newSalesmanId} : c
    );
    setCustomers(updated);
  }

  return (
    <div className="customer-container">
      <h2>Customer Management</h2>
      <p style={{color:'#666',marginBottom:'20px'}}>
        View and manage all customers with their assigned salesmen
      </p>
      
      {/* Search bar */}
      <div className="search-bar" style={{marginBottom:'20px'}}>
        <input
          type="text"
          placeholder="Search by customer name or contact..."
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          style={{
            padding:'10px',
            width: '400px',
            border:'1px solid #ccc',
            borderRadius:'4px',
            fontSize:'14px'
          }}
        />
      </div>

      {/* The Customer table - got table styling from w3schools */}
      <table style={{
        width:'100%',
        borderCollapse:'collapse',
        border:'1px solid #ddd'
      }}>
        <thead>
          <tr style={{backgroundColor:'#f5f5f5'}}>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
              Company Name
            </th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
              Contact Person
            </th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
              Email
            </th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
              Phone
            </th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
              Assigned Salesman
            </th>
            <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer=>{
            return(
              <tr key={customer.id} style={{borderBottom:'1px solid #eee'}}>
                <td style={{padding:'12px'}}>{customer.name}</td>
                <td style={{padding:'12px'}}>{customer.contact}</td>
                <td style={{padding:'12px'}}>{customer.email}</td>
                <td style={{padding:'12px'}}>{customer.phone}</td>
                <td style={{padding:'12px'}}>
                  {/* The Dropdown to assign salesman */}
                  <select 
                    value={customer.salesmanId}
                    onChange={(e)=>updateSalesman(customer.id, parseInt(e.target.value))}
                    style={{
                      padding:'6px 10px',
                      borderRadius:'4px',
                      border:'1px solid #ccc',
                      cursor:'pointer'
                    }}
                  >
                    {salesmen.map(s=>(
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </td>
                <td style={{padding:'12px'}}>
                  <button 
                    onClick={()=>setSelectedCustomer(customer)}
                    style={{
                      marginRight:'8px',
                      padding:'6px 12px',
                      backgroundColor:'#007bff',
                      color: 'white',
                      border:'none',
                      borderRadius:'4px',
                      cursor:'pointer'
                    }}
                  >
                    View
                  </button>
                  <button 
                    onClick={()=>deleteCustomer(customer.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor:'#dc3545',
                      color:'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor:'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {filteredCustomers.length==0 && (
        <p style={{textAlign:'center',color:'#666',marginTop:'20px'}}>
          There are no customers found matching your search
        </p>
      )}
      
      {/* Customer details modal */}
      {selectedCustomer!=null &&(
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
            width:'500px',
            maxWidth:'90%'
          }}>
            <h3 style={{marginTop:0}}>Customer Details</h3>
            <div style={{marginBottom:'15px'}}>
              <strong>Company:</strong> {selectedCustomer.name}
            </div>
            <div style={{marginBottom:'15px'}}>
              <strong>Contact:</strong> {selectedCustomer.contact}
            </div>
            <div style={{marginBottom:'15px'}}>
              <strong>Email:</strong> {selectedCustomer.email}
            </div>
            <div style={{marginBottom:'15px'}}>
              <strong>Phone:</strong> {selectedCustomer.phone}
            </div>
            <div style={{marginBottom:'20px'}}>
              <strong>Salesman:</strong> {getSalesmanName(selectedCustomer.salesmanId)}
            </div>
            <button 
              onClick={()=>setSelectedCustomer(null)}
              style={{
                padding:'8px 20px',
                backgroundColor:'#6c757d',
                color:'white',
                border:'none',
                borderRadius:'4px',
                cursor:'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerListing;import React, { useState } from 'react';

function CustomerListing() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC Corp', contact: 'Mike Johnson', email: 'mike@abc.com', phone: '555-0101' },
    { id: 2, name: 'XYZ Inc', contact: 'Sarah Williams', email: 'sarah@xyz.com', phone: '555-0102' },
    { id: 3, name: 'Tech Solutions', contact: 'David Brown', email: 'david@tech.com', phone: '555-0103' }
  ]);

  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(customer => {
    const searchLower = search.toLowerCase();
    return customer.name.toLowerCase().includes(searchLower) || 
           customer.contact.toLowerCase().includes(searchLower);
  });

  const deleteCustomer = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      const remaining = customers.filter(c => c.id !== id);
      setCustomers(remaining);
    }
  };

  return (
    <div className="customer-container">
      <h2>Customer Listing</h2>
      
      <div className="search-bar" style={{marginBottom: '20px'}}>
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{padding: '8px', width: '300px'}}
        />
      </div>

      <div className="customer-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
        {filteredCustomers.map(customer => {
          return (
            <div key={customer.id} className="customer-card" style={{border: '1px solid #ddd', padding: '15px', borderRadius: '5px'}}>
              <h3>{customer.name}</h3>
              <p><strong>Contact:</strong> {customer.contact}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <div className="card-actions" style={{marginTop: '10px'}}>
                <button className="edit-btn" style={{marginRight: '10px'}}>Edit</button>
                <button 
                  className="delete-btn"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <p className="no-results">No customers found</p>
      )}
    </div>
  );
}

export default CustomerListing;