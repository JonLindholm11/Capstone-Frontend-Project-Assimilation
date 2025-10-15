import React, {useState} from 'react';

// component for managing customer price categories
function CustomerPricing() {
  // hardcoded data for now - TODO: fetch from API later
  const [salesmen]=useState([
    {id:1,name:'Robert Garcia'},
    { id: 2, name: 'Emily Davis' },
    {id:3, name:'Michael Chen'}
  ]);

  const [customers] = useState([
    {id:1,name:'ABC Corp',salesmanId:1,priceCategory:'standard'},
    { id: 2, name: 'XYZ Inc', salesmanId: 1, priceCategory: 'premium' },
    {id:3,name:'Tech Solutions', salesmanId:2,priceCategory:'standard'},
    { id: 4, name: 'Global Trade', salesmanId: 2, priceCategory: 'wholesale' }
  ]);

  const [selectedSalesman, setSelectedSalesman]=useState(null);
  const [customerPrices,setCustomerPrices] = useState(customers);

  const priceCategories=['standard','premium','wholesale','discount'];

  // get customers for selected salesman
  // this function filters based on salesmanId
  const getSalesmanCustomers = () => {
    if(!selectedSalesman) return[];
    
    // originally tried a for loop but filter is cleaner
    return customerPrices.filter(c=> c.salesmanId == selectedSalesman.id);
  }

  function updatePriceCategory(customerId, newCategory){
    console.log('updating customer',customerId,'to category',newCategory);
    
    const updated = customerPrices.map(customer=> {
      if(customer.id==customerId){
        return{...customer, priceCategory:newCategory};
      }
      return customer;
    });
    
    setCustomerPrices(updated);
  }

  const handleSave=()=> {
    // will implement API call here eventually
    alert('Price categories saved successfully!');
    console.log('saving price data:', customerPrices);
  }

  return (
    <div className="customer-pricing">
      <h2>Customer Price Categories</h2>
      <p style={{color:'#666',marginBottom:'20px'}}>
        Select a salesman to manage their customer pricing
      </p>

      {/* Dropdown to select salesman */}
      <div className="salesman-selector" style={{marginBottom:'25px'}}>
        <label style={{marginRight:'10px',fontWeight:'bold'}}>Select Salesman:</label>
        <select 
          onChange={(e)=> {
            const salesmanId=parseInt(e.target.value);
            const salesman = salesmen.find(s=>s.id==salesmanId);
            setSelectedSalesman(salesman);
            console.log('selected salesman:', salesman);
          }}
          style={{
            padding:'8px 15px',
            border:'1px solid #ccc',
            borderRadius:'4px',
            cursor:'pointer'
          }}
        >
          <option value="">Choose a salesman...</option>
          {salesmen.map(salesman=>(
            <option key={salesman.id} value={salesman.id}>
              {salesman.name}
            </option>
          ))}
        </select>
      </div>

      {selectedSalesman && (
        <div className="customer-list">
          <h3>Customers for {selectedSalesman.name}</h3>
          
          {getSalesmanCustomers().length>0 ? (
            <>
              <table style={{width:'100%',borderCollapse:'collapse',marginTop:'15px'}}>
                <thead>
                  <tr style={{backgroundColor:'#f5f5f5'}}>
                    <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
                      Customer Name
                    </th>
                    <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>
                      Price Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSalesmanCustomers().map(customer=>{
                    return(
                      <tr key={customer.id} style={{borderBottom:'1px solid #eee'}}>
                        <td style={{padding:'12px'}}>{customer.name}</td>
                        <td style={{padding:'12px'}}>
                          <select 
                            value={customer.priceCategory}
                            onChange={(e)=>updatePriceCategory(customer.id,e.target.value)}
                            style={{
                              padding:'6px 10px',
                              borderRadius:'4px',
                              border:'1px solid #ccc',
                              cursor:'pointer'
                            }}
                          >
                            {priceCategories.map(category=>(
                              <option key={category} value={category}>
                                {category.charAt(0).toUpperCase()+category.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              
              {/* Save button - posts data to backend */}
              <button 
                onClick={handleSave}
                style={{
                  marginTop:'20px',
                  padding:'10px 20px',
                  backgroundColor:'#28a745',
                  color:'white',
                  border:'none',
                  borderRadius:'4px',
                  cursor:'pointer',
                  fontSize:'16px'
                }}
              >
                Save Changes
              </button>
            </>
          ):(
            <p style={{color:'#666',marginTop:'15px'}}>
              No customers assigned to this salesman
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerPricing;