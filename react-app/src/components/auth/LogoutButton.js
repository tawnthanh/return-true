import React from "react";
import { logout } from "../../services/auth";
import { sessionLogout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const onLogout = async (e) => {
    await dispatch(sessionLogout());
    setAuthenticated(user !== null);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
