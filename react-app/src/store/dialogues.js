const GETALL_DIALOGUES = "dialogues/get_all";
const NEW_DIALOGUE = "dialogues/new";

const addDialogue = (dialogue) => {
  return { 
    type: NEW_DIALOGUE, 
    dialogue 
  };
};

const getAllDialogues = (dialogues) => {
  return { 
    type: GETALL_DIALOGUES, 
    dialogues
  };
};


export const createRequest = userId => async dispatch => {
  let res = await fetch('/api/dialogues/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  });

  res = await res.json();
  if (!res.errors) {
    return dispatch(addDialogue(res));
  } else {
    return res;
  }
}

export const getDialogues = () => async dispatch => {
  let res = await fetch('/api/dialogues/')
  res = await res.json();
  if (!res.errors) {
    return dispatch(getAllDialogues(res.dialogues));
  } else {
    return res;
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_DIALOGUE: {
      const newState = [...state];
      newState.push(action.dialogue);
      newState.sort((a,b)=>{
        if (a.user < b.user) return -1
        else return 1
      })
      return newState;
    }
    case GETALL_DIALOGUES: {
      const newState = [...action.dialogues];
      newState.sort((a,b)=>{
        if (a.user < b.user) return -1
        else return 1
      })
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
