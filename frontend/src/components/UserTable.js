// frontend/src/components/UserTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedOccupations from './RelatedOccupations';
import UserFinancialDetails from './UserFinancialDetails';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOccupation, setSelectedOccupation] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data.collection);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRowClick = (user) => {
        setSelectedOccupation(user.occupation);
        setSelectedUser(user);
    };

    const handleSendSMS = (phoneNumber) => {
        // Implement the logic to send an SMS here
        alert(`SMS sent to ${phoneNumber}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>User Data</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Occupation</th>
                        <th>Last Income</th>
                        <th>Last Expenditure</th>
                        <th>Last Savings</th>
                        <th>Last Loan</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} onClick={() => handleRowClick(user)}>
                            <td>{user.name}</td>
                            <td>{user.occupation}</td>
                            <td>{user.current_income.slice(-1)[0]}</td>
                            <td>{user.expenditure.slice(-1)[0]}</td>
                            <td>{user.savings.slice(-1)[0]}</td>
                            <td>{user.loan.slice(-1)[0]}</td>
                            <td>
                                <button onClick={() => handleSendSMS(user.phone_number)}>Send SMS</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedOccupation && (
                <RelatedOccupations occupation={selectedOccupation} />
            )}
            {selectedUser && (
                <UserFinancialDetails user={selectedUser} />
            )}
        </div>
    );
};

export default UserTable;
