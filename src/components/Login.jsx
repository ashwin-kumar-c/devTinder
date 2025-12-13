import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constant";


const Login = () => {
    const [emailId, setEmailId ] = useState("ashwin@gmail.com")
    const [password, setPassword ] = useState("Ash@12345#")
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
          setError(err.response.data)
            console.log(err);
        } 
    }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

        <div>
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
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
