import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setVotes } from '../app/appSlice';
import Navbar from '../components/Navbar';

const Home = () => {
    const { user, votes } = useSelector(state => state.app)

    const dispatch = useDispatch()

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
            }))
            
        }
    };

    return (
        <>
            <Navbar />

            <main className='min-h-screen w-full flex items-center justify-center text-center'>
                {
                    user?.isVoted ? <div className='my-10'>

                        <h2 className='text-3xl font-bold'>Welcome {user?.name} You are already voted.</h2>
                        <p>Team A: {votes?.TeamA}</p>
                        <p>Team B: {votes?.TeamB}</p>
                    </div> : <div>
                        <h1>Vote for Your Team</h1>
                        <button onClick={() => vote('TeamA')}>Vote Team A</button>
                        <button onClick={() => vote('TeamB')}>Vote Team B</button>
                    </div>
                }
            </main>
        </>
    );
};

export default Home