const SET_SEARCH = "search/SET_SEARCH"

const searchResults = (results) => {
  return {type: SET_SEARCH, results}
}

export const findResults = (word) => async (dispatch) => {
  if (word.length === 0) {
    return
  }
  const res = await fetch("/api/search/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(word)
  })
  
  const results = await res.json()
  dispatch(searchResults(results))
}


const reducer = (state = { results: null }, action) => {
  switch (action.type) {
    case SET_SEARCH: {
      let newState = {};
      newState = action.results;
      return newState;
    }
    default:
      return state;
  }
}

export default reducer;
