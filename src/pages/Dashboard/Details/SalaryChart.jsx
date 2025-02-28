import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalaryChart = ({ payrollData }) => {
  // Example of your payrollData format:
  // [{ year: 2022, month: 'January', salary: 3000, bonus: 500 }, { year: 2022, month: 'February', salary: 3200, bonus: 600 }, ...]

  // Prepare the data for Recharts
  const formattedData = payrollData.map((item) => ({
    name: `${item.month} ${item.year}`, // Combining month and year for better labeling
    salary: item.salary,
    bonus: item.bonus,
  }));

  return (
    <div>
      <h3 className="text-xl font-semibold">Salary and Bonus Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={formattedData}>
          {/* Cartesian grid for better visualization */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* X and Y axis */}
          <XAxis dataKey="name" />
          <YAxis />
          
          {/* Tooltip with custom styling */}
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
          
          {/* Legend for understanding chart components */}
          <Legend />

          {/* Line chart for Salary */}
          <Line type="monotone" dataKey="salary" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
          
          {/* Bar chart for Bonus */}
          <Bar dataKey="bonus" barSize={20} fill="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryChart;
