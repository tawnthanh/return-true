const SET_SEARCH = "search/SET_SEARCH"

const searchResults = (results) => {
  return {type: SET_SEARCH, results}
}

export const findResults = (word) => async (dispatch) => {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(word)
  })
  // const res = await fetch("/api/search")
  const results = await res.json()
  dispatch(searchResults(results))
}


const reducer = (state = { results: null }, action) => {
  switch (action.type) {
    case SET_SEARCH: {
      return action.results;
    }
    default:
      return state;
  }
}

export default reducer;
