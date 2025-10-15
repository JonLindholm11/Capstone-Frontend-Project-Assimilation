import React, { useState } from 'react';

function SalesmanSelection() {
  const [salesmen, setSalesmen] = useState([
    { id: 1, name: 'Robert Garcia', region: 'North', sales: 45000, active: true },
    { id: 2, name: 'Emily Davis', region: 'South', sales: 52000, active: true },
    { id: 3, name: 'Michael Chen', region: 'East', sales: 38000, active: false },
    { id: 4, name: 'Lisa Anderson', region: 'West', sales: 61000, active: true }
  ]);

  const [selected, setSelected] = useState(null);

  const toggleActive = (id) => {
    const updated = salesmen.map(s => {
      if(s.id === id) {
        return { ...s, active: !s.active };
      }
      return s;
    });
    setSalesmen(updated);
  };

  const selectSalesman = (salesman) => {
    setSelected(salesman);
  };

  return (
    <div className="salesman-container">
      <h2>Salesman Selection & Management</h2>
      
      <div className="salesman-list" style={{display: 'grid', gap: '15px', marginTop: '20px'}}>
        {salesmen.map(salesman => {
          const isSelected = selected?.id === salesman.id;
          
          return (
            <div 
              key={salesman.id} 
              className={`salesman-item ${isSelected ? 'selected' : ''}`}
              onClick={() => selectSalesman(salesman)}
              style={{
                border: isSelected ? '2px solid #007bff' : '1px solid #ddd',
                padding: '15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              <div className="salesman-info">
                <h3>{salesman.name}</h3>
                <p>Region: {salesman.region}</p>
                <p>Total Sales: ${salesman.sales.toLocaleString()}</p>
                <div className="status-toggle" style={{marginTop: '10px'}}>
                  <label>
                    <input
                      type="checkbox"
                      checked={salesman.active}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleActive(salesman.id);
                      }}
                    />
                    {' '}Active
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="selected-info" style={{marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
          <h3>Selected Salesman</h3>
          <p><strong>Name:</strong> {selected.name}</p>
          <p><strong>Region:</strong> {selected.region}</p>
          <p><strong>Sales:</strong> ${selected.sales.toLocaleString()}</p>
          <p><strong>Status:</strong> {selected.active ? 'Active' : 'Inactive'}</p>
          <button style={{marginTop: '10px'}}>Assign to Customer</button>
        </div>
      )}
    </div>
  );
}

export default SalesmanSelection;