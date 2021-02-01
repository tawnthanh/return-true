
import thunk from "redux-thunk";

const ADD_MESSAGE = "message/ADD_MESSAGE"
const DISPLAY_MESSAGE = "message/DISPLAY_MESSAGE"

export const addMessages = (messages) => {
    return {
        type: ADD_MESSAGE,
        messages
    }
  };

export const displayMessages = (messages) => {
    return {
        type: DISPLAY_MESSAGE,
        messages
    }
}

export const addMessage = (dialogueId, text) => async(dispatch) => {
    const results = await fetch(`/api/users/messages/1`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ text })
    });

    let messages = await results.json();
    dispatch(addMessages(messages));
    return messages;

}
export const getMessages = (id) => async(dispatch) => {
    const results = await fetch(`/api/users/messages/${id}`);

    let messages = await results.json();
    dispatch(displayMessages(messages));
    return messages;
}

// export const postMessages = (message, dialogueId) => async (dispatch) => {

//     const results = await fetch(`/api/users/messages/${dialogueId}`, {

//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({dialogueId, message})
//     })
//     let response = await results.json()
//     console.log(response)
//     const {dialogueId, message} = message
//     dispatch(addMessages(response))
//   }

//   export const removeMessages = (message) => async (dispatch) => {
//     const results = await fetch("/api/dialogue", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({message})
//     })
//     const messages = await results.json()

//     dispatch(deleteMessages(messages))
//   }

  const messageReducer = (state=[], action) => {
    let newState;
    switch (action.type) {
        // case ADD_MESSAGE:
        //     newState = Object.assign({}, state)
        //     return newState
        case DISPLAY_MESSAGE:
            newState = [...action.messages];
            // newState.messages = action.messages
            return newState;
        case ADD_MESSAGE:
            newState = [...state, action.messages];
            return newState;
        default:
            return state;
    }

  }

export default messageReducer;
