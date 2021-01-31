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
            <span className="purple">const</span>{" "}
            <span className="blue">{profiles.first_name}</span> =
            <span className="yellow">{" {"}</span>
          </p>
          <div className="profile-details">
            <ul>
              {profiles.bio && (
                <>
                  <span className="red">bio:</span>{" "}
                  <span className="green">
                    "{!!profiles.bio && profiles.bio}"
                  </span>
                  ,
                </>
              )}
              <br />
              <span className="red">level: </span>
              <span className="orange">{profiles.level}</span>,
              <div>
                <span className="red">frequency: </span>
                <span className="green">
                  "{!!profiles.frequency && profiles.frequency.type}"
                </span>
                ,
              </div>
              <div>
                <span className="red">introvert: </span>
                {profiles.personality == true && (
                  <span className="orange">
                    {profiles.personality.toString()}
                  </span>
                )}
                {profiles.personality == false && (
                  <span className="orange">
                    {profiles.personality.toString()}
                  </span>
                )}
              </div>
              <div>
                <span className="red">mentor: </span>
                <span className="orange">
                  {profiles.mentorship === true &&
                    profiles.mentorship.toString()}
                  {profiles.mentorship === false &&
                    profiles.mentorship.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="red">inPerson: </span>
                <span className="orange">
                  {profiles.in_person === true && profiles.in_person.toString()}
                </span>
                <span className="orange">
                  {profiles.in_person === false &&
                    profiles.in_person.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="red">morning: </span>
                <span className="orange">
                  {profiles.morning === true && profiles.morning.toString()}
                </span>
                <span className="orange">
                  {profiles.morning === false && profiles.morning.toString()}
                </span>
                ,
              </div>
              <span className="red">languages: </span>
              <span className="yellow">{"["}</span>
              <ul className="profile-ul">
                <div>
                  {!!profiles.languages &&
                    Object.values(profiles.languages).map((language) => (
                      <li className="profile-list">
                        <span className="green">"{language.type}"</span>,
                      </li>
                    ))}
                </div>
              </ul>
              <span className="yellow">{"]"}</span>,
              <br />
              <span className="red">expertises: </span>
              <span className="yellow">{"["}</span>
              <ul className="profile-ul">
                <div>
                  {!!profiles.expertises &&
                    Object.values(profiles.expertises).map((expertise) => (
                      <li className="profile-list">
                        <span className="green">"{expertise.type}"</span>,
                      </li>
                    ))}
                </div>
              </ul>
              <span className="yellow">{"]"}</span>,
            </ul>
          </div>
        </div>
        <div>
          <p>
            <span className="yellow">{"}"}</span>;
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
