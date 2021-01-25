import { authenticate, login, logout } from "../services/auth.js";

const SET_SESSION = "session/set";

const setSession = (user) => {
  return { type: SET_SESSION, user };
};

export const sessionAuthenticate = () => async (dispatch) => {
  const res = await authenticate();
  if (!res.errors) {
    return dispatch(setSession(res));
  } else {
    throw new Error(res.errors)
  }
};

export const sessionLogin = (email, password) => async (dispatch) => {
  const res = await login(email, password);
  if (!res.errors) {
    return dispatch(setSession(res));
  } else {
    return res
  }
};

const reducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_SESSION: {
      const newState = {};
      newState.user = action.user;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
