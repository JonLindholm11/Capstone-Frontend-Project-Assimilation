import { useState } from "react";
import { postApiDataForCustomers, putApiDataForCustomers } from "./api";

export default function CreateCustomer({ userData, onSave }) {
    const [customerData, setCustomerData] = useState({
        company_name: userData?.customer?.company_name || '',
        contact_name: userData?.customer?.contact_name || ''
    })
    const [customerId] = useState(userData?.customer?.id || null)
    const [error, setError] = useState('')
    const [newUser] = useState(!userData?.customer)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            if(newUser) {
                await postApiDataForCustomers(customerData);
            } else {
                await putApiDataForCustomers(customerId, customerData);
            }
            if (onSave) onSave();
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div>
            <div>
                {newUser && (
                    <div>
                        <h2>Welcome</h2>
                        <p>Please set up your account</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label>
                        Company Name
                        <input 
                            type="text" 
                            name="company_name" 
                            value={customerData.company_name}
                            onChange={handleChanges}
                        />
                    </label>
                    <label>
                        Name
                        <input 
                            type="text" 
                            name="contact_name" 
                            value={customerData.contact_name}
                            onChange={handleChanges}
                        />
                    </label>

                    <button type="submit">Save</button>
                    {error && <output>{error}</output>}
                </form>
            </div>
        </div>
    )
}