import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setUser } from "../app/appSlice";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();

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
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });
        }
    };

    return (
        <nav className="fixed w-full top-0 bg-white shadow-lg z-10">
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div>
                        <img src="./tcclogo.png" alt="tcckasba" width={50} />
                        
                    </div>

                    {/* Navigation Section */}
                    <ul className="flex items-center gap-5">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-indigo-600 font-semibold"
                                    : "text-gray-600 hover:text-indigo-500 transition"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-indigo-600 font-semibold"
                                    : "text-gray-600 hover:text-indigo-500 transition"
                            }
                        >
                            About
                        </NavLink>
                        {user ? (
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
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
