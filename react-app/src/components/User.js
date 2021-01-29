import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getUser } from "../store/profile";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const profiles = useSelector((state) => state.profile);
  console.log(profiles);

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getUser(userId));
    dispatch(getProfile(userId));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <ul>
        <li>
          <strong>User</strong> {profiles.first_name}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <div>
        <img className="profile-pictures" src={profiles.image_url} />
        <p>{profiles.bio}</p>
        <p>{profiles.expertises}</p>
        {/* <p>{profiles.frequency}</p> */}
        <p>{profiles.in_person}</p>
        {/* <p>{profiles.languages}</p> */}
      </div>
    </div>
  );
}
export default User;
