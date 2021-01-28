import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/profile";

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // const { userId } = useParams();
  const userId = Number.parseInt(useParams().userId);

  const profiles = useSelector(({ profiles }) =>
    Object.values(profiles).filter((profile) => profile.userId === userId)
  );
  console.log(profiles);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
export default User;
