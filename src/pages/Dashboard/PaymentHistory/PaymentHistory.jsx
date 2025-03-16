import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Pagination state
    const [page, setPage] = useState(0);
    const [pageSize] = useState(5); // Number of rows per page

    // Fetch payment data for logged-in employee
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`);
            return res.data;
        },
    });

    // Sort payments by year and month in descending order
    const sortedPayments = payments
        .sort((a, b) => {
            // Convert month name to a number if it is a string
            const monthA = typeof a.month === "string" ? new Date(`${a.month} 1, 2000`).getMonth() + 1 : a.month;
            const monthB = typeof b.month === "string" ? new Date(`${b.month} 1, 2000`).getMonth() + 1 : b.month;

            // First, compare by year in descending order
            if (a.year === b.year) {
                return monthB - monthA; // Then, compare by month in descending order if years are the same
            }
            return b.year - a.year; // Compare by year in descending order
        })
        .slice(page * pageSize, (page + 1) * pageSize); // Slice data for pagination

    // Handle Pagination change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <h2 className="text-3xl">Total Payments: {payments.length}</h2>

            {isLoading ? (
                <div>Loading payments...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Transaction Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPayments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{page * pageSize + index + 1}</td>
                                    <td>{payment.month}</td>
                                    <td>{payment.year}</td>
                                    <td>${payment.salary}</td>
                                    <td>{payment.status}</td>
                                    <td>{payment.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 0}
                            className="btn btn-secondary"
                        >
                            Previous
                        </button>
                        <span>
                            Page {page + 1} of {Math.ceil(payments.length / pageSize)}
                        </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={(page + 1) * pageSize >= payments.length}
                            className="btn btn-secondary"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
