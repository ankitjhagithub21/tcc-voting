import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setVotes } from '../app/appSlice';
import Navbar from '../components/Navbar';

const Home = () => {
    const { user, votes } = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/votes/results`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => dispatch(setVotes(data)));
    }, []);

    const vote = async (team) => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/votes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ team }),
        });

        const data = await res.json();
        if (res.status === 400) {
            alert(data.message);
        } else {
            dispatch(setUser({
                ...user,
                isVoted: true
            }));
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-6">
                <div className="max-w-4xl w-full">
                    {user?.isVoted ? (
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
                            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
                                🎉 Thank You, {user?.name}!
                            </h2>
                            <p className="text-lg text-gray-600">You have already voted. Here are the current results:</p>
                            <div className="flex justify-center gap-5 flex-wrap mt-6">
                                <div className="p-4 bg-blue-100 rounded-lg md:w-fit w-full">
                                    <h3 className="text-2xl font-semibold mb-2 text-blue-700">🏆 Team A</h3>
                                    <p className="text-xl">{votes?.TeamA || 0} Votes</p>
                                </div>
                                <div className="p-4 bg-pink-100 rounded-lg w-full md:w-fit">
                                    <h3 className="text-2xl font-semibold mb-2  text-pink-700">🚀 Team B</h3>
                                    <p className="text-xl">{votes?.TeamB || 0} Votes</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
                            <h1 className="text-5xl font-extrabold text-gray-800 mb-6">🏅 Vote for Your Team!</h1>
                            <p className="text-lg text-gray-600 mb-8">Make your choice and support your favorite team.</p>
                            <div className="flex items-center  gap-6 justify-center">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition-all transform hover:scale-105"
                                    onClick={() => vote('TeamA')}
                                >
                                    🏆 Vote Team A
                                </button>
                                <button
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-lg transition-all transform hover:scale-105"
                                    onClick={() => vote('TeamB')}
                                >
                                    🚀 Vote Team B
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Home;
