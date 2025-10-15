import React, { useState } from 'react';

function SpecialPricing() {
  const [specials, setSpecials] = useState([
    {id:1,productName:'Product A',price:99.99,startDate:'2025-10-01',endDate:'2025-10-31'},
    { id: 2, productName: 'Product B', price: 149.99, startDate: '2025-10-15', endDate: '2025-11-15' }
  ]);
  
  // form for adding new special
  const [productName, setProductName]=useState('');
  const [specialPrice,setSpecialPrice]=useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate,setEndDate]=useState('');
  
  // dropdown for product selection - hardcoded for now
  const [availableProducts]=useState([
    'Product A','Product B','Product C','Product D','Product E'
  ]);

  const addSpecial = (e) => {
    e.preventDefault();
    
    // basic validation
    if (!productName || !specialPrice || !startDate || !endDate) {
      alert('Please fill in all fields');
      return;
    }
    
    if(parseFloat(specialPrice)<=0){
      alert('Price must be greater than 0');
      return;
    }
    
    const newSpecial = {
      id: Date.now(),
      productName: productName,
      price: parseFloat(specialPrice),
      startDate: startDate,
      endDate: endDate
    };
    
    setSpecials([...specials, newSpecial]);
    console.log('added new special:', newSpecial);
    
    // reset form
    setProductName('');
    setSpecialPrice('');
    setStartDate('');
    setEndDate('');
  };

  function removeSpecial(id) {
    const confirmDelete=window.confirm('Remove this special pricing?');
    if(confirmDelete) {
      const updated = specials.filter(s=> s.id !== id);
      setSpecials(updated);
    }
  }

  return (
    <div className="special-pricing">
      <h2>Special Pricing Management</h2>
      <p style={{color:'#666',marginBottom:'20px'}}>
        Create and manage special pricing for products
      </p>

      <form onSubmit={addSpecial} style={{
        backgroundColor:'#f8f9fa',
        padding:'20px',
        borderRadius:'8px',
        marginBottom:'30px'
      }}>
        <h3>Add New Special</h3>
        
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'15px',marginTop:'15px'}}>
          <div>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
              Product:
            </label>
            <select
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
              style={{
                width:'100%',
                padding:'8px',
                border:'1px solid #ccc',
                borderRadius:'4px'
              }}
              required
            >
              <option value="">Select a product...</option>
              {availableProducts.map(product=>(
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
              Special Price:
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="99.99"
              value={specialPrice}
              onChange={(e)=>{setSpecialPrice(e.target.value)}}
              style={{
                width:'100%',
                padding:'8px',
                border:'1px solid #ccc',
                borderRadius:'4px'
              }}
              required
            />
          </div>
          
          <div>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
              Start Date:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width:'100%',
                padding:'8px',
                border:'1px solid #ccc',
                borderRadius:'4px'
              }}
              required
            />
          </div>
          
          <div>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'500'}}>
              End Date:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e)=>setEndDate(e.target.value)}
              style={{
                width:'100%',
                padding:'8px',
                border:'1px solid #ccc',
                borderRadius:'4px'
              }}
              required
            />
          </div>
        </div>
        
        <button 
          type="submit"
          style={{
            marginTop:'15px',
            padding:'10px 20px',
            backgroundColor:'#007bff',
            color:'white',
            border:'none',
            borderRadius:'4px',
            cursor:'pointer',
            fontSize:'16px'
          }}
        >
          Add Special Pricing
        </button>
      </form>

      <div className="specials-list">
        <h3>Current Active Specials</h3>
        
        {specials.length > 0 ? (
          <div style={{display:'grid',gap:'15px',marginTop:'15px'}}>
            {specials.map(special=> {
              return(
                <div 
                  key={special.id} 
                  style={{
                    border:'1px solid #ddd',
                    padding:'15px',
                    borderRadius:'5px',
                    backgroundColor:'white'
                  }}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                    <div>
                      <h4 style={{marginTop:0,marginBottom:'10px'}}>{special.productName}</h4>
                      <p style={{margin:'5px 0'}}>
                        <strong>Special Price:</strong> ${special.price.toFixed(2)}
                      </p>
                      <p style={{margin:'5px 0',color:'#666'}}>
                        Valid from {special.startDate} to {special.endDate}
                      </p>
                    </div>
                    <button 
                      onClick={()=>removeSpecial(special.id)}
                      style={{
                        padding:'6px 12px',
                        backgroundColor:'#dc3545',
                        color:'white',
                        border:'none',
                        borderRadius:'4px',
                        cursor:'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p style={{color:'#666',marginTop:'15px'}}>No active specials</p>
        )}
      </div>
    </div>
  );
}

export default SpecialPricing;


