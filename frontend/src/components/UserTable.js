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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>User Data</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Occupation</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} onClick={() => handleRowClick(user)}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.occupation}</td>
                            <td>{user.phone_number}</td>
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
