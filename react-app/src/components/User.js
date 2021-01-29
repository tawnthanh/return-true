import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getUser } from "../store/profile";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const profiles = useSelector((state) => state.profile);
  console.log(profiles);

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(getUser(userId));
    dispatch(getProfile(userId));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return <div></div>;
}
export default User;
