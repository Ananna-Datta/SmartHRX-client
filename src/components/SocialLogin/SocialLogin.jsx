import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            // Initiating Google Sign In
            const result = await googleSignIn();

            // Check if result is available and user data is present
            if (result?.user) {
                console.log(result.user);

                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };

                // Send user info to your API
                await axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        console.log(res.data);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User created successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        // Redirect to home page after successful login
                        navigate('/');
                    })
                    .catch((err) => {
                        console.error("Error creating user:", err);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to create user. Please try again.",
                            confirmButtonText: "Okay"
                        });
                    });
            }
        } catch (err) {
            console.error("Google Sign In Error:", err);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.message,
                confirmButtonText: "Okay"
            });
        }
    };

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2" />
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
