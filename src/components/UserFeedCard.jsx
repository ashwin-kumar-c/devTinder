import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../reducers/feedSlice";

const UserFeedCard = ({user}) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about} = user
  const dispatch = useDispatch()

  const handleSendRequest = async (status, id) => {
    const res = await axios.post(`${baseUrl}/request/${status}/${id}`, {}, {
      withCredentials: true
    })

    dispatch(removeUserFromFeed(_id))
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl mx-auto">
      <figure>
        <img
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " "+ lastName}</h2>
        {(age && gender) && <p>{age + ", " + gender} </p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button 
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}>
              Interested
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignored", _id)}>
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
