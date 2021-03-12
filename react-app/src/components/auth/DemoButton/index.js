import React from "react";
import {useDispatch} from "react-redux";
import {closeTab} from "../../../store/tabs";
import { sessionLogin } from "../../../store/session";

export default function DemoButton ({setAuthenticated}) {
  const dispatch = useDispatch();

  const onDemo = async (e) => {
    e.preventDefault();
    dispatch(sessionLogin("demo@aa.io", "password"))
      .then(res => {
        if (!res.errors) {
          setAuthenticated(true);
          dispatch(closeTab("login"));
          dispatch(closeTab("signup"))
        }
      })
  };
  
  return <button onClick={onDemo} title="Demo Login" >
    <i className="fas fa-id-card"></i>
  </button>
}