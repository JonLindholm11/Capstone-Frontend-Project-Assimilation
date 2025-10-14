import SpecialPricing from './SpecialPricing';
import CustomerListing from './CustomerListing';
import RoleSelection from './RoleSelection';
import SalesmanSelection from './SalesmanSelection';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <RoleSelection />
      <SalesmanSelection />
      <CustomerListing />
      <SpecialPricing />
    </div>
  );
}
