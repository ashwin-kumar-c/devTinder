import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constant";


const Login = () => {
    const [emailId, setEmailId ] = useState("")
    const [password, setPassword ] = useState("")
    const [firstName, setFirstName ] = useState("")
    const [lastName, setLastName ] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const result = await axios.post(`${baseUrl}/login`, {
                emailId,
                password
            }, {
              withCredentials: true
            })
          
            dispatch(addUser(result.data))
            navigate("/")
        }
         catch(err) {
          setError(err?.response?.data)
          console.log(err);
        } 
    }

    const handleSignup = async () => {
      try {
        const res = await axios.post(`${baseUrl}/signup`, {
          firstName, lastName, emailId, password
        }, {
          withCredentials: true
        })
        
        dispatch(addUser(res?.data?.data))
        navigate("/profile")
      } catch(err) {
        setError(err?.response?.data)
        console.log(err);
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body gap-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {/* Signup-only fields */}
          {!isLogin && (
            <>
              <label className="form-control">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          {/* Email */}
          <label className="form-control">
            <span className="label-text">Email</span>
            <input
              type="email"
              value={emailId}
              className="input input-bordered"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          {/* Password */}
          <label className="form-control">
            <span className="label-text">Password</span>
            <input
              type="password"
              value={password}
              className="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Error */}
          {error && <p className="text-error text-sm text-center">{error}</p>}

          {/* Action */}
          <button
            className="btn btn-primary w-full mt-2"
            onClick={isLogin ? handleLogin : handleSignup}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Toggle */}
          <p
            className="text-sm text-center text-primary cursor-pointer hover:underline"
            onClick={() => setIsLogin((v) => !v)}
          >
            {isLogin
              ? "New user? Create an account"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
