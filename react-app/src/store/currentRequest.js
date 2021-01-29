const GET_CURRENT = "request/current";

export const getCurrent = (request) => {
  return { 
    type: GET_CURRENT, 
    request 
  };
};

const initialState = {
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT: {
      return action.request;
    }
    default:
      return state;
  }
};

export default reducer;
