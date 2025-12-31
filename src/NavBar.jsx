import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "./utils/constant";

const NavBar = () => {
  const user = useSelector(store => store.user)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/logout`, {}, {withCredentials: true})
      navigate("/login")
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div className="navbar bg-black px-3 sm:px-6 min-h-[48px]">

      {/* Brand */}
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-base sm:text-lg"
        >
          Dev Tinder
        </Link>
      </div>

      {/* Avatar */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar btn-sm"
          >
            {user && (
              <div className="w-8 sm:w-9 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-48 p-2 shadow"
          >
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            {user && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
