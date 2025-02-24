import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser,setIsLoading } from "../app/appSlice";


const useFetchUser = () => {
    const dispatch = useDispatch();

    const getUserFromServer = async () => {
        dispatch(setIsLoading(true))
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/profile`,{
                credentials:'include'
            })
            const data = await res.json();

           if(res.ok){
            dispatch(setUser(data))
           }else{
            dispatch(setUser(null))
           }
        } catch (error) {
            console.log(error)
            setUser(null)
        }finally{
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        getUserFromServer()
    }, [])
}

export default useFetchUser