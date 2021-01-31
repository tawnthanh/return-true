import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {openTab, closeTab} from "../../store/tabs";
import './ProfileForm.css';
import { getProfileFields } from "../../store/profile";
import { QuestionReversedToggleProfile } from "./FormFields";

const ProfileForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const { username } = useParams()
  const confirmedUser = useSelector(state => state.session.user.username)
  const profile = useSelector(state => state.profile)
  const languages_list = useSelector(state=>state.fixed.languages)
  const expertises_list = useSelector(state => state.fixed.expertise)
  const states_list = useSelector(state => state.fixed.states)

  const [field, setField] = useState(false)
  const [firstName, updateFirstName] = useState("")
  const [lastName, updateLastName] = useState("")
  const [imageUrl, updateImgUrl] = useState("")
  const [bio, updateBio] = useState("")
  const [state, updateState] = useState(0)
  const [city, updateCity] = useState("")
  const [inPerson, updateInPerson] = useState(null)
  const [level, updateLevel] = useState(0)
  const [personality, updatePersonality] = useState(0)
  const [frequency, updateFrequency] = useState(0)
  const [mentorship, updateMentorship] = useState(null)
  const [morning, updateMorning] = useState(null)
  const [languages, setLanguages] = useState([])
  const [expertises, updateExpertises] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [stateName, updateStateName] = useState(null)

  useEffect(()=>{
    dispatch(getProfileFields(username))
    setField(true)
    setIsLoaded(true)
  }, [dispatch])

  useEffect(() => {
    if (profile.state) {
      updateFirstName(profile.first_name)
      updateLastName(profile.last_name)
      updateImgUrl(profile.image_url)
      updateBio(profile.bio)
      updateCity(profile.city)
      updateState(profile.state.id)
      updateInPerson(profile.inPerson)
      updateLevel(profile.level)
      updatePersonality(profile.personality)
      updateFrequency(profile.frequency_id)
      updateMentorship(profile.mentorship)
      updateMorning(profile.morning)
      setLanguages(profile.language)
      updateExpertises(profile.expertises)
    }
  }, [profile])

  useEffect(() => {
    if (states_list) {
      updateStateName(Object.values(states_list)[state-1])
    }
  }, [state,states_list])


    const editProfile = (e) => {
    e.preventDefault();
    console.log(firstName)
    console.log(lastName)
    console.log(imageUrl)
    console.log(bio)
    console.log(city)
    console.log(state)
    console.log(inPerson)
    console.log(level)
    console.log(personality)
    console.log(frequency)
    console.log(mentorship)
    console.log(morning)
    console.log(languages)
    console.log(expertises)

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

  return ( isLoaded &&
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

        <label>location</label>
        <span className={state === 0 ? " " : "quoted"}>
          <input
            type="text"
            name="location"
            value={city}
            placeholder="null"
            onChange={(e) => updateCity(e.target.value)}></input>,
            <select
              name="state"
              required={true}
              onChange={(e)=>updateState(e.target.value)}
            >
            {stateName?
              <option value={stateName.id}>{stateName.state}</option>
              :
              <option>Select State</option>
            }
            {states_list &&
              Object.values(states_list).map(s => {

                return <option key={s.id} value={s.id}>{s.state}</option>;

                })}
            </select>
          </span>,


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
          <span >
            <QuestionReversedToggleProfile
              question={{
                        "options": ["remotely", "in-person"],
                        "question": "I_want_to_meet_others",
                        "question_type": 5,
                        "answer": inPerson,
                      }}
              setAnswers={() => updateInPerson(!inPerson)}
              answers={[true, false]} />,

          </span>
        </div>
        <div>
          <QuestionReversedToggleProfile
              question={{
                        "options": ["introvert", "extrovert"],
                        "question": "My_personality_type",
                        "question_type": 5,
                        "answer": personality,
                      }}
              setAnswers={() => updatePersonality(!personality)}
              answers={[true, false]} />,
        </div>
        <div>
          <span >
            <QuestionReversedToggleProfile
                    question={{
                      "options": ["false", "true"],
                      "question": "I_am_open_to_mentor",
                      "question_type": 5,
                      "answer": mentorship,
                    }}
                    setAnswers={() => updateMentorship(!mentorship)}
                    answers={[true, false]} />,
          </span>
        </div>
        <div>
          <span >
              <QuestionReversedToggleProfile
                    question={{
                      "options": ["nighttime", "daytime"],
                      "question": "daytime_preference",
                      "question_type": 5,
                      "answer": morning,
                    }}
                    setAnswers={() => updateMorning(!morning)}
                    answers={[true, false]} />,
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
          <label>{"My_expertise(s)"}</label>
          {"["}
          <span className="select-grid">
            {expertises_list && Object.values(expertises_list).map(e => {
                return(
                  <label
                    htmlFor={`q${e.o}-${e.id}`}
                    className="checkbox-container"
                    key={`q${e.type}-{e.id}-multichoice`}>
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
