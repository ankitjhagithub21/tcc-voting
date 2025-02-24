import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const PublicRoute = ({children}) => {
    const {isLoading,user} = useSelector(state=>state.app)
  

    if(isLoading){
        return children
    }

    if(user){
        return <Navigate to={"/"}/>
    }

    return (
        <>
        {children}
        </>
    )
   

   
  
}

export default PublicRoute