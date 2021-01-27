
import thunk from "redux-thunk";

const ADD_MESSAGE = "message/ADD_MESSAGE"
const DELETE_MESSAGE = "message/DELETE_MESSAGE"
const EDIT_MESSAGE = "message/EDIT_MESSAGE"

export const addMessages = (messages) => {
    return {
        type: ADD_MESSAGE,
        message
    }
  };

export const deleteMessages = (messages) => {
    return {
        type: DELETE_MESSAGE,
        message
    }
}

export const editMessages = (messages) => {
    return {
        type: EDIT_MESSAGE,
        message
    }
}

export const postMessages = (dialogueId) => async (dispatch) => {
    const results = await fetch("/api/dialogue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({dialogueId})
    })
    const messages = await results.json()

    dispatch(postMessages(messages))
  }

  export const getMessages = (message) => async (dispatch) => {
    const results = await fetch("/api/dialogue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({message})
    })
    const messages = await results.json()

    dispatch(getMessages(messages))
  }
