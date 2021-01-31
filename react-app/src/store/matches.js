const GET_MATCHES = "matches/get";

const saveMatches = (match, id) => {
  return { 
    type: GET_MATCHES, 
    match,
    id
  };
};

export const getMatches = (id) => async dispatch => {
  let res = await fetch(`/api/match/${id}`)
  if (res.ok) {
    res = await res.json();
    console.log("matches: ", res.matches)
    console.log("this_user: ", res.this_user)
  }
  // if (!res.errors) {
  //   questions = res.questions
  // } else {
  //   return res;
  // }
  // dispatch(saveMatches(res.matches,id))
  return true
}

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES: {
      let newState = {...state};
      newState[action.id] = action.matches;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
