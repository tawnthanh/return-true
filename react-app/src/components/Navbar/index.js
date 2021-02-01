import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import "./navbar.css";
import "font-awesome/css/font-awesome.min.css";
import Search from "../Search";
import RequestList from "../Request/RequestList";
import DialoguesList from "../Message/DialoguesList";

const NavBar = ({ setAuthenticated, authenticated, isOpen, setIsOpen }) => {
  const user = useSelector(state => state.session.user)
  const [search, setSearch] = useState(false)
  const [requests, setRequests] = useState(false)
  const [dialogues, setDialogues] = useState(false)

  const switchSideBar = (key) => {
    const sideBars = {
      "search": [search, setSearch],
      "requests": [requests, setRequests],
      "dialogues": [dialogues, setDialogues],
    }

    if (sideBars[key][0]) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
      sideBars[key][1](true);
      for (let bar in sideBars) {
        if (bar !== key) {
          sideBars[bar][1](false);
        }
      }
    }
  };

  useEffect(() => {
    if (!authenticated) {
      setIsOpen(false);
    }
  }, [authenticated, setIsOpen]);

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" exact={true} className="active">
              <i className="fa fa-home fa-home fa-3x"></i>
            </NavLink>
          </li>
          {authenticated && <li>
            <div onClick={() => switchSideBar("search")} className="active search-button">
              <i className="fa fa-search fa-3x"></i>
            </div>
          </li>}
          {authenticated && <li>
            <div onClick={() => switchSideBar("requests")} className="active search-button">
              <i className="fa fa-handshake fa-3x"></i>
            </div>
          </li>}
          {authenticated && <li>
            <div onClick={() => switchSideBar("dialogues")} className="active search-button">
            <i className="fa fa-comment fa-3x" aria-hidden="true"></i>
            </div>
          </li>}
          {!authenticated && <li>
            <NavLink to="/login" exact={true} className="active">
              <i className="fa fa-sign-in fa-3x" aria-hidden="true"></i>
            </NavLink>
          </li>}
          {/* <li>
            <NavLink to="/messages/1" exact={true} className="message">
            <i className="fa fa-comment fa-3x" aria-hidden="true"></i>
            </NavLink>
            </li> */}
          {!authenticated && (
            <li>
              <NavLink to="/sign-up" exact={true} className="active">
                <i className="fa fa-user-plus fa-3x" aria-hidden="true"></i>
              </NavLink>
            </li>
          )}
          {authenticated && (
            <li>
              <NavLink to={`/users/${user.id}`} exact={true} className="active">
                <i className="fa fa-user fa-3x" aria-hidden="true"></i>
              </NavLink>
            </li>
          )}
          {authenticated && (
            <li className="logoutbutton">
              <LogoutButton setAuthenticated={setAuthenticated} />
            </li>
          )}
          {authenticated && (
            <li className="logoutbutton">
              <NavLink to="/credits" exact={true} className="active">
                <i class="fa fa-copyright fa-3x"></i>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      { isOpen && search &&
        <Search />
      }
      { isOpen && requests &&
        <RequestList />
      }
      { isOpen && dialogues &&
        <DialoguesList />
      }
    </>
  );
};

export default NavBar;
