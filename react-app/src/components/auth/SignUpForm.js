import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { sessionSignup } from "../../store/session";
import { useDispatch } from "react-redux";
import './authforms.css';
import {openTab, closeTab} from "../../store/tabs";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(sessionSignup(username, email, password)).then((res) => {
        if (!res.errors) {
          setAuthenticated(true);
        } else {
          setErrors(res.errors);
        }
      });
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(()=>{
    if (!authenticated)
      dispatch(openTab({
        tab_id:"signup",
        title: "sign-up",
        link: "/sign-up"
      }))
    else {
      dispatch(closeTab("signup"));
      dispatch(closeTab("login"));
      history.push("/users");
    }
  },[authenticated,dispatch])

  if (authenticated) {
    return <Redirect to={`/`} />;
  }

  return (
    <>
      <form onSubmit={onSignUp} className="signupform">
          <div><span style={{color:"#2566ca"}}>const </span><span style={{color:"#2ba2ff"}}>newUser</span> = <span style={{color:"#2566ca"}}>{`{`}</span></div>
          <div>
            <label>username</label>
            <span className={username === ""? " " : "quoted"}>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                placeholder="null"
                size={username.length}
              ></input>
            </span>
          </div>
          <div>
            <label>email</label>
            <span className={email === ""? " " : "quoted"}>
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder="null"
                size={email.length}
              ></input>
            </span>
          </div>
          <div>
            <label>password</label>
              <span className={password === ""? " " : "quoted"}>
                <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                placeholder="null"
                size={password.length}
              ></input>
            </span>
          </div>
          <div>
            <label>password</label>
            <span className={repeatPassword === ""? " " : "quoted"}>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder="null"
                size={repeatPassword.length}
              ></input>
            </span>
          </div>
          <div><span style={{color:"#2566ca"}}>{`}`}</span>{`;`}</div>
          <div><span style={{color:"#dcb862"}}>signup</span>(<span style={{color:"#2ba2ff"}}>newUser</span>);</div>
          <button type="submit">{`> `}node signup.js</button>
      </form>
      <div className="errorsLog" >
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
    </>
  );
};

export default SignUpForm;
