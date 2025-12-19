import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../reducers/feedSlice";

const UserFeedCard = ({user}) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about} = user
  const dispatch = useDispatch()

  const handleSendRequest = async (status, id) => {
    await axios.post(`${baseUrl}/request/${status}/${id}`, {}, {
      withCredentials: true
    })

    dispatch(removeUserFromFeed(_id))
  }

  return (
    <div className="min-h-screen flex justify-center bg-base-200 pt-10">
      <div className="card w-80 shadow-xl transition-all duration-300 hover:scale-[1.02]">
        {/* IMAGE */}
        <figure className="h-56 overflow-hidden rounded-t-2xl bg-base-600">
          <img
            src={photoUrl || "https://via.placeholder.com/400"}
            alt="User profile"
            className="h-full w-full object-cover"
          />
        </figure>

        {/* BODY */}
        <div className="card-body bg-slate-800 text-slate-100 rounded-b-2xl p-4 gap-2 flex-none">
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p className="text-xs opacity-70">
              {age} • {gender}
            </p>
          )}

          <p className="text-xs leading-relaxed opacity-80 line-clamp-3">
            {about}
          </p>

          {/* ACTIONS */}
          <div className="card-actions justify-center gap-3 mt-3">
            <button
              className="btn btn-primary btn-xs px-5 rounded-full"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>

            <button
              className="btn btn-outline btn-secondary btn-xs px-5 rounded-full"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
