const SET_SEARCH = "search/SET_SEARCH"

const searchResults = (results) => {
  return {type: SET_SEARCH, results}
}

export const findResults = (result) => async (dispatch) => {
  results = await fetch("/api/auth/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(result)
  })

  dispatch(searchResults(results))
}
