import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { setUser } from "../app/appSlice"


const Navbar = () => {
    const {user} = useSelector(state=>state.app)
    const dispatch = useDispatch()
    const handleLogout = async() => {
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
                method:"POST",
                credentials:'include'
            })
            const data = await res.json();
            if(res.ok){
                dispatch(setUser(null))
            }else{
                alert(data.message)
            }

        }catch(error){
            console.log(error)
            alert(error.message)
        }
    }
  return (
    <nav className="bg-gray-300 fixed w-full top-0">
        <div className="container mx-auto p-3">
            <div className="flex items-center justify-between">
                <div>
                    <img src={"./tcclogo.png"} alt="tcckasba" width={60} />
                </div>
                <ul>
                    {
                        user ? <button className="bg-red-600 text-white px-4 py-2  rounded-lg hover:bg-red-700 cursor-pointer" onClick={handleLogout}>Logout</button> : <NavLink to={"/login"}>Login</NavLink>
                    }
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar