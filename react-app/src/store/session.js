import { authenticate, login, logout, signUp } from "../services/auth.js";

const SET_SESSION = "session/set";
const CLEAR_SESSION = "session/clear";
const NEW_SESSION = "session/new";

const newSession = (user) => {
  return { type: SET_SESSION, user };
};

const setSession = (user) => {
  return { type: SET_SESSION, user };
};

const clearSession = () => {
  return { type: CLEAR_SESSION };
};

export const sessionAuthenticate = () => async (dispatch) => {
  const res = await authenticate();
  if (!res.errors) {
    dispatch(setSession(res));
    return
  } else {
    throw new Error(res.errors);
  }
};

export const sessionSignup = (username, email, password) => async (dispatch) => {
  const res = await signUp(username, email, password);
  if (!res.errors) {
    return dispatch(newSession(res));
  } else {
    return res;
  }
};

export const sessionLogin = (email, password) => async (dispatch) => {
  const res = await login(email, password);
  if (!res.errors) {
    return dispatch(setSession(res));
  } else {
    return res;
  }
};

export const sessionLogout = () => async (dispatch) => {
  const res = await logout();
  if (res.ok) {
    dispatch(clearSession());
  }
};

const reducer = (state = { user: null }, action) => {
  switch (action.type) {
    case NEW_SESSION: {
      const newState = {};
      newState.user = action.user;
      return newState;
    }
    case SET_SESSION: {
      const newState = {};
      newState.user = action.user;
      return newState;
    }
    case CLEAR_SESSION: {
      return { user: null };
    }
    default:
      return state;
  }
};

export default reducer;
