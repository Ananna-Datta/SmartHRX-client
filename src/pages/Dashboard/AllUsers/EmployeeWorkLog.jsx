import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Custom hook for axios with security headers
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth"; // Custom hook for auth

const EmployeeWorkLog = () => {
  const axiosSecure = useAxiosSecure();
  const [task, setTask] = useState("Sales");
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState(new Date());
  const [workLogs, setWorkLogs] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const { user } = useAuth();

  // Local loading state for fetching and submitting tasks
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (hours <= 0 || isNaN(hours)) {
      Swal.fire("Error", "Please enter a valid number of hours worked", "error");
      return;
    }

    if (!user || !user.email) {
      Swal.fire("Error", "User is not authenticated or email is missing", "error");
      return;
    }

    const newLog = {
      task,
      hoursWorked: parseInt(hours),
      date,
      email: user.email,
      userId: user._id,
    };

    // Set loading state to true during submission
    setLoading(true);
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we save your work log.',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axiosSecure.post("/work", newLog);

      if (res.data.insertedId) {
        setWorkLogs([res.data, ...workLogs]);
        Swal.fire("Success", "Task added successfully!", "success");
      }
    } catch (error) {
      Swal.fire("Error", "There was an error submitting the task.", "error");
    } finally {
      setLoading(false); // Turn off loading when done submitting
    }
  };

  const handleEdit = async () => {
    const updatedLog = { 
      ...currentLog, 
      task, 
      hoursWorked: parseInt(hours, 10), // Ensure hours is an integer
      date 
    };
  
    try {
      await axiosSecure.put(`/work/${currentLog._id}`, updatedLog);
      
      setWorkLogs(workLogs.map((log) => 
        log._id === currentLog._id ? { ...updatedLog, _id: log._id } : log
      ));
  
      setEditModal(false);
      Swal.fire("Updated", "Task updated successfully!", "success");
    } catch (error) {
      console.error("Error updating work log:", error);
      Swal.fire("Error", "Failed to update work log.", "error");
    }
  };
  

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/work/${id}`);
    setWorkLogs(workLogs.filter((log) => log._id !== id));
    Swal.fire("Deleted", "Task deleted successfully!", "success");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Employee Work Log</h2>

      <div className="flex gap-4 mb-4">
        <select value={task} onChange={(e) => setTask(e.target.value)} className="border p-2">
          <option>Sales</option>
          <option>Support</option>
          <option>Content</option>
          <option>Paper-work</option>
        </select>

        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="border p-2"
          placeholder="Hours Worked"
          min="0"
        />

        <DatePicker selected={date} onChange={(date) => setDate(date)} className="border p-2" />

        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">Add Task</button>
      </div>

      {/* Show loading spinner while fetching work logs */}
      {loading ? (
        <div className="text-center my-4">Loading work logs...</div>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Task</th>
              <th className="border p-2">Hours</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workLogs.map((log) => (
              <tr key={log._id} className="border">
                <td className="border p-2">{log.task}</td>
                <td className="border p-2">{log.hoursWorked}</td>
                <td className="border p-2">{new Date(log.date).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button onClick={() => { setEditModal(true); setCurrentLog(log); }} className="text-blue-500 p-2">
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

export default EmployeeWorkLog;
