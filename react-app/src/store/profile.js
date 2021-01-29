const SET_PROFILE = "profile/set";
const GET_FORM_DETAILS = "profile_form/get"

const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});

const getProfileFields = (formDetails) => ({
  type: GET_FORM_DETAILS,
  formDetails
})

export const getProfile = (userId) => async (dispatch) => {
  console.log(userId);
  const res = await fetch(`/api/users/${userId}/profiles`);
  if (res.ok) {
    let response = await res.json();
    dispatch(setProfile(response));
    return response;
  }
};

export const getProfileFields = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/edit-profile`)
  if (res.ok) {
    const profile_fields = res.json()
    dispatch(getProfile(profile_fields))
  }
  return console.log("error with fetch")
}


const initState = {};
const profileReducer = (state = initState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_PROFILE:
      for (let profile of action.payload) {
        newState[profile.id] = profile;
      }
      return newState;
    // case GET_FORM_DETAILS:
    //   newState
    default:
      return state;
  }
};

export default profileReducer;
