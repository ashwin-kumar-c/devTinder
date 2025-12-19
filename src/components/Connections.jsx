import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../reducers/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0) {
    return <p className="flex justify-center my-10">No Connections Found</p>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-4xl">Connections</h1>
      {connections?.map((connection) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender } =
          connection;
        return (
          <div
            key={_id}
            className="w-[45%] mx-auto my-4 p-4
             flex items-center gap-4
             rounded-xl bg-gradient-to-r from-gray-900 to-gray-800
             border border-gray-700 shadow-md hover:shadow-lg
             transition-all duration-200"
          >
            {/* Left section (takes remaining space) */}
            <div className="flex items-center gap-4 flex-1">
              <img
                src={photoUrl}
                alt="profile"
                className="h-16 w-16 rounded-full object-cover ring ring-primary ring-offset-2 ring-offset-base-200"
              />

              <div className="text-left min-w-0">
                <h2 className="text-lg font-semibold text-white truncate">
                  {`${firstName} ${lastName}`}
                </h2>

                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age} • {gender}
                  </p>
                )}

                <p className="text-sm text-gray-300 mt-1 truncate">{about}</p>
              </div>
            </div>

            {/* Right section */}
            <Link to={`/chat/${_id}`} className="shrink-0">
              <button
                className="btn btn-primary btn-outline btn-sm px-6"
              >
                Chat
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
