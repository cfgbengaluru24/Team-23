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
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        current_income: '',
        expenditure: '',
        savings: '',
        loan: ''
    });

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

    const handleSendSMS = async (user) => {
        try {
            const { phone_number, name, current_income, expenditure, savings, loan } = user;
            const message = `Hello ${name},\n\nHere are your financial details:\n- Last Income: ${current_income.slice(-1)[0]}\n- Last Expenditure: ${expenditure.slice(-1)[0]}\n- Last Savings: ${savings.slice(-1)[0]}\n- Last Loan: ${loan.slice(-1)[0]}`;
            await axios.post('http://localhost:5000/api/users/send-sms', { phoneNumber: phone_number, message });
            alert(`SMS sent to ${phone_number}`);
        } catch (error) {
            console.error('Error sending SMS:', error);
            alert('Failed to send SMS');
        }
    };

    const handleUpdate = (user) => {
        setEditingUser(user);
        setFormData({
            current_income: '',
            expenditure: '',
            savings: '',
            loan: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { current_income, expenditure, savings, loan } = formData;
            console.log('Submitting update with data:', formData);
            const response = await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, {
                current_income: Number(current_income),
                expenditure: Number(expenditure),
                savings: Number(savings),
                loan: Number(loan)
            });
            console.log('Update response:', response.data);
            setUsers(users.map(user => user._id === editingUser._id ? response.data : user));
            setEditingUser(null);
            alert('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update user data');
        }
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
                                <button onClick={(event) => {
                                    event.stopPropagation();
                                    handleSendSMS(user);
                                }}>Send SMS</button>
                                <button onClick={(event) => {
                                    event.stopPropagation();
                                    handleUpdate(user);
                                }}>Update</button>
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
            {editingUser && (
                <div>
                    <h2>Update User Data</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Current Income:
                            <input
                                type="number"
                                name="current_income"
                                value={formData.current_income}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Expenditure:
                            <input
                                type="number"
                                name="expenditure"
                                value={formData.expenditure}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Savings:
                            <input
                                type="number"
                                name="savings"
                                value={formData.savings}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Loan:
                            <input
                                type="number"
                                name="loan"
                                value={formData.loan}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserTable;
