import React, { useState } from 'react';

function SalesmanSelection() {
  const [salesmen, setSalesmen] = useState([
    { id: 1, name: 'Robert Garcia', region: 'North', sales: 45000, active: true },
    { id: 2, name: 'Emily Davis', region: 'South', sales: 52000, active: true },
    { id: 3, name: 'Michael Chen', region: 'East', sales: 38000, active: false },
    { id: 4, name: 'Lisa Anderson', region: 'West', sales: 61000, active: true }
  ]);

  const [selectedSalesman, setSelectedSalesman] = useState(null);

  const toggleActive = (id) => {
    setSalesmen(salesmen.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };
};
export default SalesmanSelection;