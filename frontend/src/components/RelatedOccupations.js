import React, { useState, useEffect } from 'react';
import axios from 'axios';
import occupationMappings from '../occupationMappings';

const RelatedOccupations = ({ occupation }) => {
    const [relatedUsers, setRelatedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRelatedUsers = async () => {
            try {
                const relatedOccupations = occupationMappings[occupation] || [];
                const relatedUsersData = await Promise.all(
                    relatedOccupations.map(async (relatedOccupation) => {
                        const response = await axios.get(`http://localhost:5000/api/users/occupation/${relatedOccupation}`);
                        return response.data;
                    })
                );
                setRelatedUsers(relatedUsersData.flat());
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchRelatedUsers();
    }, [occupation]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h3>Related Occupations for {occupation}</h3>
            {relatedUsers.length === 0 ? (
                <p>No related users found.</p>
            ) : (
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
                        {relatedUsers.map(user => (
                            <tr key={user._id}>
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
            )}
        </div>
    );
};

export default RelatedOccupations;
