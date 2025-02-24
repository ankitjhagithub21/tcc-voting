import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import useFetchUser from "./hooks/useFetchUser"
import ProtectedRoute from "./routes/ProtectedRoute"


const App = () => {
  useFetchUser()
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App