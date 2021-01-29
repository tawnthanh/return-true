
import thunk from "redux-thunk";

// const ADD_MESSAGE = "message/ADD_MESSAGE"
// const DELETE_MESSAGE = "message/DELETE_MESSAGE"
const DISPLAY_MESSAGE = "message/DISPLAY_MESSAGE"

// export const addMessages = (messages) => {
//     return {
//         type: ADD_MESSAGE,
//         name: messages
//     }
//   };

// export const deleteMessages = (messages) => {
//     return {
//         type: DELETE_MESSAGE,
//         messages
//     }
// }
export const displayMessages = (messages) => {
    return {
        type: DISPLAY_MESSAGE,
        messages
    }
}

// export const getMessages = (dialogueId) => async(dispatch) => {
//     const results = await fetch(`/api/users/messages/${dialogueId}`, )

//     let messages = await results.json()
//     console.log(messages)
//     dispatch(displayMessages(messages))

// }
export const getMessages = () => async(dispatch) => {
    const results = await fetch(`/api/users/messages/1`, )

    let messages = await results.json()
    console.log(messages)
    dispatch(displayMessages(messages))

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

  const messageReducer = (state={messages:null}, action) => {
    let newState;
    switch (action.type) {
        // case ADD_MESSAGE:
        //     newState = Object.assign({}, state)
        //     return newState
        case DISPLAY_MESSAGE:
            newState = {}
            newState.messages = action.messages
            return newState
        default:
            return state
    }

  }

    export default messageReducer
