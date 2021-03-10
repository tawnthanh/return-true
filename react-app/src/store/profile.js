const SET_PROFILE = "profile/set";

const setProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
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
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    let response = await res.json();
    dispatch(setProfile(response));
    return response;
  }
};

export const getProfileFields = (username) => async (dispatch) => {
  const res = await fetch(`/api/users/${username}/edit-profile`)
  if (res.ok) {
    let profileFields = await res.json()
    let location;
    if (profileFields.profile.location_id === 0) {
      dispatch(setProfile({...profileFields.profile}))
    } else {
      location = await fetch(`/api/options/locations/${profileFields.profile.location_id}`)
      location = await location.json()
      const profile = { ...profileFields.profile, ...location.locations }
      dispatch(setProfile(profile));
    };
    return profileFields;
  }
}

export const updateProfile = (profileObj) => async (dispatch) => {
  let res = await fetch(`/api/users/${profileObj.user_id}/edit-profile`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(profileObj)
  })
  if (res.ok) {
    res = await res.json();
    dispatch(setProfile(res));
    return res;
  }
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
    default:
      return state;
  }
};

export default profileReducer;
