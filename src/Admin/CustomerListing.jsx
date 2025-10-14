import { useState } from 'react';

function CustomerListing() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC Corp', contact: 'Mike Johnson', email: 'mike@abc.com', phone: '555-0101' },
    { id: 2, name: 'XYZ Inc', contact: 'Sarah Williams', email: 'sarah@xyz.com', phone: '555-0102' },
    { id: 3, name: 'Tech Solutions', contact: 'David Brown', email: 'david@tech.com', phone: '555-0103' }
  ]);
};
export default CustomerListing;