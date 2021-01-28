const SET_PROFILE = "profile/set";

const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});

export const getProfile = (userId) => async (dispatch) => {
  console.log(userId)
  const res = await fetch(`/api/users/${userId}/profiles`);
  // const res = await fetch(`/api/search/test`);
  if (res.ok) {
    let response = await res.json();
    dispatch(setProfile(response));
    return response;
  }
};

const initState = {};
const profileReducer = (state = initState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_PROFILE:
      for (let profile of action.payload) {
        newState[profile.id] = profile;
      }
      return newState;
    default:
      return state;
  }
};

export default profileReducer;
