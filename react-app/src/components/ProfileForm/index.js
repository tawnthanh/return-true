import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {openTab, closeTab} from "../../store/tabs";
import './ProfileForm.css';
import {QuestionMultipleChoice} from "../Answers/QuestionTypes";
import { getProfileFields } from "../../store/profile";

const ProfileForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const { username } = useParams()
  const confirmedUser = useSelector(state => state.session.user.username)
  const profile = useSelector(state => state.profile.profile)
  const languages_list = useSelector(state=>state.fixed.languages)
  const expertises_list = useSelector(state => state.fixed.expertise)

  const [field, setField] = useState(false)
  // const [errors, setErrors] = useState([]);
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
    dispatch(getProfileFields(username))
    setField(true)
  }, [dispatch])

  useEffect(() => {
    console.log(field)
    if (field && profile) {
      updateFirstName(profile.first_name)
      updateLastName(profile.last_name)
      updateImgUrl(profile.image_url)
      updateBio(profile.bio)
      updateLocation(profile.location_id)
      updateInPerson(profile.inPerson)
      updateLevel(profile.level)
      updatePersonality(profile.personality)
      updateFrequency(profile.frequency_id)
      updateMentorship(profile.mentorship)
      updateMorning(profile.morning)
      setLanguages(profile.language)
      updateExpertises(profile.expertises)
    }
  }, [field, profile])

    const editProfile = (e) => {
    e.preventDefault();
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

  // if (confirmedUser !== username) {
  //   return <Redirect to={`/${confirmedUser}/edit-profile`} />
  // }

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
                placeholder="null,"
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
              placeholder="null,"
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
              placeholder="null,"
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
              placeholder="null- please keep it under 2000 characters,"
            ></textarea>
          </span>
        </div>
        <div>
            <label>location</label>
            <span className={location === 0? " " : "quoted"}>
              <select
                name="location"
                required={true}
                onChange={(e)=>updateLocation(e.target.value)}
              >
                <option value="1" >Mass</option>
                <option value="2" >Tex</option>
                <option value="3" >Cal</option>
              </select>,
            </span>
        </div>
        <div>
          <span >
            {/* <QuestionReversedToggle
                                question={"I_want_to_meet_others"}
                                setAnswers={[false, true]}
                                answers={["remotely", "in-person"]}
                                key={`remote-question-item${idx+1}`}/> */}
            <label>{"I_want_to_meet_others"}</label>
            <input type="radio" id="remote" name="inPerson" required={true} value={false} onClick={(e)=>updateInPerson(e.target.value) }/>
            <label id="radio" for="remote">remotely</label>
            <input type="radio" id="in-person" name="inPerson" required={true} value={true} onClick={(e) => updateInPerson(e.target.value)}/>
            <label id="radio" for="in-person">In-Person</label>,
          </span>
        </div>
        <div>
            <label>coding_level</label>
            <span className={level === 0? " " : "quoted"}>
              <select
                name="level"
                required={true}
                onChange={(e)=>updateLevel(e.target.value)}
              >
                <option></option>
                <option value="1" >Beginner</option>
                <option value="2" >Intermediate</option>
                <option value="3" >Expert</option>
              </select>,
            </span>
        </div>
        <div>
            <label>I_am_coding</label>
            <span className={frequency === 0? " " : "quoted"}>
              <select
                name="frequency"
                required={true}
                onChange={(e)=>updateFrequency(e.target.value)}
              >
                <option></option>
                <option value="1" >{" < 10hrs/week"}</option>
                <option value="2" >10-20hrs/week</option>
                <option value="3" >20-40hrs/week</option>
                <option value="4" >40hrs+/week</option>
              </select>,
            </span>
        </div>
        <div>
            <label>My_personality_type</label>
            <span className={frequency === 0? " " : "quoted"}>
              <input type="radio" id="introvert" name="personality" required={true} value={true} onClick={(e)=>updatePersonality(e.target.value) }/>
              <label id="radio" for="introvert">introvert</label>
              <input type="radio" id="extrovert" name="personality" required={true} value={false} onClick={(e) => updatePersonality(e.target.value)}/>
              <label id="radio" for="extrovert">extrovert</label>
            </span>,
        </div>
        <div>
          <span >
            <label>I_am_open_to_mentor</label>
            <input type="radio" id="mentor" name="mentorship" required={true} value={true} onClick={(e)=>updateMentorship(e.target.value) }/>
            <label id="radio" for="mentor">true</label>
            <input type="radio" id="no-mentor" name="mentorship" required={true} value={false} onClick={(e) => updateMentorship(e.target.value)}/>
            <label id="radio" for="no-mentor">false</label>,
          </span>
        </div>
        <div>
          <span >
            <label>I_like_coding</label>
            <input type="radio" id="night" name="morning" required={true} value={true} onClick={(e)=>updateMorning(e.target.value) }/>
            <label id="radio" for="night">at_night</label>
            <input type="radio" id="morning" name="morning" required={true} value={false} onClick={(e) => updateMorning(e.target.value)}/>
            <label id="radio" for="morning">in_the_morning</label>,
          </span>
        </div>
        <div>
          <label>{"Language(s)_I_know"}</label>
          {"["}
          <span className="select-grid">
            {languages_list && Object.values(languages_list).map(language => {
              return(
                <label
                  htmlFor={`o${language.id}`}
                  className="checkbox-container"
                  key={`q${language.id}-multichoice`}>
                <input type="checkbox"
                    onChange={handleLanguages}
                    value={language.id}
                    id={`o${language.id}`}
                    name={`o${language.type}`}
                  />
                  {language.type}
                  <span className="checkmark"></span>
              </label>)
            })}
            {"],"}
          </span>
        </div>
        <div>
          <label onClick={() => console.log(typeof profile)}>{"My_expertise(s)"}</label>
          {"["}
          <span className="select-grid">
            {expertises_list && Object.values(expertises_list).map(e => {
                return(
                  <label
                    htmlFor={`o${e.id}`}
                    className="checkbox-container"
                    key={`q${e.id}-multichoice`}>
                  <input type="checkbox"
                      onChange={handleExpertise}
                      value={e.id}
                      id={`o${e.id}`}
                      name={`o${e.type}`}
                    />
                    {e.type}
                    <span className="checkmark"></span>
                </label>)
              })}
            {"],"}
          </span>
        </div>
        <div><span style={{ color: "#2566ca" }}>{`}`}</span>{`;`}</div>
        <div><span style={{ color: "#dcb862" }}>updateProfile</span>(<span style={{ color: "#2ba2ff" }}>profile</span>);</div>
        <button type="submit">{`> `}node profile.js</button>
      </form>

    </>
  )
};

export default ProfileForm;
