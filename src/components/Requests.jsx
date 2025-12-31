import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../reducers/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequests = async (status, id) => {
    try {
      await axios.post(
        `${baseUrl}/request/review/${status}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  return requests?.length > 0 ? (
    <div className="my-10 px-4 sm:px-6">
      <h1 className="text-center font-bold text-white text-3xl sm:text-4xl mb-8">
        Requests
      </h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, about, age, gender } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="
            mx-auto my-4
            flex flex-col sm:flex-row
            items-start sm:items-center
            gap-4
            w-full max-w-3xl
            rounded-2xl
            bg-base-200
            p-4 sm:p-5
            shadow-md hover:shadow-lg
            transition
          "
          >
            {/* Avatar */}
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="
              h-14 w-14 sm:h-16 sm:w-16
              rounded-full object-cover
              ring ring-primary ring-offset-2 ring-offset-base-200
            "
            />

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-base-content truncate">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-xs sm:text-sm text-base-content/70">
                  {age} · {gender}
                </p>
              )}

              <p className="mt-1 text-sm text-base-content/60 line-clamp-2">
                {about}
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full sm:w-auto gap-2 sm:gap-3 sm:flex-row">
              <button
                className="btn btn-primary btn-outline btn-sm flex-1 sm:flex-none px-6"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>

              <button
                className="btn btn-outline btn-error btn-sm flex-1 sm:flex-none px-6"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-center my-20 text-gray-400 text-lg">No requests found</p>
  );
};

export default Requests;
