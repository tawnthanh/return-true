import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import picture from "../../null_profile_pic.jpg";
import {openTab} from "../../store/tabs";

export default function Profile({isCurrent, setEditMode}) {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile) {
      let tab = {
        tab_id: `profile`,
        title: `${profile.first_name} ${profile.last_name}`,
        link: `/users${isCurrent?"":"/"+profile.id}`
      }
      dispatch(openTab(tab))
    }
  },[dispatch, profile, isCurrent]);

  if (!profile) {
    return null;
  }

  return (
    <div className="profile">
      <div className="prof-pic">
        {profile.image_url && <img id="profile-picture" src={profile.image_url} alt={profile.first_name+" "+profile.lastst_name}/>}
        {!profile.image_url && <img id="profile-picture" src={picture} alt={profile.first_name+" "+profile.lastst_name} />}
        { isCurrent &&
          <div className="edit-button" onClick={()=>{setEditMode(true)}}>
            <span>Edit Profile</span>
          </div>
        }
      </div>
      <div>
        <div>
          <p>
            <span className="const-color">const</span>{" "}
            <span className="prof-name-color">{profile.first_name}</span> =
            <span className="brackets-color">{" {"}</span>
          </p>
          <div className="profile-details">
            <ul>
              {profile.bio && (
                <>
                  <span className="keys-color">bio:</span>{" "}
                  <span className="values-color">
                    "{!!profile.bio && profile.bio}"
                  </span>
                  ,
                </>
              )}
              <br />
              <span className="keys-color">level: </span>
              <span className="booleans-color">{profile.level}</span>,
              <div>
                <span className="keys-color">frequency: </span>
                <span className="values-color">
                  "{!!profile.frequency && profile.frequency.type}"
                </span>
                ,
              </div>
              <div>
                <span className="keys-color">introvert: </span>
                {profile.personality === true && (
                  <span className="booleans-color">
                    {profile.personality.toString()}
                  </span>
                )}
                {profile.personality === false && (
                  <span className="booleans-color">
                    {profile.personality.toString()}
                  </span>
                )}
              </div>
              <div>
                <span className="keys-color">mentor: </span>
                <span className="booleans-color">
                  {profile.mentorship === true &&
                    profile.mentorship.toString()}
                  {profile.mentorship === false &&
                    profile.mentorship.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="keys-color">inPerson: </span>
                <span className="booleans-color">
                  {profile.in_person === true && profile.in_person.toString()}
                </span>
                <span className="booleans-color">
                  {profile.in_person === false &&
                    profile.in_person.toString()}
                </span>
                ,
              </div>
              <div>
                <span className="keys-color">morning: </span>
                <span className="booleans-color">
                  {profile.morning === true && profile.morning.toString()}
                </span>
                <span className="booleans-color">
                  {profile.morning === false && profile.morning.toString()}
                </span>
                ,
              </div>
              <span className="keys-color">languages: </span>
              <span className="brackets-color">{"["}</span>
              <ul className="profile-ul">
                <div>
                  {!!profile.languages &&
                    Object.values(profile.languages).map((language) => (
                      <li className="profile-list" key={`lang-${language.id}`}>
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
                  {!!profile.expertises &&
                    Object.values(profile.expertises).map((expertise) => (
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

