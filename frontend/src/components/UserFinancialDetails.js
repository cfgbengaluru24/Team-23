// frontend/src/components/UserFinancialDetails.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const UserFinancialDetails = ({ user }) => {
    if (!user) return null;

    const { name, current_income, expenditure, savings, loan } = user;

    const formatData = (label, data) => {
        return data.map((value, index) => ({ name: `${label} ${index + 1}`, value: value }));
    };

    return (
        <div>
            <h3>Financial Details for {name}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '23%' }}>
                    <h4>Current Income</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatData('Income', current_income)}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '23%' }}>
                    <h4>Expenditure</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatData('Expenditure', expenditure)}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '23%' }}>
                    <h4>Savings</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatData('Savings', savings)}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ width: '23%' }}>
                    <h4>Loan</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={formatData('Loan', loan)}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#d0ed57" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UserFinancialDetails;
