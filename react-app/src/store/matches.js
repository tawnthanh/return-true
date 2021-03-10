const GET_MATCHES = "matches/get";

const saveMatches = (matches) => {
  return { 
    type: GET_MATCHES, 
    matches
  };
};

export const getMatches = (id) => async dispatch => {
  let res = await fetch(`/api/match/${id}`)
  if (res.ok) {
    res = await res.json();
    let max_match = {};

    res.matches.forEach(current_match => {
      let user_max_match = max_match[current_match.userId]
      if (user_max_match) {
        if (user_max_match.both < current_match.both_match){
          max_match[current_match.userId].both = current_match.both_match
        }
        if (user_max_match.solo < current_match.solo_match){
          max_match[current_match.userId].solo = current_match.solo_match
        }
      } else {
        max_match[current_match.userId] = {}
        const user = {
          userId: current_match.userId,
          username: current_match.username,
          imageUrl: current_match.imageUrl
        }
        max_match[current_match.userId].user = user
        max_match[current_match.userId].both = current_match.both_match
        max_match[current_match.userId].solo = current_match.solo_match
      }
    })

    let matches = Object.values(max_match)

    dispatch(saveMatches(matches))
  }
  return true
}

const initialState = {both: [], solo: []}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES: {
      let newState = {};
      let bothArr = action.matches.map(match => ({user: match.user, match: match.both}))
      let soloArr = action.matches.map(match => ({user: match.user, match: match.solo}))
      bothArr.sort((a,b) => {
        if (a.match < b.match || (a.match === b.match && a.user.username > b.user.username)) return 1
        else return -1;
      })
      soloArr.sort((a,b)=>{
        if (a.match < b.match || (a.match === b.match && a.user.username > b.user.username)) return 1
        else return -1;
      })
      newState.both = bothArr
      newState.solo = soloArr
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
