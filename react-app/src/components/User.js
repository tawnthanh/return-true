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
      <div className="prof-pic">
        {profiles.image_url && (
          <img id="profile-picture" src={profiles.image_url} />
        )}
      </div>
      <div>
        <div>
          <p>
            const {profiles.first_name} = {"{"}
          </p>
          <div className="profile-details">
            <ul>
              {profiles.bio && <p>bio: "{!!profiles.bio && profiles.bio}",</p>}

              <p>level: {profiles.level},</p>
              <div>
                frequency: "{!!profiles.frequency && profiles.frequency.type}",
              </div>
              <br />
              <div>
                {profiles.personality !== undefined &&
                  `personalityType: ${
                    profiles.personality ? "introvert" : "extrovert"
                  },`}
              </div>
              <br />
              <div>
                mentor:{" "}
                {profiles.mentorship === true && profiles.mentorship.toString()}
                {profiles.mentorship === false &&
                  profiles.mentorship.toString()}
                ,
              </div>
              <br />
              <div>
                inPerson:{" "}
                {profiles.in_person === true && profiles.in_person.toString()}
                {profiles.in_person === false && profiles.in_person.toString()},
              </div>
              <br />
              <div>
                morning:{" "}
                {profiles.morning === true && profiles.morning.toString()}
                {profiles.morning === false && profiles.morning.toString()},
              </div>
              <p>languages: {"["}</p>
              <ul className="profile-ul">
                <div>
                  {!!profiles.languages &&
                    Object.values(profiles.languages).map((language) => (
                      <li className="profile-list">{language.type},</li>
                    ))}
                </div>
              </ul>
              {"],"}
              <p>expertises: {"["}</p>
              <ul className="profile-ul">
                <div>
                  {!!profiles.expertises &&
                    Object.values(profiles.expertises).map((expertise) => (
                      <li className="profile-list">{expertise.type},</li>
                    ))}
                </div>
              </ul>
              {"],"}
            </ul>
          </div>
        </div>
        <div>
          <p>{"};"}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
