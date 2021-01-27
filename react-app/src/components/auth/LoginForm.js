import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { sessionLogin } from "../../store/session";
import { useDispatch } from "react-redux";
import './loginform.css';
import {openTab, closeTab} from "../../store/tabs";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(sessionLogin(email, password))
      .then(res => {
        if (!res.errors) {
          setAuthenticated(true);
          dispatch(closeTab("login"));
          dispatch(closeTab("signup"))
        } else {
          setErrors(res.errors);
        }
      })
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(()=>{
    if (!authenticated)
      dispatch(openTab({
        tab_id:"login",
        title: "login",
        link: "/login"
      }))
    else dispatch(closeTab("login"))
  },[authenticated])

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin} className="loginform">
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
