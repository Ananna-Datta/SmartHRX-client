import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const result = await createUser(data.email, data.password);
            // const loggedUser = result.user;
            // console.log("User Created:", loggedUser);
            const userInfo = {
                name: data.name,
                email: data.email,
                bank_ac: data.bankAccountNo,
                role: data.role || "Employee",
                salary: data.salary,
                designation: data.designation,
                isVerified:true,
                // photoURL: uploadedImageUrl
            };
            const dbRes = await axiosPublic.post("/users", userInfo);
            if (dbRes.data.insertedId) {
                console.log("User added to the database");
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully!",
                    showConfirmButton: false, 
                    timer: 1500
                });
                navigate("/");
            }
            console.log(result,userInfo,dbRes);
        } catch (error) {
            console.error("Error during sign-up:", error);
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
        }
    };

    return (
        <>
            <Helmet>
                <title>SmartHRX | Register</title>
            </Helmet>
            <div className="flex bg-gray-100">
                <div className="w-1/3 bg-purple-800 flex items-center justify-center text-white text-3xl font-bold">
                    SmartHRX
                </div>
                <div className="w-2/3 flex flex-col items-center justify-center p-8">
                    <h2 className="text-2xl font-semibold mb-2">Register</h2>
                    <p className="text-gray-600 mb-4">Access to our dashboard</p>
                    <div className="w-full max-w-sm">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <input type="text" {...register("name", { required: true })} placeholder="Name" className="w-full p-2 border rounded-md" />
        {errors.name && <span className="text-red-600">Name is required</span>}

        <input type="email" {...register("email", { required: true })} placeholder="Email" className="w-full p-2 border rounded-md" />
        {errors.email && <span className="text-red-600">Email is required</span>}

        <input type="text" {...register("bankAccountNo", { required: true })} placeholder="Bank Account No" className="w-full p-2 border rounded-md" />
        {errors.bankAccountNo && <span className="text-red-600">Bank Account No is required</span>}

        <input type="text" {...register("salary", { required: true })} placeholder="Salary" className="w-full p-2 border rounded-md" />
        {errors.salary && <span className="text-red-600">Salary is required</span>}

        <input type="text" {...register("designation", { required: true })} placeholder="Designation" className="w-full p-2 border rounded-md" />
        {errors.designation && <span className="text-red-600">Designation is required</span>}
        <div>
            {/* <label className="block text-gray-700">Select Role</label> */}
            <select {...register("role", { required: true })} className="w-full p-2 border rounded-md">
                <option value="">Select Role</option>
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
            </select>
            {errors.role && <span className="text-red-600">Role is required</span>}
        </div>

        <input type="password" {...register("password", { required: true })} placeholder="Password" className="w-full p-2 border rounded-md" />
        {errors.password && <span className="text-red-600">Password is required</span>}

        {/* Role Selection */}

        <div className="mt-4">
            <label className="block text-gray-700">Upload Profile Picture</label>
            <input type="file" {...register("image")} className="w-full p-2 border rounded-md" />
        </div>

        <button type="submit" className="w-full bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900">Register</button>
    </form>

    <span className="px-3 text-gray-500">OR</span> 
    <SocialLogin />

    <p className="text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-purple-800 font-semibold">Login</Link>
    </p>
</div>

                </div>
            </div>
        </>
    );
};

export default SignUp;
