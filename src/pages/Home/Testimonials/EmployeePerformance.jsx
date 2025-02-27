import React from "react";
import { FaStar, FaTrophy, FaUserTie } from "react-icons/fa";

const EmployeePerformance = () => {
  // Static mock data
  const employees = [
    {
      id: 1,
      name: "John Doe",
      performanceRating: 4.5,
      projectsCompleted: 15,
      yearsAtCompany: 3,
      achievements: [
        "Exceeded sales target by 30%",
        "Implemented new employee onboarding process",
        "Led successful project X"
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      performanceRating: 4.2,
      projectsCompleted: 10,
      yearsAtCompany: 2,
      achievements: [
        "Developed marketing strategy for product launch",
        "Created employee wellness program"
      ]
    },
    {
      id: 3,
      name: "Michael Brown",
      performanceRating: 4.8,
      projectsCompleted: 20,
      yearsAtCompany: 4,
      achievements: [
        "Implemented automated reporting system",
        "Consistently met quarterly performance goals"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-center mb-8">Employee Performance</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{employee.name}</h3>
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-500" />
                <span className="text-lg">{employee.performanceRating}</span>
              </div>
            </div>

            <div className="mb-4">
              <p>
                <strong>Years at Company:</strong> {employee.yearsAtCompany}
              </p>
              <p>
                <strong>Projects Completed:</strong> {employee.projectsCompleted}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Achievements</h4>
              <ul className="list-disc pl-5">
                {employee.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePerformance;
