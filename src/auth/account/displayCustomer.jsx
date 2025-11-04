export default function DisplayCustomer({ customer }) {
  if (!customer) {
    return <div>No customer information available</div>;
  }

  return (
    <div className="customer-info">
      <h2>Customer Information</h2>
      {customer.company_name && (
        <div>
          <strong>Company:</strong> {customer.company_name}
        </div>
      )}
      {customer.contact_name && (
        <div>
          <strong>Name:</strong> {customer.contact_name}
        </div>
      )}
      {!customer.company_name && !customer.contact_name && (
        <div>No customer details provided yet</div>
      )}
    </div>
  );
}