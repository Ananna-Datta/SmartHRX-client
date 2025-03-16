import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminMessages = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch messages from the API
    const { data: messages = [], isLoading } = useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const res = await axiosSecure.get("/messages");
            return res.data;
        },
    });

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-3">Employee Messages</h2>
            
            {isLoading ? (
                <p>Loading messages...</p>
            ) : messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((msg, index) => (
                                <tr key={msg._id}>
                                    <td>{index + 1}</td>
                                    <td>{msg.email}</td>
                                    <td>{msg.message}</td>
                                    <td>{new Date(msg.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
