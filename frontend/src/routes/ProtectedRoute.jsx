import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"


const ProtectedRoute = ({children}) => {
    const {isLoading,user} = useSelector(state=>state.app)
    if(isLoading){
        return <Loading/>
    }

    if(!user){
        return <Navigate to={"/login"}/>
    }

  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRoute