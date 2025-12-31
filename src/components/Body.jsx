import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../NavBar"
import Footer from "./Footer"
import axios from "axios"
import { baseUrl } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../reducers/userSlice"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${baseUrl}/profile/view`, {withCredentials: true})
            dispatch(addUser(res.data))
        } catch(err) {
            if(err?.status === 401) {
                navigate("/login")
            }
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser() 
    }, [])

    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />

        {/* Main content */}
        <main className="flex-1 px-2 sm:px-4 md:px-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
}

export default Body