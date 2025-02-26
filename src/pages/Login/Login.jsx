import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from?.pathname || "/";

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        const { email, password } = data;

        signIn(email, password)
            .then(result => {
                Swal.fire("Success", "User login successful!", "success");
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire("Login Failed", error.message, "error");
            });
    };

    return (
        <>
            <Helmet>
                <title>SmartHRX | Login</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
                <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>
                    <p className="text-center text-gray-500">Sign in to your account</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 w-full p-2 border rounded-lg"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                        </div>

                        {/* Password Field with Toggle */}
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="mt-1 w-full p-2 border rounded-lg pr-10"
                                    {...register("password", { required: "Password is required" })}
                                />
                                <span 
                                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-1 border-t"></div>
                        <span className="px-3 text-gray-500">OR</span>
                        <div className="flex-1 border-t"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <SocialLogin />

                    {/* Register Link */}
                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account? <Link to="/signup" className="text-purple-600 font-semibold">Sign up</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
