import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SalaryChart from './SalaryChart';  // Import the SalaryChart component
import useCart from '../../../hooks/useCart';

const ViewDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [payrollData, setPayrollData] = useState([]);
  
  const [cart] = useCart();
  const salaryDetails = cart.filter(use => use._id === id);
  const email = salaryDetails[0]?.email;
  const salary = salaryDetails[0]?.salary;
  const designation = salaryDetails[0]?.designation;
  const name = salaryDetails[0]?.name;

  // Fetch employee details
  const { data: employee, isLoading, isError } = useQuery({
    queryKey: ['employeeDetails', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/details/${id}`);
      return res.data;  // Assuming the response has payroll data
    },
  });

  useEffect(() => {
    if (employee) {
      // Map over employee data to extract payroll details and store it in state
      const payrollArray = employee.map((payroll) => ({
        year: payroll.year,
        month: payroll.month,
        salary: payroll.salary,
      }));
      setPayrollData(payrollArray);  // Store the mapped data in state
    }
  }, [employee]);

  if (isLoading) return <div className="text-center text-xl font-semibold text-gray-600">Loading...</div>;
  if (isError) return <div className="text-center text-xl font-semibold text-red-600">Error fetching employee details.</div>;

  return (
    <div className="p-6 space-y-8">
      {/* Employee details card */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee Details</h2>
        <div className="space-y-2 text-gray-600">
          <p><span className="font-semibold">Name:</span> {name}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Salary:</span> ${salary}</p>
          <p><span className="font-semibold">Designation:</span> {designation}</p>
        </div>
      </div>

      {/* Payroll History */}
      {employee && payrollData.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Payroll History</h3>
          <div className="space-y-2 text-gray-600">
            {employee.map((payroll, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div className="text-lg font-semibold">{payroll.month} {payroll.year}</div>
                <div className="text-lg">${payroll.salary}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Salary Chart */}
      {payrollData.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Salary Trend Over Time</h3>
          <SalaryChart payrollData={payrollData} />
        </div>
      ) : (
        <div className="text-center text-gray-600">No salary data available</div>
      )}
    </div>
  );
};

export default ViewDetails;
