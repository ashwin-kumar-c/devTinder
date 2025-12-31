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
    const skillsArr = skills.split(",");
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
          skills: skillsArr,
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
        <div className="min-h-screen bg-base-200 px-4 sm:px-6 py-8 sm:py-10">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* LEFT: EDIT PROFILE */}
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body">
                <h2 className="card-title text-xl sm:text-2xl mb-4">
                  Edit Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="form-control">
                    <span className="label-text">First Name</span>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>

                  <label className="form-control">
                    <span className="label-text">Last Name</span>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>

                  <label className="form-control md:col-span-2">
                    <span className="label-text">Photo URL</span>
                    <input
                      type="text"
                      value={photoUrl}
                      className="input input-bordered"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>

                  <label className="form-control">
                    <span className="label-text">Age</span>
                    <input
                      type="number"
                      value={age}
                      className="input input-bordered"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>

                  <label className="form-control">
                    <span className="label-text">Gender</span>
                    <select
                      className="select select-bordered"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label className="form-control md:col-span-2">
                    <span className="label-text">About</span>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>

                  <label className="form-control md:col-span-2">
                    <span className="label-text">Skills (comma separated)</span>
                    <textarea
                      className="textarea textarea-bordered h-20"
                      onChange={(e) => setSkills(e.target.value.split(","))}
                    />
                  </label>
                </div>

                {error && <p className="text-error mt-2">{error}</p>}

                <div className="card-actions justify-end mt-6">
                  <button
                    className="btn btn-primary px-8"
                    onClick={handleProfileEdit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: LIVE PREVIEW */}
            <div className="lg:sticky lg:top-10 h-fit">
              <UserFeedCard
                user={{ firstName, lastName, photoUrl, age, gender, about }}
              />
            </div>
          </div>

          {/* TOAST */}
          {toast && (
            <div className="toast toast-end">
              <div className="alert alert-success shadow-lg">
                <span>Profile updated successfully 🎉</span>
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default EditProfile;
