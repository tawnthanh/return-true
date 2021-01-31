import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {openTab, closeTab} from "../../store/tabs";
import './ProfileForm.css';
import { getProfileFields, updateProfile } from "../../store/profile";
import { QuestionReversedToggleProfile } from "./FormFields";
import {openTab} from "../../store/tabs";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { username } = useParams()
  const confirmedUser = useSelector(state => state.session.user)
  const profile = useSelector(state => state.profile)
  const languages_list = useSelector(state => state.fixed.languages)
  const expertises_list = useSelector(state => state.fixed.expertise)
  const states_list = useSelector(state => state.fixed.states)
  const frequency_list = useSelector(state => state.fixed.frequencies)

  const [firstName, updateFirstName] = useState("")
  const [lastName, updateLastName] = useState("")
  const [imageUrl, updateImgUrl] = useState(null)
  const [bio, updateBio] = useState(null)
  const [state, updateState] = useState(0)
  const [city, updateCity] = useState("")
  const [inPerson, updateInPerson] = useState(false)
  const [level, updateLevel] = useState(0)
  const [personality, updatePersonality] = useState(false)
  const [frequency, updateFrequency] = useState(0)
  const [mentorship, updateMentorship] = useState(false)
  const [morning, updateMorning] = useState(false)
  const [languages, setLanguages] = useState([])
  const [expertises, updateExpertises] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [stateName, updateStateName] = useState(null)
  const [defaultLevel, setDefaultLevel] = useState({})
  const [defaultFrequency, setDefaultFrequency] = useState({})

  const levelArray = [
    {"id": 1, "name": "Beginner"},
    {"id": 2, "name": "Proficient"},
    {"id": 3, "name": "Expert"},
  ]

  useEffect(() => {
    let tab = {
      tab_id: `edit-profile`,
      title: "edit profile",
      link: `/${username}/edit-profile`
    }
    dispatch(openTab(tab))
    dispatch(getProfileFields(username))
    setIsLoaded(true)
  }, [dispatch])

  useEffect(() => {
    if (profile.state) {
      let expertiseId = profile.expertises.map(e => e.id)
      let languagesId = profile.languages.map(l => l.id)
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
      setLanguages(languagesId)
      updateExpertises(expertiseId)
    }

  }, [profile])

  useEffect(() => {
    if (states_list) {
      updateStateName(Object.values(states_list)[state - 1])
    }
  }, [state,states_list])

  useEffect(() => {
    if (level !== 0) {
      let defaultLevelObj = levelArray.filter(l => l.id === level)
      setDefaultLevel(...defaultLevelObj)
    }
  },[level])

  useEffect(() => {
    if (frequency_list && frequency) {
      let freqObj = Object.values(frequency_list).filter(f => f.id === frequency)
      setDefaultFrequency(...freqObj)
    }
  }, [frequency, frequency_list])

  const editProfile = (e) => {
    e.preventDefault();
    // if()
    const profile = {
      "user_id": confirmedUser.id,
      "first_name": firstName,
      "last_name": lastName,
      "image_url": imageUrl,
      "bio": bio,
      "city": city,
      "state": state,
      "inPerson": inPerson,
      "level": level,
      "personality": personality,
      "frequency_id": frequency,
      "mentorship": mentorship,
      "morning": morning,
      "languages": languages,
      "expertises": expertises,
    }
    dispatch(updateProfile(profile, { "user": confirmedUser }))
    return
  }

  const handleLanguages = (e) => {
    let targetVal = parseInt(e.target.value)
    if (!languages.includes(targetVal)) {
      setLanguages([...languages, targetVal]);
    } else if (languages.includes(targetVal)) {
      if (languages.length > 1){
        let targetIdx = languages.indexOf(targetVal);
        let newLang = [...languages.slice(0, targetIdx), ...languages.slice(targetIdx + 1)];
        setLanguages(newLang);
      } else if (languages.length === 1){
        setLanguages([])
      }
    }
  }

  const handleExpertise = e => {
    let targetVal = parseInt(e.target.value)
    if (!expertises.includes(targetVal)) {
      updateExpertises([...expertises, targetVal]);
    } else if (expertises.includes(targetVal)) {
      if (expertises.length > 1){
        let targetIdx = expertises.indexOf(targetVal);
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
            <span className={!imageUrl? " " : "quoted"}>
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
          <span className={bio === null? " " : "quoted"}>
            <textarea
              name="bio"
              onChange={(e) => updateBio(e.target.value)}
              value={bio}
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
            { !!defaultLevel && defaultLevel.id ?
              <option value={defaultLevel.id}>{defaultLevel.name}</option>
              :
              <option>Select Level</option>
            }
              {levelArray.map(l => {
                return <option key={`o-${l.name}` }value={l.id}>{l.name}</option>
                })}
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
            {!!defaultFrequency && defaultFrequency.id ?
              <option value={defaultFrequency.id}>{defaultFrequency.type}</option>
            :
              <option>Select How Often</option>
            }
            {!!frequency_list &&
              Object.values(frequency_list).map(f => {
                return <option key={`o-${f.type}` }value={f.id}>{f.type}</option>
              })

                }
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
                    checked={languages.includes(language.id)? "checked": null}

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
            {expertises_list && Object.values(expertises_list).map(e=>{
                return <label
                            htmlFor={`q${e.type}-o${e.id}`}
                            className="checkbox-container"
                            key={`q${e.type}-o${e.id}-multichoice`}>
                    {e.type}
                  <input type="checkbox"
                    onChange={handleExpertise}
                    value={e.id}
                    id={`q${e.type}-o${e.id}`}
                    name={`q${e.id}`}
                    checked={expertises.includes(e.id)? "checked": null}
                    />
                    <span className="checkmark"></span>
                </label>
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
