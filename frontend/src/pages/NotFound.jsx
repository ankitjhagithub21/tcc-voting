import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold">404</h1>
                <h2 className="text-4xl font-bold mt-4">Oops! Page Not Found</h2>
                <p className="text-lg mt-2">The page you're looking for doesn't exist or has been moved.</p>

                <Link
                    to="/"
                    className="mt-6 inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-purple-600 hover:text-white transition-all"
                >
                    🔙 Back to Home
                </Link>
            </div>

           
        </div>
    );
};

export default NotFound;
