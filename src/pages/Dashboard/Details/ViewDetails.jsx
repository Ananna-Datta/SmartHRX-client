// ViewDetails.js
// import { useParams, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewDetails = () => {
  const { email } = useParams();  // Get the ID from the URL params
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch employee details based on ID
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/details/${email}`);
        const data = await res.json();
        setEmployee(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch details",
          text: "Please try again later.",
        });
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [email]);

  if (isLoading) return <div>Loading...</div>;

  if (!employee) return <div>No employee found.</div>;

  return (
    <div>
      <h2 className="text-3xl mb-4">Employee Details</h2>
      <div className="card">
        <h3>{employee.name}</h3>
        <p>Email: {employee.email}</p>
        <p>Designation: {employee.designation}</p>
        <p>Salary: {employee.salary}</p>
        <img src={employee.photoURL} alt="Employee" className="w-32 h-32 rounded-full" />
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default ViewDetails;
