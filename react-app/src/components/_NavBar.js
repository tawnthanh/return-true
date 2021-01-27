import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css';
import 'font-awesome/css/font-awesome.min.css';

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <NavLink to="/" exact={true} className="active">
            <i className="fa fa-home fa-home fa-3x"></i>
          </NavLink>
        </li>
        {!authenticated && <li>
          <NavLink to="/login" exact={true} className="active">
            <i className="fa fa-sign-in fa-3x" aria-hidden="true "></i>
          </NavLink>
        </li>}
        {!authenticated && <li>
          <NavLink to="/sign-up" exact={true} className="active">
            <i className="fa fa-user-plus fa-3x" aria-hidden="true"></i>
          </NavLink>
        </li>}
        <li>
          <NavLink to="/users" exact={true} className="active">
            <i className="fa fa-user fa-3x" aria-hidden="true"></i>
          </NavLink>
        </li>
        {authenticated && <li>
          <i className="fas fa-handshake fa-3x" aria-hidden="true"></i>
        </li> }
        {authenticated && <li className="logoutbutton">
          <LogoutButton setAuthenticated={setAuthenticated}/>
        </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
