import { useState } from "react"
import { setUser } from "../app/appSlice"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const myStyle = { backgroundImage: "url(./bg.jpg)", backgroundPosition: "center", backgroundSize: "cover" }
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json();
      if (res.status === 201) {
        dispatch(setUser(data.user))
        navigate("/")
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center min-h-screen p-4 w-full justify-center " style={myStyle}>
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md w-full">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div>
            <img src="./tcclogo.png" alt="tcc_logo" className="mx-auto" width={70} />
          </div>
         <h2 className="text-3xl font-bold text-center mt-2">TCC VOTING APP</h2>
       
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Already have an account?</span>
            <Link to="/login" className="underline">
              Login Here
            </Link>
          </p>
         
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Create account
          </h3>

          {
            error && <p className="text-red-500 mb-2 text-sm">{error}</p>
          }
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="w-full px-4 py-2 cursor-pointer text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                {
                  loading ? 'Please wait...' : 'Register'
                }
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>

  )
}

export default Register