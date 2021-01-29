//Redux Imports
import { createStore, compose, combineReducers, applyMiddleware } from "redux";

//Middleware Imports
import thunk from "redux-thunk";
import logger from "redux-logger";

//Reducers
import sessionReducer from "./session";
import searchReducer from "./search";
import tabsReducer from "./tabs";
import messageReducer from "./message";
import profileReducer from "./profile";
import requestsReducer from "./requests";

//Combines Reducers into one reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  tabs: tabsReducer,
  requests: requestsReducer,
  search: searchReducer,
  profile: profileReducer,
  message: messageReducer,
});

let enhancer;
// Production only needs thunk
if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  // Dev we need devtools and logger
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
