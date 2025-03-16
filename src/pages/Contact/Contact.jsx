import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [loading, setLoading] = useState(false); // For handling loading state
  const [error, setError] = useState(""); // For displaying errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Correctly accessing form values
    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;

    console.log(email, message);  // This logs the form data for testing

    setLoading(true);
    setError(""); // Clear previous error

    try {
      // Sending data to backend
      await axios.post("https://smart-hrx-server.vercel.app/messages", {
        email,
        message,
      });

      alert("Message sent successfully!");
      // Reset the form
      e.target.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="text-gray-600">We would love to hear from you!</p>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-2 border rounded mb-3"
        />
        <textarea
          placeholder="Your Message"
          name="message"
          required
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
