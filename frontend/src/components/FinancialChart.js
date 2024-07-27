// frontend/src/components/FinancialChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinancialChart = () => {
  const chartData = [
    { name: 'Zyra', current_income: 60000, expenditure: 5600, savings: 7800, loan: 5600 },
    { name: 'Alice', current_income: 50000, expenditure: 30000, savings: 15000, loan: 5000 },
    { name: 'Betty', current_income: 45000, expenditure: 25000, savings: 12000, loan: 7000 },
    { name: 'Clara', current_income: 70000, expenditure: 20000, savings: 25000, loan: 10000 },
    { name: 'Diana', current_income: 65000, expenditure: 30000, savings: 20000, loan: 15000 },
    { name: 'Eva', current_income: 80000, expenditure: 35000, savings: 30000, loan: 20000 },
    { name: 'Fiona', current_income: 75000, expenditure: 32000, savings: 28000, loan: 18000 },
    { name: 'Gina', current_income: 55000, expenditure: 22000, savings: 15000, loan: 12000 },
    { name: 'Hannah', current_income: 90000, expenditure: 40000, savings: 35000, loan: 25000 },
    { name: 'Ivy', current_income: 85000, expenditure: 37000, savings: 33000, loan: 23000 }
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
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
