import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

const Adhome = () => {
  const { user } = useAuth();
  const [cart] = useCart();

  // Filter to find the user's salary details in the cart
  const salaryDetails = cart.find(item => item._id === user.id);
  
  // Destructure the details if available, fallback to default values
  const { email, salary, designation, name } = salaryDetails || {};

  console.log(name, salary); // For debugging purposes

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1> {/* Display the user's name */}
      {salaryDetails ? (
        <>
          <h2>Name: {name}</h2>
          <h2>Email: {email}</h2>
          <h2>Salary: {salary}</h2>
          <h2>Designation: {designation}</h2>
        </>
      ) : (
        <p>No salary details found for this user.</p>
      )}
    </div>
  );
};

export default Adhome;
