import { useState } from "react";
import { setUser } from "../app/appSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(setUser(data.user));
        Swal.fire({ icon: "success", title: data.message, confirmButtonText: "Ok" });
        navigate("/");
      } else {
        setError(data.message || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 w-full justify-center bg-gray-100">
      <div className="flex flex-col bg-white rounded-lg shadow-lg max-w-4xl w-full md:flex-row overflow-hidden">
        <div className="p-6 bg-blue-500 text-white md:w-1/2 flex flex-col justify-center items-center">
          <img src="./tcclogo.png" alt="TCC Logo" className="w-16 mb-4" />
          <h2 className="text-3xl font-bold">TCC VOTING APP</h2>
          <p className="mt-4">Already have an account?</p>
          <Link to="/login" className="underline hover:text-blue-200">Login Here</Link>
        </div>

        <div className="p-6 md:w-1/2">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Create Account</h3>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {loading ? "Please wait..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
