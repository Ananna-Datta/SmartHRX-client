import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers, FaDollarSign, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // State for salary editing
    const [editingSalary, setEditingSalary] = useState(null);
    const [newSalary, setNewSalary] = useState("");

    // Function to handle making a user HR
    const handleMakeHR = (user) => {
        axiosSecure.patch(`/users/HR/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an HR!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    // Function to handle deleting a user
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been removed.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    // Handle salary update with optimistic UI update
    const handleUpdateSalary = (user) => {
        if (!newSalary || isNaN(newSalary) || newSalary <= 0) {
            Swal.fire("Error", "Please enter a valid salary amount", "error");
            return;
        }

        // Update the salary optimistically
        const updatedUsers = users.map((u) => {
            if (u._id === user._id) {
                return { ...u, salary: newSalary };  // Immediately update the salary in the UI
            }
            return u;
        });
        refetch(updatedUsers); // Trigger refetch to re-render the updated user list

        // Make PATCH request to update salary
        axiosSecure.patch(`/users/salary/${user._id}`, { salary: newSalary })
            .then((res) => {
                refetch()
                console.log(res);
                Swal.fire("Success", `${user.name}'s salary has been updated!`, "success");
                
                setEditingSalary(null); // Close the salary editing input
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", "Something went wrong. Please try again.", "error");
            });
    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>

            {isLoading ? (
                <p className="text-center text-lg font-semibold">Loading users...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Salary</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center text-lg">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'HR' ? (
                                                "HR"
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeHR(user)}
                                                    className="btn btn-lg bg-[#348BE9]"
                                                >
                                                    <FaUsers className="text-white text-2xl" />
                                                </button>
                                            )}
                                        </td>

                                        <td>
                                            {editingSalary === user._id ? (
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="number"
                                                        value={newSalary}
                                                        onChange={(e) => setNewSalary(e.target.value)}
                                                        className="input input-bordered w-32"
                                                        placeholder="New Salary"
                                                    />
                                                    <button
                                                        onClick={() => handleUpdateSalary(user)}
                                                        className="btn btn-primary"
                                                    >
                                                        <FaDollarSign />
                                                    </button>
                                                </div>
                                            ) : (
                                                `$${user.salary}`
                                            )}
                                        </td>

                                        <td>
                                            {editingSalary === user._id ? (
                                                <button
                                                    onClick={() => setEditingSalary(null)}
                                                    className="btn btn-ghost btn-lg"
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setEditingSalary(user._id)}
                                                    className="btn btn-ghost btn-lg"
                                                >
                                                    <FaEdit></FaEdit>
                                                </button>
                                            )}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="btn btn-ghost btn-lg"
                                            >
                                                <FaTrashAlt className="text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
