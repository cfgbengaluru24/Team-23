// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Occupation</th>
                        <th>Current Income</th>
                        <th>Expenditure</th>
                        <th>Savings</th>
                        <th>Loans</th>
                        <th>Interests</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.occupation}</td>
                            <td>{user.currentIncome}</td>
                            <td>{user.expenditure}</td>
                            <td>{user.savings}</td>
                            <td>{user.loans}</td>
                            <td>{user.interests.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
