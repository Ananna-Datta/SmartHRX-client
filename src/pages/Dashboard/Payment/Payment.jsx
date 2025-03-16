import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Payment = () => {
  const [payrolls, setPayrolls] = useState([]);
  const axiosPublic = useAxiosPublic()

  // Fetch payrolls using React Query
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      const res = await axiosPublic.get("/payroll");
      setPayrolls(res.data);
      return res.data;
    },
  });

  // Handle Payment Processing
  const handlePay = async (payrollId, index) => {
    try {
      const res = await axios.patch(`https://smart-hrx-server.vercel.app/payroll/pay/${payrollId}`);

      if (res.data.message === "Payment successful") {
        // Update UI instantly
        const updatedPayrolls = [...payrolls];
        updatedPayrolls[index] = { ...updatedPayrolls[index], status: "Paid", paymentDate: res.data.paymentDate };
        setPayrolls(updatedPayrolls);

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch(); // Refresh data
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  if (isLoading) return <p>Loading payroll data...</p>;

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-xl font-bold mb-4">Payroll Payment Approval</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Salary</th>
            <th className="border p-2">Month & Year</th>
            <th className="border p-2">Payment Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll, index) => (
            <tr key={payroll._id} className="border">
              <td className="border p-2">{payroll.name}</td>
              <td className="border p-2">${payroll.salary}</td>
              <td className="border p-2">
                {payroll.month} {payroll.year}
              </td>
              <td className="border p-2">
                {payroll.paymentDate ? new Date(payroll.paymentDate).toLocaleDateString() : "Pending"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handlePay(payroll._id, index)}
                  className={`px-4 py-2 rounded ${
                    payroll.status === "Paid" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                  }`}
                  disabled={payroll.status === "Paid"}
                >
                  {payroll.status === "Paid" ? "Paid" : "Pay"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
