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
      const res = await axios.post(
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

  if (requests.length === 0) {
    return <p className="justify-center my-10">No Requests Found</p>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-4xl">Requests</h1>
      {requests?.map((request) => {
        const { firstName, lastName, photoUrl, about, age, gender } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="flex m-4 p-4 justify-between items-center rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{`${age} ${gender}`}</p>}
              <p>{about}</p>
            </div>

            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
