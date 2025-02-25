import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setUser } from "../app/appSlice";
import Swal from "sweetalert2";
import { useState } from "react";

const Navbar = () => {
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)

    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have successfully logged out!",
                    timer: 2000,
                    showConfirmButton: false
                });
                dispatch(setUser(null));
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Logout Failed",
                    text: data.message
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });
        }
    };

    const handleVerifyAccount = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/send-link`, {
                method: "POST",
                credentials: "include"
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Verification Link Sent",
                    text: "Please check your email for the verification link.",
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to Send Verification Link",
                    text: data.message
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });
        }
        finally{
            setLoading(false)
        }
    };

    return (
        <nav className="fixed w-full top-0 z-10 bg-white shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <NavLink to="/" className="flex items-center gap-2">
                        <img src="./tcclogo.png" alt="TCC Logo" width={50} />
                        <span className="text-xl md:block hidden font-bold text-indigo-600">TCC Kasba</span>
                    </NavLink>

                    {/* Navigation Section */}
                    <ul className="flex items-center gap-4">
                        {!user?.isVerified && user && (
                            <button
                            disabled={loading}
                                onClick={handleVerifyAccount}
                                className="bg-yellow-500 text-white px-3 py-1.5 rounded-md hover:bg-yellow-600 transition"
                            >
                                {
                                    loading ? 'Please wait...' :'Verify Account'
                                }
                            </button>
                        )}

                        {user ? (
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                            >
                                Login
                            </NavLink>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
