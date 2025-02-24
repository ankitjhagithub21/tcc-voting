import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import useFetchUser from "./hooks/useFetchUser"
import ProtectedRoute from "./routes/ProtectedRoute"
import NotFound from "./pages/NotFound"
import "./App.css"
import PublicRoute from "./routes/PublicRoute"
import VerifyPage from "./pages/VerifyPage"


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
          <Route path="/verify/:token" element={
          <ProtectedRoute>
            <VerifyPage/>
          </ProtectedRoute>
        }/>
        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
        <Route path="/register" element={
          <PublicRoute>
          <Register/>
        </PublicRoute>
        }/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App