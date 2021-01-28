import {store} from "../index"

const GET_QUESTIONS = "questions/get_all";

const getQuestions = (questions) => {
  return { 
    type: GET_QUESTIONS, 
    questions 
  };
};

export const pullQuestions = () => async dispatch => {
  let res = await fetch('/api/question/')
  res = await res.json();
  console.log(res)
  if (!res.errors) {
    dispatch(getQuestions(res.questions));
  } else {
    return res;
  }
}

const initialState = {
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS: {
      let newState = {};
      for (let i = 0; i < action.questions.length; i++){
        newState[action.questions[i].id] = action.questions[i]
      }
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
