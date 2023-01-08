import React from 'react'
import './Navbar.css'
import NavButton from './NavButton'
import Fleet from './Fleet'
import Rents from './Rents'
import { HashRouter, NavLink, Route, } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <i className="fa-solid fa-car"></i>
            <span className="company-name">Car Rental</span>
          </li>
          <li>
            <NavLink to="/fleet" activeClassName="Link-active" className="Link-style">Flota</NavLink>
          </li>
          <li>
            <NavLink to="/rents" activeClassName="Link-active" className="Link-style">Wypożyczenia</NavLink>
          </li>
          <li>
            <i className="fa-solid fa-user"></i>
            <div className="nav-dropdown">
              <NavLink to="/account" className="Link-style">
                <btn className="nav-btn-user nav-account">Konto</btn>
              </NavLink>
              <NavLink to="/" className="Link-style">
                <btn className="nav-btn-user nav-logout">Wyloguj</btn>
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
        );
  }
}

export default Navbar