import React from "react";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const EmployeeAttendance = () => {
  // Static mock data for attendance and working hours
  const employees = [
    {
      id: 1,
      name: "John Doe",
      hoursWorkedThisMonth: 160,
      attendance: "Present",
    },
    {
      id: 2,
      name: "Jane Smith",
      hoursWorkedThisMonth: 145,
      attendance: "Late",
    },
    {
      id: 3,
      name: "Michael Brown",
      hoursWorkedThisMonth: 170,
      attendance: "Present",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-center mb-8">Employee Working Hours & Attendance</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{employee.name}</h3>
              <div className="flex items-center space-x-2">
                {employee.attendance === "Present" ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
                <span className="text-lg">{employee.attendance}</span>
              </div>
            </div>

            <div className="mb-4">
              <p>
                <strong>Hours Worked This Month:</strong> {employee.hoursWorkedThisMonth} hours
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Attendance History</h4>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span className="text-sm text-gray-500">Last updated: This month</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
