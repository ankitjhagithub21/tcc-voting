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
        <nav className="fixed w-full top-0  z-10">
            <div className="container mx-auto p-3">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div>
                        <img src="./tcclogo.png" alt="tcckasba" width={60} />
                        
                    </div>

                    {/* Navigation Section */}
                    <ul className="flex items-center gap-5">
                     
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
