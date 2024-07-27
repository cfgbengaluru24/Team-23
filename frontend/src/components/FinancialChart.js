import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinancialChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current_income" fill="#8884d8" />
        <Bar dataKey="expenditure" fill="#82ca9d" />
        <Bar dataKey="savings" fill="#ffc658" />
        <Bar dataKey="loan" fill="#d0ed57" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialChart;
