import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes, FaMoneyBill } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllEmployees = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [payModal, setPayModal] = useState(false);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [isPaying, setIsPaying] = useState(false);

    // Fetch Employees
    const { data: employees = [], refetch, isLoading } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data.filter(person => person.role.toLowerCase() === "employee");
        }
    });

    // Toggle Employee Verification Status
    const toggleVerification = async (employee) => {
        const updatedStatus = !employee.isVerified;
        axiosSecure.patch(`/employees/verify/${employee._id}`, { isVerified: updatedStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `Employee ${updatedStatus ? 'Verified' : 'Unverified'}`,
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
    };

    // Handle Pay Modal Open
    const handlePay = (employee) => {
        setSelectedEmployee(employee);
        setPayModal(true);
    };

    // Confirm Payment
    const confirmPay = async () => {
        if (!selectedEmployee || !month || !year) return;
        setIsPaying(true);

        await axiosSecure.post('/payroll', {
            employeeId: selectedEmployee._id,
            salary: selectedEmployee.salary,
            month,
            year,
            status: "Pending"
        });

        setIsPaying(false);
        setPayModal(false);
        Swal.fire({
            icon: "success",
            title: "Payment Request Sent",
            timer: 1500,
            showConfirmButton: false
        });
    };

    // Define Table Columns
    const columns = [
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        { header: "Bank Account", accessorKey: "bank_ac" },
        { header: "Salary", accessorKey: "salary" },
        {
            header: "Verified",
            accessorKey: "isVerified",
            cell: ({ row }) => (
                <button onClick={() => toggleVerification(row.original)}>
                    {row.original.isVerified ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                </button>
            )
        },
        {
            header: "Pay",
            accessorKey: "pay",
            cell: ({ row }) => (
                <button
                    onClick={() => handlePay(row.original)}
                    className={`btn ${!row.original.isVerified ? 'btn-disabled' : 'btn-success'}`}
                    disabled={!row.original.isVerified}
                >
                    <FaMoneyBill />
                </button>
            )
        }
    ];

    // Initialize Table with TanStack React Table
    const table = useReactTable({
        data: employees,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <h2 className="text-3xl mb-4">Employee Management</h2>
            {isLoading ? (
                <p>Loading employees...</p>
            ) : (
                <table className="table w-full">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th key={column.id}>{flexRender(column.column.columnDef.header, column.getContext())}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pay Modal */}
            {payModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-2">Process Payment</h2>
                        <p>Salary: {selectedEmployee.salary}</p>
                        <input 
                            type="text" 
                            placeholder="Month" 
                            className="input w-full my-2" 
                            value={month} 
                            onChange={(e) => setMonth(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Year" 
                            className="input w-full my-2" 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)} 
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setPayModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={confirmPay} className="btn btn-primary" disabled={isPaying}>
                                {isPaying ? "Processing..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEmployees;
