import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import Search from "../Search";

const NavBar = ({ setAuthenticated, authenticated, isOpen, setIsOpen }) => {
  const [search, setSearch] = useState(false)
  const [requests, setRequests] = useState(false)

  const switchSideBar = (key) => {
    const sideBars = {
      "search": [search, setSearch],
      "requests": [requests, setRequests]
    }

    if (sideBars[key][0]){
      setIsOpen(!isOpen)
    } else {
      setIsOpen(true);
      sideBars[key][1](true);
      for (let bar in sideBars) {
        if (bar !== key){
          sideBars[bar][1](false)
        }
      }
    }
  }

  useEffect(()=>{
    if (!authenticated){
      setIsOpen(false)
    }
  },[authenticated])

  return (
    <>
      <nav className='navbar'>
        <ul>
          <li>
            <NavLink to="/" exact={true} className="active">
              <i className="fa fa-home fa-home fa-3x"></i>
            </NavLink>
          </li>
          {authenticated && <li>
            <a onClick={() => switchSideBar("search")} className="active search-button">
            <i className="fa fa-search fa-3x"></i>
            </a>
          </li>}
          {authenticated && <li>
            <a onClick={() => switchSideBar("requests")} className="active search-button">
            <i className="fa fa-handshake fa-3x"></i>
            </a>
          </li>}
          {!authenticated && <li>
            <NavLink to="/login" exact={true} className="active">
            <i className="fa fa-sign-in fa-3x" aria-hidden="true"></i>

            </NavLink>
          </li>}
          {!authenticated && <li>
            <NavLink to="/sign-up" exact={true} className="active">
            <i className="fa fa-user-plus fa-3x" aria-hidden="true"></i>

            </NavLink>
          </li>}
          {authenticated && <li>
            <NavLink to="/users" exact={true} className="active">
            <i className="fa fa-user fa-3x" aria-hidden="true"></i>
            </NavLink>
          </li>}
          {authenticated && <li className="logoutbutton">
            <LogoutButton setAuthenticated={setAuthenticated}/>
          </li>}
        </ul>
      </nav>
      { isOpen && search &&
        <Search />
      }
      { isOpen && requests &&
        <h1 className="sidebar">Requests</h1>
      }
    </>
  );
}

export default NavBar;
