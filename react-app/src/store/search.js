const SET_SEARCH = "search/SET_SEARCH"

const findSearch = (search) => {
  return {type: SET_SEARCH, search}
}

export const findResults = (result) => async (dispatch) => {
  results = await fetch("/api/auth/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(result)
  }
}
