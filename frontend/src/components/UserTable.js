import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedOccupations from './RelatedOccupations';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOccupation, setSelectedOccupation] = useState(null);

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

    const handleRowClick = (occupation) => {
        setSelectedOccupation(occupation);
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
                        <th>Current Income</th>
                        <th>Expenditure</th>
                        <th>Savings</th>
                        <th>Loan</th>
                        <th>Interest</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} onClick={() => handleRowClick(user.occupation)}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.occupation}</td>
                            <td>{user.current_income}</td>
                            <td>{user.expenditure}</td>
                            <td>{user.savings}</td>
                            <td>{user.loan}</td>
                            <td>{user.interest}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedOccupation && (
                <RelatedOccupations occupation={selectedOccupation} />
            )}
        </div>
    );
};

export default UserTable;
