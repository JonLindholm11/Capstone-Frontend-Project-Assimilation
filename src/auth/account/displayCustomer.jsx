export default function DisplayCustomer({ customer }) {
  console.log('DisplayCustomer received:', customer);
  
  if (!customer) {
    return <div>No customer information available</div>;
  }
  
  return (
    <div className="customer-info">
      <h2>Customer Information</h2>
      {customer.company_name && (
        <p><strong>Company:</strong> {customer.company_name}</p>
      )}
      {customer.contact_name && (
        <p><strong>Contact:</strong> {customer.contact_name}</p>
      )}
      {customer.email && (
        <p><strong>Email:</strong> {customer.email}</p>
      )}
    </div>
  );
}