import React from "react";
import { sessionLogout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import 'font-awesome/css/font-awesome.min.css';

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const onLogout = async (e) => {
    await dispatch(sessionLogout());
    setAuthenticated(user == null);
  };

  return (
    <div onClick={onLogout}>
      <i className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
    </div>);
};

export default LogoutButton;
