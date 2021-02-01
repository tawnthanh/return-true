const SET_PROFILE = "profile/set";
const SET_USER = "user/set";
const GET_FORM_DETAILS = "profile_form/GET_FORM_DETAILS";
const SET_FORM_DETAILS = "profile_form/SET_FORM_DETAILS";

const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});

const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

const setProfileFields = (payload) => ({
  type: GET_FORM_DETAILS,
  payload
});

const updateProfileFields = (payload) => ({
  type: SET_FORM_DETAILS,
  payload
});

export const getProfile = (userId) => async (dispatch) => {
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

export const getProfileFields = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/edit-profile`)
  if (res.ok) {
    let profileFields = await res.json()
    let location;
    if (profileFields.profile.location_id === 0) {
      dispatch(setProfileFields({...profileFields.profile}))
    } else {
      location = await fetch(`/api/options/locations/${profileFields.profile.location_id}`)
      location = await location.json()
      const profile = { ...profileFields.profile, ...location.locations }
      dispatch(setProfileFields(profile));
    };
    return profileFields;
  }
}

export const updateProfile = (profileObj) => async (dispatch) => {
    const res = await fetch(`/api/users/${profileObj.user_id}/edit-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profileObj)
    })
  console.log(profileObj)
  dispatch(setProfileFields(profileObj));
  return profileObj;
}

const initState = {};
const profileReducer = (state = initState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_PROFILE:
      newState = {
        ...action.payload,
      };
      return newState;
    case SET_USER:
      newState = {
        ...action.payload,
      };
      return newState;
    case GET_FORM_DETAILS:
      newState = {
        ...action.payload,
      };
      return newState;
    case SET_FORM_DETAILS:
      newState = {
        ...action.payload
      };
      return newState;
    default:
      return state;
  }
};

export default profileReducer;
