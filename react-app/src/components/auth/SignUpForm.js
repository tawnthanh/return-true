import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { sessionSignup } from "../../store/session";
import { useDispatch } from "react-redux";
import './signupform.css';
import {openTab, closeTab} from "../../store/tabs";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
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
  // if (password === repeatPassword) {
  //   const user = await signUp(username, email, password);
  //   if (!user.errors) {
  //     setAuthenticated(true);
  //   }
  // }

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
    else dispatch(closeTab("signup"))
  },[authenticated])

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="signupform">
      <div className="form-sections">
        <div>
          <label>username</label>
          <span className={username === ""? " " : "quoted"}>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              placeholder="null"
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
            ></input>
          </span>
        </div>
        <button type="submit">signup()</button>
      </div>
    </form>
  );
};

export default SignUpForm;
