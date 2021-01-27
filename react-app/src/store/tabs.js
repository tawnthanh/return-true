import {store} from "../index"

const OPEN_TAB = "tab/open";
const CLOSE_TAB = "tabs/close";

export const openTab = (tab) => {
  return { 
    type: OPEN_TAB, 
    tab 
  };
};

export const closeTabAction = (tab_id) => {  
  return { 
    type: CLOSE_TAB, 
    tab_id 
  };
};

export const closeTab = tab_id => dispatch => {
  const tabs = store.getState().tabs;
  const list = Object.entries(tabs);
  let nextLink = "/";
  if (list.length > 1) {
    if (list[0][0] === tab_id){
      nextLink=list[1][1].link;
    }
    else{
      nextLink=list[0][1].link;
      for (let i = 1; i < list.length; i++){
        if (list[i][0] !== tab_id){
          nextLink=list[i][1].link;
        }
      }
    }
  }
  dispatch(closeTabAction(tab_id));
  return nextLink;
}

const initialState = {
  home: {
    tab_id: "home",
    title: "home",
    link: "/"
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TAB: {
      let newState = {...state};
      newState[action.tab.tab_id]=action.tab;
      return newState;
    }
    case CLOSE_TAB: {
      let newState = {...state};
      delete newState[action.tab_id];
      if (Object.keys(newState).length>0) return newState
      else return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
