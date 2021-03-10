import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
import User from "./components/User";
import Message from "./components/Message";
import HomePage from "./components/HomePage";
import { sessionAuthenticate } from "./store/session";
import { pullFixed } from "./store/fixed";
import {getDialogues} from "./store/dialogues";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import TabBar from "./components/TabBar";
import Request from "./components/Request";
import {resetTabs} from "./store/tabs";
// import { authenticate } from "./services/auth";
import Credits from "./components/Credits";

function App() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionAuthenticate())
    .then(res => {
      setAuthenticated(true);
    })
    .catch((err)=>{
      setAuthenticated(false);
    })
    .finally(res=>{
      setLoaded(true);
    })

    dispatch(pullFixed());
    dispatch(getDialogues());

  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      dispatch(resetTabs());
    }
  },[authenticated,dispatch])

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      <h1 className="header">
        {" "}
        <span style={{ color: "#bb86c0" }}>return</span>{" "}
        <span style={{ color: "#2566ca" }}>true</span>;
      </h1>
      <NavBar
        setAuthenticated={setAuthenticated}
        authenticated={authenticated}
        icon={faTimes}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className={`content${isOpen ? " open" : ""}`}>
        <TabBar />
        <div className="page-container">
          <Switch>
            <Route path="/login" exact={true}>
              <LoginForm
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </Route>
            <Route path="/sign-up" exact={true}>
              <SignUpForm
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </Route>
            <ProtectedRoute path="/messages/:dialogueId" exact={true} authenticated={authenticated}>
              <Message />
            </ProtectedRoute>
            <ProtectedRoute
              path={["/users/:userId", "/users"]}
              exact={true}
              authenticated={authenticated}
            >
              <User />
            </ProtectedRoute>
            <ProtectedRoute
              path="/request/:id"
              exact={true}
              authenticated={authenticated}
            >
              <Request />
            </ProtectedRoute>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route path="/credits" exact={true}>
              <Credits/>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
