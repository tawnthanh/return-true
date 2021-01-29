import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Message from "./components/Message";
import HomePage from "./components/HomePage";
import { sessionAuthenticate } from "./store/session";
import { useSelector, useDispatch } from "react-redux";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TabBar from "./components/TabBar";
import Request from "./components/Request";
import {resetTabs} from "./store/tabs";
import { authenticate } from "./services/auth";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);

  const [isOpen, setIsOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionAuthenticate())
    .then((res) => {
      console.log("hi!!!!!!!!!!!!!!")
      setAuthenticated(true)
      setLoaded(true)
      }
    ).catch((err)=>{
      console.log('catch statement!!!!!')
      setAuthenticated(false)
      setLoaded(true)
    });

  }, [dispatch]);



  useEffect(()=>{
    if (!authenticated){
      dispatch(resetTabs())
    }
  },[authenticated])
  console.log('authenticated', authenticated)
  console.log('loaded', loaded)
  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
     <h1 className="header"> <span style={{color:"#bb86c0"}}>return</span> <span style={{color:"#2566ca"}}>true</span>;</h1>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} icon={faTimes}
              isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`content${isOpen?" open":""}`}>
      <TabBar/>
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
              path="/users"
              exact={true}
              authenticated={authenticated}
            >
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute
              path="/users/:userId"
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
              <Request authenticated={authenticated}/>
            </ProtectedRoute>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route path="/edit-profile" exact={true} authenticated={authenticated}>
              <h1>Hi</h1>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
