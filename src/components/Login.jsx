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
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin ? "Login": "Signup"}</h2>

        <div>
          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                    value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                    value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
                value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
                value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-5">
            <button 
              className="btn btn-primary"
              onClick={ isLogin? handleLogin : handleSignup}>
                {isLogin ? "Login": "Signup"}
            </button>
          </div>

          </div>
      <p 
        className="m-auto text-bold cursor-pointer"
        onClick={() => setIsLogin(value => !value)}>
        {isLogin ? "New User? Signup here" : "Existing User? Login here"}
      </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
