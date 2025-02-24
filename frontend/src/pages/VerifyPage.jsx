import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setUser } from "../app/appSlice";


const VerifyPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify/${token}`, {
                    credentials: 'include'
                });
                const data = await response.json();
    
                if (response.ok) {
                    setMessage(data.message);
                    dispatch(setUser(data.user))
                    Swal.fire({
                        icon: 'success',
                        title: data.message,
                        confirmButtonColor: '#4F46E5',
                    });
                    
                    
                } else {
                    throw new Error(data.message || "Verification failed.");
                }
            } catch (error) {
                setMessage(error.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message || "Verification failed. Please try again.",
                });
            } finally {
                setLoading(false);
                setTimeout(() => navigate("/"), 3000);
            }
        };
    
        if (token) {
            verifyAccount();
        }
    }, [token, navigate]);
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg text-center">
                {loading ? (
                    <h2 className="text-xl font-semibold text-orange-500">Verifying your account...</h2>
                ) : (
                    <h2 className={`text-xl font-semibold ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default VerifyPage;
