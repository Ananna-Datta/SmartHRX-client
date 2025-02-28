import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for axios with security headers
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth"; // Custom hook for auth

const Worklog = () => {
    const axiosSecure = useAxiosSecure();
    const [task, setTask] = useState("Sales");
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState(""); // Initialize hours state
    const [workLogs, setWorkLogs] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [currentLog, setCurrentLog] = useState(null); // Store current log for editing

    useEffect(() => {
        if (user && user.email) {
            // Set loading state to true while fetching work logs
            setLoading(true);
            axiosSecure.get("/work")
                .then((res) => {
                    setWorkLogs(res.data);
                })
                .finally(() => {
                    setLoading(false); // Turn off loading when done fetching
                });
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete logic here
                axiosSecure.delete(`/work/${id}`).then(() => {
                    setWorkLogs(workLogs.filter((log) => log._id !== id));
                    Swal.fire("Deleted!", "The work log has been deleted.", "success");
                });
            }
        });
    };

    const handleEdit = () => {
        // Send updated work log data to the server for updating
        const updatedLog = { task, date, hoursWorked: hours };
        axiosSecure.put(`/work/${currentLog._id}`, updatedLog)
            .then(() => {
                setWorkLogs(workLogs.map((log) => (log._id === currentLog._id ? { ...log, ...updatedLog } : log)));
                setEditModal(false); // Close the modal
                Swal.fire("Updated!", "The work log has been updated.", "success");
            })
            .catch(() => {
                Swal.fire("Error", "There was an issue updating the work log.", "error");
            });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Employee Work Log</h2>

            {/* Show loading spinner while fetching work logs */}
            {loading ? (
                <div className="text-center my-4">Loading work logs...</div>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Task</th>
                            <th className="border p-2">Hours</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workLogs.map((log) => (
                            <tr key={log._id} className="border">
                                <td className="border p-2">{log?.email}</td>
                                <td className="border p-2">{log.task}</td>
                                <td className="border p-2">{log.hoursWorked}</td>
                                <td className="border p-2">{new Date(log.date).toLocaleDateString()}</td>
                                <td className="border p-2">
                                    <button onClick={() => { setEditModal(true); setCurrentLog(log); setTask(log.task); setDate(new Date(log.date)); setHours(log.hoursWorked); }} className="text-blue-500 p-2">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(log._id)} className="text-red-500 p-2">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit modal */}
            {editModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-2">Edit Work Log</h2>
                        <select value={task} onChange={(e) => setTask(e.target.value)} className="border p-2 w-full">
                            <option>Sales</option>
                            <option>Support</option>
                            <option>Content</option>
                            <option>Paper-work</option>
                        </select>
                        <input
                          type="number"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="border p-2 w-full mt-2"
                          placeholder="Hours Worked"
                          min="0"
                        />
                        <DatePicker selected={date} onChange={(date) => setDate(date)} className="border p-2 w-full mt-2" />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setEditModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleEdit} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Worklog;
