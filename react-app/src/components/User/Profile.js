import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import picture from "../../null_profile_pic.jpg";
import {createDialogue} from "../../store/dialogues";

export default function Profile({isCurrent, setEditMode}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentDialogue, setCurrentDialogue] = useState(null);

  const profile = useSelector((state) => state.profile);
  const dialogues = useSelector((state) => state.dialogues);

  useEffect(() => {
    if (!isCurrent && profile) {
      let currentD = dialogues.find(d => profile.id === d.userId);
      if (currentD) {
        setCurrentDialogue(currentD.id)
      } else {
        setCurrentDialogue(null)
      }
    }
  },[dialogues, profile, isCurrent])

  if (!profile) {
    return null;
  }

  return (
    <div className="profile">
      <div className="prof-pic">
        {profile.image_url && <img id="profile-picture" src={profile.image_url} alt={profile.first_name+" "+profile.lastst_name}/>}
        {!profile.image_url && <img id="profile-picture" src={picture} alt={profile.first_name+" "+profile.lastst_name} />}
        { isCurrent && <div className="edit-button" onClick={()=>{setEditMode(true)}}>
            <span>Edit Profile</span>
        </div>}
        {!isCurrent && <div className="start-dialogue">
          <button onClick={async ()=>{
            if (currentDialogue) {
              history.push(`/messages/${currentDialogue}`)
            } else {
              let newDialogue = await dispatch(createDialogue(profile.id));
              if (!newDialogue.errors){
                setCurrentDialogue(newDialogue)
                history.push(`/messages/${newDialogue}`)
              } else {
                console.log("Something went wrong:", {errors: newDialogue.errors})
              }
            }
          }} >
            <i className="fas fa-envelope"></i>
          </button>
        </div>}
      </div>
      <div>
        <div>
          <p>
            <span className="const-color">const</span>{" "}
            <span className="prof-name-color">{profile.username}</span> =
            <span className="brackets-color">{" {"}</span>
          </p>
          <div className="profile-details">
            <ul>
              <li>
                <span className="keys-color">name:</span>{" "}
                  <span className="values-color">"{profile.first_name} {profile.last_name}"</span>
              </li>
              {profile.bio && (
                <li>
                  <span className="keys-color">bio:</span>{" "}
                  <span className="values-color">
                    "{!!profile.bio && profile.bio}"
                  </span>
                </li>
              )}
              <li>
                <span className="keys-color">level: </span>
                <span className="booleans-color">{profile.level}</span>
              </li>
              <li>
                <span className="keys-color">frequency: </span>
                <span className="values-color">
                  "{!!profile.frequency && profile.frequency.type}"
                </span>
              </li>
              <li>
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
              </li>
              <li>
                <span className="keys-color">mentor: </span>
                <span className="booleans-color">
                  {profile.mentorship === true &&
                    profile.mentorship.toString()}
                  {profile.mentorship === false &&
                    profile.mentorship.toString()}
                </span>
              </li>
              <li>
                <span className="keys-color">inPerson: </span>
                <span className="booleans-color">
                  {profile.in_person === true && profile.in_person.toString()}
                </span>
                <span className="booleans-color">
                  {profile.in_person === false &&
                    profile.in_person.toString()}
                </span>
              </li>
              <li>
                <span className="keys-color">morning: </span>
                <span className="booleans-color">
                  {profile.morning === true && profile.morning.toString()}
                </span>
                <span className="booleans-color">
                  {profile.morning === false && profile.morning.toString()}
                </span>
              </li>
              <li>
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
                <span className="brackets-color">{"]"}</span>
              </li>
              <li>
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
                <span className="brackets-color">{"]"}</span>
              </li>
              <li>
                <span className="keys-color">location: </span>
                <span className="values-color">{`"${profile.city?profile.city:""} ${profile.state?", "+profile.state.state:""}"`}</span>
              </li>
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

