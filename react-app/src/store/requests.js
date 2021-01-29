const ADD_REQUEST = "request/add";
const REMOVE_REQUEST = "request/remove";
const EDIT_REQUEST = "request/edit";
const GETALL_REQUEST = "request/get_all";
const START_REQUEST = "request/start";

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

const editRequest = (request) => {
  return { 
    type: EDIT_REQUEST, 
    request
  };
};

const addAnswers = (answers, requestId) => {
  return {
    type: START_REQUEST,
    answers,
    requestId
  }
}

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

export const updateRequest = request => async dispatch => {
  let res = await fetch(`/api/request/${request.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  res = await res.json();
  if (!res.errors) {
    return dispatch(editRequest(res));
  } else {
    return res;
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

export const saveAnswers = (requestId, answersArray) => async dispatch => {
  let res = await fetch(`/api/request/${requestId}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answersArray)
  });
  if (res.ok) {
    res = await res.json()
    return dispatch(addAnswers(res.answers, requestId));
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
    case EDIT_REQUEST: {
      const newState = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.request.id) {
          newState.push(state[i])
        } else {
          newState.push(action.request)
        }
      }
      newState.sort((a,b)=>{
        if (a.title < b.title) return -1
        else return 1
      })
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
    case START_REQUEST: {
      const newState = [];
      for (let i = 0; i < state.length; i++) {
        let req = {...state[i]};
        if (state[i].id === action.requestId) {
          req.answers=action.answers;
          req.active=true;
        }
        newState.push(req)
      }
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
