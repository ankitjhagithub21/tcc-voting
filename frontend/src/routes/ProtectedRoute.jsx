import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}) => {
    const {isLoading,user} = useSelector(state=>state.app)
    if(isLoading){
        return <p>Loading...</p>
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