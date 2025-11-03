import { useState, useEffect } from 'react';
import { getApiDataForUsersMe } from './api.js';
import DisplayAccount from "./displayUser";
import DisplayCustomer from "./displayCustomer";
import DisplayOrders from "./displayOrders";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getApiDataForUsersMe();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <h1>My Account</h1>
      <DisplayAccount user={userData.user} />
      <DisplayCustomer customer={userData.customer} />
      <DisplayOrders orders={userData.orders} />
    </div>
  );
}