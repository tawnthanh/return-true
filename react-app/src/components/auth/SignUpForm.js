import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { sessionSignup } from "../../store/session";
import { useDispatch } from "react-redux";
import './signupform.css';

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

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="signupform">
      <div className="form-sections">
        <div>
          <label>const username = </label>
          "<input
            type="text"
            name="username"
            className={username === ""? " " : "quoted"}
            onChange={updateUsername}
            value={username}
            placeholder="null"
          ></input>"
        </div>
        <div>
          <label>const email = </label>
          "<input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>"
        </div>
        <div>
          <label>const password = </label>
          "<input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>"
        </div>
        <div>
          <label>const password = </label>
          "<input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>"
        </div>
        <button type="submit">signup()</button>
      </div>
    </form>
  );
};

export default SignUpForm;
