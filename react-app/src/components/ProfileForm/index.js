import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import {openTab, closeTab} from "../../store/tabs";
import './ProfileForm.css';

const ProfileForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [firstName, updateFirstName] = useState("")
  const [lastName, updateLastName] = useState("")
  const [imageUrl, updateImgUrl] = useState("")
  const [bio, updateBio] = useState("")
  const [location, updateLocation] = useState("")
  const [inPerson, updateInPerson] = useState(null)
  const [level, updateLevel] = useState("")
  const [personality, updatePersonality] = useState(null)
  const [frequency, updateFrequency] = useState("")
  const [mentorship, updateMentorship] = useState(null)
  const [morning, updateMorning] = useState(null)
  const [language, setLanguage] = useState("")
  const [expertise, updateExpertise] = useState("")

  useEffect(()=>{
    if (authenticated)
      dispatch(openTab({
        tab_id:"edit_profile",
        title: "edit-profile",
        link: "/edit-profile"
      }))
    else dispatch(closeTab("edit_profile"))
  },[authenticated])

  const editProfile = () => {
    return
  }

  return (
    <>
      <form onSubmit={editProfile} className="profile-form">
        <div>
          <span style={{ color: "#2566ca" }}>const </span>
          <span style={{ color: "#2ba2ff" }}>profile</span>
          =
          <span style={{ color: "#2566ca" }}>{`{`}</span>
        </div>
        <div>
            <label>firstName</label>
            <span className={firstName === ""? " " : "quoted"}>
              <input
                type="text"
                name="firstName"
                onChange={updateFirstName}
                value={firstName}
                placeholder="null"
                size={firstName.length}
              ></input>
            </span>
          </div>
          <div>
            <label>lastName</label>
            <span className={lastName === ""? " " : "quoted"}>
              <input
                type="text"
                name="lastName"
                onChange={updateLastName}
                value={lastName}
                placeholder="null"
                size={lastName.length}
              ></input>
            </span>
          </div>
          <div>
            <label>imageUrl</label>
              <span className={imageUrl === ""? " " : "quoted"}>
                <input
                type="imageUrl"
                name="imageUrl"
                onChange={updateImgUrl}
                value={imageUrl}
                placeholder="null"
                size={imageUrl.length}
              ></input>
            </span>
          </div>
          <div>
            <label>bio</label>
            <span className={bio === ""? " " : "quoted"}>
              <input
                type="bio"
                name="bio"
                onChange={updateBio}
                value={bio}
                required={true}
                placeholder="null"t
                size={bio.length}
              ></input>
            </span>
          </div>
          <div><span style={{color:"#2566ca"}}>{`}`}</span>{`;`}</div>
          <div><span style={{color:"#dcb862"}}>updateProfile</span>(<span style={{color:"#2ba2ff"}}>profile</span>);</div>
          <button type="submit">{`> `}node profile.js</button>
      </form>
    </>
  );
};

export default ProfileForm;
