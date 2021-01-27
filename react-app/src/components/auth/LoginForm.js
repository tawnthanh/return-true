import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { sessionLogin } from "../../store/session";
import { useDispatch } from "react-redux";
import './authforms.css';
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
      <>
        <form onSubmit={onLogin} className="loginform">
            <div>
              <label htmlFor="email">email</label>
              <span className={email === ""? " " : "quoted"}>
              <input
                name="email"
                type="text"
                placeholder="null"
                value={email}
                onChange={updateEmail}
                size={email.length-1}
              />
              </span>
            </div>
            <div>
              <label htmlFor="password">password</label>
              <span className={password === ""? " " : "quoted"}>
              <input
                name="password"
                type="password"
                placeholder="null"
                value={password}
                onChange={updatePassword}
                size={password.length}
              />
              </span>
            </div>
            <div><span style={{color:"#dcb862"}}>login</span>(<span style={{color:"#2ba2ff"}}>email</span>, <span style={{color:"#2ba2ff"}}>password</span>);</div>
            <button type="submit">{`> `}node login.js</button>
        </form>
        <div className="errorsLog" >
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      </>
  );
};

export default LoginForm;
