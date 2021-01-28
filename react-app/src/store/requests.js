import {store} from "../index"

const ADD_REQUEST = "request/add";
const REMOVE_REQUEST = "request/remove";
const GETALL_REQUEST = "request/get_all"

const addRequest = (request) => {
  return { 
    type: ADD_REQUEST, 
    request 
  };
};

const removeRequest = (requestId) => {
  return { 
    type: REMOVE_REQUEST, 
    requestId 
  };
};

const getAllRequest = (requests) => {
  return { 
    type: GETALL_REQUEST, 
    requests
  };
};

export const createRequest = title => async dispatch => {
  let res = await fetch('/api/request/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title
    })
  });

  res = await res.json();
  if (!res.errors) {
    return dispatch(addRequest(res));
  } else {
    return res;
  }
}

export const destroyRequest = id => async dispatch => {
  let res = await fetch(`/api/request/${id}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    return dispatch(removeRequest(id));
  }
}

export const getRequests = () => async dispatch => {
  let res = await fetch('/api/request/')
  res = await res.json();
  if (!res.errors) {
    return dispatch(getAllRequest(res.requests));
  } else {
    return res;
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST: {
      const newState = [...state];
      newState.push(action.request);
      newState.sort((a,b)=>{
        if (a.title < b.title) return -1
        else return 1
      })
      return newState;
    }
    case REMOVE_REQUEST: {
      const newState = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.requestId) {
          newState.push(state[i])
        }
      }
      return newState;
    }
    case GETALL_REQUEST: {
      const newState = [...action.requests];
      newState.sort((a,b)=>{
        if (a.title < b.title) return -1
        else return 1
      })
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
