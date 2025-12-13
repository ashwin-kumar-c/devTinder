import { useState } from "react";
import UserFeedCard from "./UserFeedCard";
import { baseUrl } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../reducers/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills.join(","));
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const handleProfileEdit = async () => {
    const skillsArr = skills.split(",")
    try {
      const res = await axios.patch(
        `${baseUrl}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills: skillsArr
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
        setError(err?.response?.data);
        console.log(err);
    }
  };

  return (
    user && (
      <>
        <div className="flex justify-center mx-10">
          <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Edit Profile</h2>

                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Photo Url</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Age</span>
                    </div>
                    <input
                      type="number"
                      value={age}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">gender</span>
                    </div>
                    <input
                      type="text"
                      value={gender}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">About</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </label>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Skills</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      value={skills}
                      onChange={(e) => {
                        const val = setSkills(e.target.value);
                        setSkills(val.split(","));
                      }}
                    ></textarea>
                  </label>

                  <p className="text-red-500">{error}</p>
                  <div className="card-actions justify-end my-5">
                    <button
                      className="btn btn-primary"
                      onClick={handleProfileEdit}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 ml-10">
            <UserFeedCard
              user={{ firstName, lastName, photoUrl, age, gender, about }}
            />
          </div>
        </div>
        <div className="toast toast-end toast-middle">
          {toast && (
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default EditProfile;
