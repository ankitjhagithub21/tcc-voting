import { useState } from "react";
import { setUser } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (res.ok) {
                dispatch(setUser(data.user));
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonColor: '#4F46E5',
                });
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-400 p-4">
            <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden md:flex-row md:max-w-3xl w-full">
                {/* Left Side */}
                <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-500 text-white md:w-1/2 flex flex-col justify-between">
                    <div className="text-center">
                        <img src="./tcclogo.png" alt="TCC Logo" className="mx-auto" width={80} />
                        <h2 className="text-3xl font-extrabold mt-4">TCC VOTING APP</h2>
                    </div>
                    <p className="text-center mt-10">
                        Don't have an account?{" "}
                        <Link to="/register" className="underline hover:text-cyan-300">
                            Create here!
                        </Link>
                    </p>
                </div>

                {/* Right Side */}
                <div className="p-8 md:w-2/3">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-6">Account Login</h3>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                            <Link to="#" className="text-sm text-indigo-600 hover:underline mt-2 inline-block">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition"
                        >
                            {loading ? 'Please wait...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
