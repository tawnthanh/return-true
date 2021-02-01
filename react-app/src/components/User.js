import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getUser } from "../store/profile";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const profiles = useSelector((state) => state.profile);

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
            <span className="const-color">const</span>{" "}
            <span className="prof-name-color">{profiles.first_name}</span> =
            <span className="brackets-color">{" {"}</span>
          </p>
          <div className="profile-details">
            <ul>
              {profiles.bio && (
                <>
                  <span className="keys-color">bio:</span>{" "}
                  <span className="values-color">
                    "{!!profiles.bio && profiles.bio}"
                  </span>
                  ,
                </>
              )}
              <br />
              <span className="keys-color">level: </span>
              <span className="booleans-color">{profiles.level}</span>,
              <div>
                <span className="keys-color">frequency: </span>
                <span className="values-color">
                  "{!!profiles.frequency && profiles.frequency.type}"
                </span>
                ,
              </div>
              <div>
                <span className="keys-color">introvert: </span>
                {profiles.personality === true && (
                  <span className="booleans-color">
                    {profiles.personality.toString()}
                  </span>
                )}
                {profiles.personality === false && (
                  <span className="booleans-color">
                    {profiles.personality.toString()}
                  </span>
                )}
              </div>
              <div>
                <span className="keys-color">mentor: </span>
                <span className="booleans-color">
                  {profiles.mentorship === true &&
                    profiles.mentorship.toString()}
                  {profiles.mentorship === false &&
                    profiles.mentorship.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="keys-color">inPerson: </span>
                <span className="booleans-color">
                  {profiles.in_person === true && profiles.in_person.toString()}
                </span>
                <span className="booleans-color">
                  {profiles.in_person === false &&
                    profiles.in_person.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="keys-color">morning: </span>
                <span className="booleans-color">
                  {profiles.morning === true && profiles.morning.toString()}
                </span>
                <span className="booleans-color">
                  {profiles.morning === false && profiles.morning.toString()}
                </span>
                ,
              </div>
              <span className="keys-color">languages: </span>
              <span className="brackets-color">{"["}</span>
              <ul className="profile-ul">
                <div>
                  {!!profiles.languages &&
                    Object.values(profiles.languages).map((language) => (
                      <li className="profile-list">
                        <span className="values-color">"{language.type}"</span>,
                      </li>
                    ))}
                </div>
              </ul>
              <span className="brackets-color">{"]"}</span>,
              <br />
              <span className="keys-color">expertises: </span>
              <span className="brackets-color">{"["}</span>
              <ul className="profile-ul">
                <div>
                  {!!profiles.expertises &&
                    Object.values(profiles.expertises).map((expertise) => (
                      <li className="profile-list">
                        <span className="values-color">"{expertise.type}"</span>
                        ,
                      </li>
                    ))}
                </div>
              </ul>
              <span className="brackets-color">{"]"}</span>,
            </ul>
          </div>
        </div>
        <div>
          <p>
            <span className="brackets-color">{"}"}</span>;
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
