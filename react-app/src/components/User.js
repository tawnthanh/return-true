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
    <div className="profile">
      <div>
        <img id="profile-picture" src={profiles.image_url} />
      </div>
      <div className="profile-details">
        <h1>
          Const {profiles.first_name} = {"{"}
        </h1>
        <ul>
          <div>Expertise(s): {"{"}</div>
          <ul>
            {/* how do i make this part look intented in browser */}
            <div>
              {!!profiles.expertises &&
                Object.values(profiles.expertises).map((expertise) => (
                  <li id="expertise-type">{expertise.type},</li>
                ))}
              {"},"}
            </div>
          </ul>
          <br />
          <div>Level: {profiles.level},</div>
        </ul>
      </div>
    </div>
  );
}

export default User;
