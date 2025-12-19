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
    <div className="navbar bg-black px-4 py-1 min-h-[48px]">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-lg">
          Dev Tinder
        </Link>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end mx-3">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar btn-sm"
          >
            {user && (
              <div className="w-8 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-48 p-2 shadow"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            {user && (
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
