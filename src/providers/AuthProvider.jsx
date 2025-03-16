import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message); // Handle errors
            Swal.fire({
                icon: 'error',
                title: 'Sign-Up Failed',
                text: err.message,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#FF5733',
            });
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Sign-In Failed',
                text: err.message,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#FF5733',
            });
        } finally {
            setLoading(false);
        }
    };

    const googleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
            };
            // Optionally, you can store user information in your database if needed
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => setError(err.message));
        } catch (err) {
            setError(err.message); // Handle errors
            Swal.fire({
                icon: 'error',
                title: 'Sign-In Failed',
                text: err.message,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#FF5733',
            });
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'You have successfully logged out!',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#4CAF50',
            });
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Logout Failed',
                text: `Error: ${err.message}`,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#FF5733',
            });
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name, photo) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name, photoURL: photo
            });
        } catch (err) {
            setError(err.message); // Handle errors
            Swal.fire({
                icon: 'error',
                title: 'Profile Update Failed',
                text: err.message,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#FF5733',
            });
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser); // Firebase manages user state automatically
            setLoading(false); // Stop loading once user state is updated
        });

        return () => unsubscribe(); // Clean up the observer on unmount
    }, []);

    const authInfo = {
        user,
        loading,
        error,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
