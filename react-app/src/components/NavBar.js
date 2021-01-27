import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <NavLink to="/" exact={true} className="active">
            <i className="fa fa-home fa-home fa-3x"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} className="active">
          <i class="fa fa-sign-in fa-3x" aria-hidden="true "></i>

          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} className="active">
          <i class="fa fa-user-plus fa-3x" aria-hidden="true"></i>

          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} className="active">
          <i class="fa fa-user fa-3x" aria-hidden="true"></i>
          </NavLink>
        </li>
        <li className="logoutbutton">
          <LogoutButton setAuthenticated={setAuthenticated}/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;