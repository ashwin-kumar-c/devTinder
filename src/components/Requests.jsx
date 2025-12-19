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
      <div className="text-center my-10">
        <h1 className="text-bold text-white text-4xl">Requests</h1>
        {requests?.map((request) => {
          const { firstName, lastName, photoUrl, about, age, gender } =
            request.fromUserId;
          return (
            <div
              key={request._id}
              className="mx-auto my-4 flex w-11/12 max-w-3xl items-center justify-between gap-4 rounded-2xl 
              bg-base-200 p-5 shadow-md transition hover:shadow-lg"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="h-16 w-16 rounded-full object-cover ring ring-primary ring-offset-2 ring-offset-base-200"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-base-content">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <p className="text-sm text-base-content/70">
                    {age} · {gender}
                  </p>
                )}

                <p className="mt-1 text-sm text-base-content/60 line-clamp-2">
                  {about}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  className="btn btn-primary btn-outline btn-sm px-6"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  Accept
                </button>

                <button
                  className="btn btn-outline btn-error btn-sm px-6"
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
      <h1 className="flex justify-center my-10">No Requests Found</h1>
    );
};

export default Requests;
