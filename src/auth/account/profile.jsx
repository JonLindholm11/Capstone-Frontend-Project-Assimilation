import { useState, useEffect } from 'react';
import { getApiDataForUsersMe } from './api.js';
import DisplayAccount from "./displayUser";
import DisplayCustomer from "./displayCustomer";
import DisplayOrders from "./displayOrders";
import CreateCustomer from './accountSetup.jsx';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  async function loadData() {
    try {
      setLoading(true);
      const data = await getApiDataForUsersMe();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div className="profile-page">
    <h1>My Account</h1>
    <DisplayAccount user={userData.user} />
    
    <div className="customer-section">
      {userData.customer ? (
        <>
          {!isEditingCustomer ? (
            <>
              <DisplayCustomer customer={userData.customer} />
              <button onClick={() => setIsEditingCustomer(true)}>
                Edit Customer Profile
              </button>
            </>
          ) : (
            <>
              <CreateCustomer 
                userData={userData} 
                onSave={async () => {
                  await loadData();
                  setIsEditingCustomer(false);
                }}
              />
              <button onClick={() => setIsEditingCustomer(false)}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <CreateCustomer 
          userData={userData} 
          onSave={async () => {
            await loadData();
          }}
        />
      )}
    </div>
    
    <DisplayOrders orders={userData.orders} />
  </div>
);
}