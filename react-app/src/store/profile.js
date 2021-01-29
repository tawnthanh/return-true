const SET_PROFILE = "profile/set";
const SET_USER = "user/set";

const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});
const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const getProfile = (userId) => async (dispatch) => {
  console.log(userId);
  const res = await fetch(`/api/users/${userId}/profiles`);
  if (res.ok) {
    let response = await res.json();
    dispatch(setProfile(response.profile));
    return response;
  }
};

export const getUser = (userId) => async (dispatch) => {
  console.log(userId);
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    let response = await res.json();
    dispatch(setUser(response));
    return response;
  }
};

const initState = {};
const profileReducer = (state = initState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_PROFILE:
      // for (let profile of action.payload) {
      //   newState[profile.id] = profile;
      // }
      newState = {
        ...action.payload,
      };
      return newState;
    case SET_USER:
      // for (let profile of action.payload) {
      //   newState[profile.id] = profile;
      // }
      newState = {
        ...action.payload,
      };
      return newState;
    default:
      return state;
  }
};

export default profileReducer;
