import {useState} from 'react';
// import { FaBox, FaCheckCircle, FaTimesCircle } from "react-icons/fa";


function OrderManagement() {
  // Just sample orders - will connect to backend possibility
  const [orders,setOrders]=useState([
    {id:1, customer:'ABC Corp',date:'2025-10-14',status:'pending',total:1250.00},
    { id: 2, customer: 'XYZ Inc', date: '2025-10-14', status: 'active', total: 2800.50 },
    {id:3,customer:'Tech Solutions',date:'2025-10-13',status:'pending', total:950.75},
    { id: 4, customer: 'Global Trade', date: '2025-10-13', status: 'canceled', total: 1500.00 }
  ]);

  const [selectedDate,setSelectedDate] = useState('2025-10-14');
  const [showDatePicker,setShowDatePicker]=useState(false);

  // filter orders by the selected date
  const filteredOrders = orders.filter(order=> order.date == selectedDate);

  function changeOrderStatus(orderId, newStatus){
    console.log('updating order', orderId, 'to', newStatus);
    
    // had to look up the map function 
    const updatedOrders=orders.map(order=> {
      if(order.id==orderId) {
        return {...order,status:newStatus};
      }
      else{
        return order;
      }
    });
    
    setOrders(updatedOrders);
  }

  // tried useEffect here but didn't need it
  // useEffect(() => {
  //   console.log('orders updated');
  // }, [orders]);

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      
      {/* date selector dropdown  */}
      <div className="date-selector" style={{marginBottom:'20px'}}>
        <label style={{marginRight:'10px',fontWeight:'bold'}}>Select Date:</label>
        <div style={{position:'relative',display:'inline-block'}}>
          <button 
            onClick={()=>setShowDatePicker(!showDatePicker)}
            style={{
              padding:'8px 15px',
              border:'1px solid #ccc',
              borderRadius:'4px',
              backgroundColor:'white',
              cursor:'pointer'
            }}
          >
            {selectedDate} ▼
          </button>
          
          {showDatePicker && (
            <div style={{
              position:'absolute',
              top:'100%',
              left:0,
              backgroundColor:'white',
              border:'1px solid #ccc',
              borderRadius:'4px',
              marginTop:'5px',
              padding:'10px',
              zIndex:10,
              boxShadow:'0 2px 8px rgba(0,0,0,0.15)'
            }}>
              <input 
                type="date"
                value={selectedDate}
                onChange={(e)=>{
                  setSelectedDate(e.target.value);
                  setShowDatePicker(false);
                }}
                style={{padding:'5px'}}
              />
            </div>
          )}
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          <table style={{width:'100%',borderCollapse:'collapse',border:'1px solid #ddd'}}>
            <thead>
              <tr style={{backgroundColor:'#f5f5f5'}}>
                <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Order ID</th>
                <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Customer</th>
                <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Date</th>
                <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Total</th>
                <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order=>{
                // added colors for different statuses
                let statusColor = '#fff3cd';
                if(order.status=='active') statusColor='#d4edda';
                if(order.status=='canceled') statusColor='#f8d7da';
                
                return(
                  <tr key={order.id} style={{borderBottom:'1px solid #eee'}}>
                    <td style={{padding:'12px'}}>#{order.id}</td>
                    <td style={{padding:'12px'}}>{order.customer}</td>
                    <td style={{padding:'12px'}}>{order.date}</td>
                    <td style={{padding:'12px'}}>${order.total.toFixed(2)}</td>
                    <td style={{padding:'12px'}}>
                      <select 
                        value={order.status}
                        onChange={(e)=>changeOrderStatus(order.id, e.target.value)}
                        style={{
                          padding:'6px 10px',
                          borderRadius:'4px',
                          border:'1px solid #ccc',
                          backgroundColor: statusColor,
                          cursor:'pointer'
                        }}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p style={{textAlign:'center',color:'#666',padding:'20px'}}>
            No orders found for {selectedDate}
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderManagement;