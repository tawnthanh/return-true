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
  const [location, updateLocation] = useState(0)
  const [inPerson, updateInPerson] = useState(null)
  const [level, updateLevel] = useState(0)
  const [personality, updatePersonality] = useState(0)
  const [frequency, updateFrequency] = useState(0)
  const [mentorship, updateMentorship] = useState(null)
  const [morning, updateMorning] = useState(null)
  const [languages, setLanguages] = useState([])
  const [expertises, updateExpertises] = useState([])

  useEffect(()=>{
    if (authenticated)
      dispatch(openTab({
        tab_id: "edit_profile",
        title: "edit-profile",
        link: "/edit-profile"
      }));
    else dispatch(closeTab("edit_profile"));
  },[authenticated])

  useEffect(() => {
    console.log(expertises);
  }, [expertises])

  const editProfile = (e) => {
    e.preventDefault();
    console.log(location);
    return
  }

  const handleLanguages = (e) => {
    if (!languages.includes(e.target.value)) {
      setLanguages([...languages, e.target.value]);
    } else if (languages.includes(e.target.value)) {
      if (languages.length > 1){
        let targetIdx = languages.indexOf(e.target.value);
        let newLang = [...languages.slice(0, targetIdx), ...languages.slice(targetIdx + 1)];
        setLanguages(newLang);
      } else if (languages.length === 1){
        setLanguages([])
      }
    }

  }

    const handleExpertise = (e) => {
    if (!expertises.includes(e.target.value)) {
      updateExpertises([...expertises, e.target.value]);
    } else if (expertises.includes(e.target.value)) {
      if (expertises.length > 1){
        let targetIdx = expertises.indexOf(e.target.value);
        let newLang = [...expertises.slice(0, targetIdx), ...expertises.slice(targetIdx + 1)];
        updateExpertises(newLang);
      } else if (expertises.length === 1){
        updateExpertises([])
      }
    }

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
            <label>first_name</label>
            <span className={firstName === ""? " " : "quoted"}>
              <input
                type="text"
                name="firstName"
                onChange={(e) => updateFirstName(e.target.value)}
                value={firstName}
                placeholder="null"
                size={firstName.length}
              ></input>
            </span>
          </div>
        <div>
          <label>last_name</label>
          <span className={lastName === ""? " " : "quoted"}>
            <input
              type="text"
              name="lastName"
              onChange={(e) => updateLastName(e.target.value)}
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
              onChange={(e) => updateImgUrl(e.target.value)}
              value={imageUrl}
              placeholder="null"
              size={imageUrl.length}
            ></input>
          </span>
        </div>
        <div>
          <label>bio</label>
          <span className={bio === ""? " " : "quoted"}>
            <textarea
              name="bio"
              onChange={(e) => updateBio(e.target.value)}
              value={bio}
              required={true}
              placeholder="null"
            ></textarea>
          </span>
        </div>
        <div>
            <label>location</label>
            <span className={location === 0? " " : "quoted"}>
              <select
                name="location"
                required={true}
                size={location.length}
                onChange={(e)=>updateLocation(e.target.value)}
              >
                <option value="1" >Mass</option>
                <option value="2" >Tex</option>
                <option value="3" >Cal</option>
              </select>
            </span>
        </div>
        <div>
          <span >
            <label>I_want_to_meet_others</label>
            <input type="radio" id="remote" name="inPerson" required={true} value={false} onClick={(e)=>updateInPerson(e.target.value) }/>
            <label id="radio" for="remote">remotely</label>
            <input type="radio" id="in-person" name="inPerson" required={true} value={true} onClick={(e) => updateInPerson(e.target.value)}/>
            <label id="radio" for="in-person">In-Person</label>
          </span>
        </div>
        <div>
            <label>coding_level</label>
            <span className={level === 0? " " : "quoted"}>
              <select
                name="level"
                required={true}
                size={level.length}
                onChange={(e)=>updateLevel(e.target.value)}
              >
                <option value="1" >Beginner</option>
                <option value="2" >Intermediate</option>
                <option value="3" >Expert</option>
              </select>
            </span>
        </div>
        <div>
            <label>I_am_coding</label>
            <span className={frequency === 0? " " : "quoted"}>
              <select
                name="frequency"
                required={true}
                size={frequency.length}
                onChange={(e)=>updateFrequency(e.target.value)}
              >
                <option value="1" >{" < 10hrs/week"}</option>
                <option value="2" >10-20hrs/week</option>
                <option value="3" >20-40hrs/week</option>
                <option value="4" >40hrs+/week</option>
              </select>
            </span>
        </div>
        <div>
            <label>My_personality_type</label>
            <span className={frequency === 0? " " : "quoted"}>
              <input type="radio" id="introvert" name="personality" required={true} value={true} onClick={(e)=>updatePersonality(e.target.value) }/>
              <label id="radio" for="introvert">introvert</label>
              <input type="radio" id="extrovert" name="personality" required={true} value={false} onClick={(e) => updatePersonality(e.target.value)}/>
              <label id="radio" for="extrovert">extrovert</label>
            </span>
        </div>
        <div>
          <span >
            <label>I_am_open_to_mentor</label>
            <input type="radio" id="mentor" name="mentorship" required={true} value={true} onClick={(e)=>updateMentorship(e.target.value) }/>
            <label id="radio" for="mentor">true</label>
            <input type="radio" id="no-mentor" name="mentorship" required={true} value={false} onClick={(e) => updateMentorship(e.target.value)}/>
            <label id="radio" for="no-mentor">false</label>
          </span>
        </div>
        <div>
          <span >
            <label>I_like_coding</label>
            <input type="radio" id="night" name="morning" required={true} value={true} onClick={(e)=>updateMorning(e.target.value) }/>
            <label id="radio" for="night">at_night</label>
            <input type="radio" id="morning" name="morning" required={true} value={false} onClick={(e) => updateMorning(e.target.value)}/>
            <label id="radio" for="morning">in_the_morning</label>
          </span>
        </div>
        <div>
            <label>{"Language(s)_I_know"}</label>
            <span className={languages === []? " " : "quoted"}>
              <select
                name="languages"
                multiple={true}
                value={languages}
                // onChange={(e)=>setLanguages(e.target.value)}
                onClick={handleLanguages}
              >
                <option value="1" >Mass</option>
                <option value="2" >Tex</option>
                <option value="3" >Cal</option>
                <option value="4" >jimbo</option>
                <option value="5" >raul</option>
                <option value="6" >texas</option>
                <option value="7" >wyoming</option>
                <option value="8" >nh</option>
                <option value="9" >ari</option>
                <option value="10" >maine</option>
              </select>
            </span>
        </div>
        <div>
            <label>{"My_expertise(s)"}</label>
            <span>
              <select
                name="expertises"
                multiple={true}
                value={expertises}
                // onChange={(e)=>setLanguages(e.target.value)}
                onClick={handleExpertise}
              >
                <option value="1" >Frontend</option>
                <option value="2" >Backend</option>
                <option value="3" >UX/UI Design</option>
                <option value="4" >AI</option>
                <option value="5" >Data Analysis</option>
              </select>
            </span>
        </div>
        <div><span style={{ color: "#2566ca" }}>{`}`}</span>{`;`}</div>
        <div><span style={{color:"#dcb862"}}>updateProfile</span>(<span style={{color:"#2ba2ff"}}>profile</span>);</div>
        <button type="submit">{`> `}node profile.js</button>
      </form>
    </>
  );
};

export default ProfileForm;
