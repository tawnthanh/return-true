const GET_ALL = "fixed/get_all";

const getQuestions = (questions, languages, frequencies, expertise) => {
  return { 
    type: GET_ALL, 
    questions,
    languages, 
    frequencies, 
    expertise
  };
};

export const pullFixed = () => async dispatch => {

  let questions =[]
  let languages =[]
  let frequencies =[]
  let expertise =[]

  let res = await fetch('/api/options/questions')
  res = await res.json();
  if (!res.errors) {
    questions = res.questions
  } else {
    return res;
  }

  res = await fetch('/api/options/languages')
  res = await res.json();
  if (!res.errors) {
    languages = res.languages
  } else {
    return res;
  }

  res = await fetch('/api/options/frequencies')
  res = await res.json();
  if (!res.errors) {
    frequencies = res.frequencies
  } else {
    return res;
  }

  res = await fetch('/api/options/expertise')
  res = await res.json();
  if (!res.errors) {
    expertise = res.expertise
  } else {
    return res;
  }
  dispatch(getQuestions(questions, languages, frequencies, expertise));
}

const initialState = {
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL: {
      let newState = {};

      let questions = {}
      for (let i = 0; i < action.questions.length; i++){
        questions[action.questions[i].id] = action.questions[i]
      }
      newState.questions=questions

      let languages = {}
      for (let i = 0; i < action.languages.length; i++){
        languages[action.languages[i].id] = action.languages[i]
      }
      newState.languages=languages

      let frequencies = {}
      for (let i = 0; i < action.frequencies.length; i++){
        frequencies[action.frequencies[i].id] = action.frequencies[i]
      }
      newState.frequencies=frequencies

      let expertise = {}
      for (let i = 0; i < action.expertise.length; i++){
        expertise[action.expertise[i].id] = action.expertise[i]
      }
      newState.expertise=expertise

      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
