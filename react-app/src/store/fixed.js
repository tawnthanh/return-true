const GET_ALL = "fixed/get_all";

const getQuestions = (questions, languages, frequencies, expertise, locations, states) => {
  return {
    type: GET_ALL,
    questions,
    languages,
    frequencies,
    expertise,
    states,
    locations,
  };
};

export const pullFixed = () => async dispatch => {

  let questions =[]
  let languages =[]
  let frequencies =[]
  let expertise = []
  let states = []
  let locations = []

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

  res = await fetch('/api/options/locations')
  res = await res.json()
  if (!res.errors) {
    locations = res.locations
  }

  res = await fetch('/api/options/states')
  res = await res.json()
  if (!res.errors) {
    states = res.states
  }

  dispatch(getQuestions(questions, languages, frequencies, expertise, locations, states));
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

      let locations = {}
      for (let i = 0; i < action.locations.length; i++){
        locations[action.locations[i].id] = action.locations[i]
      }
      newState.locations = locations

      let states = {}
      for (let i = 0; i < action.states.length; i++){
        states[action.states[i].id] = action.states[i]
      }
      newState.states=states
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
