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
            <span className="const">const</span>{" "}
            <span className="prof-name">{profiles.first_name}</span> =
            <span className="brackets">{" {"}</span>
          </p>
          <div className="profile-details">
            <ul>
              {profiles.bio && (
                <>
                  <span className="keys">bio:</span>{" "}
                  <span className="values">
                    "{!!profiles.bio && profiles.bio}"
                  </span>
                  ,
                </>
              )}
              <br />
              <span className="keys">level: </span>
              <span className="booleans">{profiles.level}</span>,
              <div>
                <span className="keys">frequency: </span>
                <span className="values">
                  "{!!profiles.frequency && profiles.frequency.type}"
                </span>
                ,
              </div>
              <div>
                <span className="keys">introvert: </span>
                {profiles.personality === true && (
                  <span className="booleans">
                    {profiles.personality.toString()}
                  </span>
                )}
                {profiles.personality === false && (
                  <span className="booleans">
                    {profiles.personality.toString()}
                  </span>
                )}
              </div>
              <div>
                <span className="keys">mentor: </span>
                <span className="booleans">
                  {profiles.mentorship === true &&
                    profiles.mentorship.toString()}
                  {profiles.mentorship === false &&
                    profiles.mentorship.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="keys">inPerson: </span>
                <span className="booleans">
                  {profiles.in_person === true && profiles.in_person.toString()}
                </span>
                <span className="booleans">
                  {profiles.in_person === false &&
                    profiles.in_person.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="keys">morning: </span>
                <span className="booleans">
                  {profiles.morning === true && profiles.morning.toString()}
                </span>
                <span className="booleans">
                  {profiles.morning === false && profiles.morning.toString()}
                </span>
                ,
              </div>
              <span className="keys">languages: </span>
              <span className="brackets">{"["}</span>
              <ul className="profile-ul">
                <div>
                  {!!profiles.languages &&
                    Object.values(profiles.languages).map((language) => (
                      <li className="profile-list">
                        <span className="values">"{language.type}"</span>,
                      </li>
                    ))}
                </div>
              </ul>
              <span className="brackets">{"]"}</span>,
              <br />
              <span className="keys">expertises: </span>
              <span className="brackets">{"["}</span>
              <ul className="profile-ul">
                <div>
                  {!!profiles.expertises &&
                    Object.values(profiles.expertises).map((expertise) => (
                      <li className="profile-list">
                        <span className="values">"{expertise.type}"</span>,
                      </li>
                    ))}
                </div>
              </ul>
              <span className="brackets">{"]"}</span>,
            </ul>
          </div>
        </div>
        <div>
          <p>
            <span className="brackets">{"}"}</span>;
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
