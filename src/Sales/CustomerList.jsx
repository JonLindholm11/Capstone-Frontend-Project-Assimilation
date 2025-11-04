import CustomerCard from "./CustomerCard";

export default function CustomerList({ customers, onSavePricing }) {
  if (!customers || customers.length === 0) {
    return (
      <section className="customer-section">
        <h2 className="section-title">Client Management</h2>
        <p>No customers assigned to you yet.</p>
      </section>
    );
  }

  return (
    <section className="customer-section">
      <h2 className="section-title">Client Management</h2>
      <p className="section-description">
        Manage your assigned customers and update their pricing categories.
      </p>

      <div className="customer-list">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.user_id}
            customer={customer}
            onSave={onSavePricing}
          />
        ))}
      </div>
    </section>
  );
}