import React from 'react'
import { motion } from 'framer-motion'
import './styles/Navbar.css'
import NavButton from './NavButton'
import Fleet from './Fleet'
import Rents from './Rents'
import { HashRouter, NavLink, Route, } from 'react-router-dom'

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    window.sessionStorage.removeItem('clientID');
  }

  render() {
    return (
      <motion.nav

      >
        <ul>
          <li>
            <i className="fa-solid fa-car"></i>
            <span className="company-name">Car Rental</span>
          </li>
          <motion.li
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
          >
            <NavLink to="/fleet" activeClassName="Link-active" className="Link-style">Flota</NavLink>
          </motion.li>
          <motion.li
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
          >
            <NavLink to="/rents" activeClassName="Link-active" className="Link-style">Wypożyczenia</NavLink>
          </motion.li>
          <motion.li
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
          >
            <i className="fa-solid fa-user"></i>
            <div className="nav-dropdown">
              <NavLink to="/account" className="Link-style">
                <button className="nav-btn-user nav-account">Konto</button>

              </NavLink>
              <NavLink to="/" className="Link-style">
                <button onClick={this.logout} className="nav-btn-user nav-logout">Wyloguj</button>
              </NavLink>
            </div>
          </motion.li>
        </ul>
      </motion.nav>
        );
  }
}

export default Navbar