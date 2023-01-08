import React from 'react'
import './RegisterForm.css'
import { Link } from 'react-router-dom'

class RegisterForm extends React.Component {
  render() {
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <i className="fa-solid fa-car"></i>
              Car Rental
            </li>
          </ul>
        </nav>
        <div className="pageContent">
        <div className="register-container">
          <h1>Zarejestruj się</h1>
          <div className="login-image-container">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <form className="register-form">
            <input type="text" name="register-client-id" placeholder="Numer Dowodu Osobistego"/>
            <input type="text" name="register-firstname" placeholder="Imię"/>
            <input type="text" name="register-surname" placeholder="Nazwisko"/>
            <input type="text" name="register-driver-license" placeholder="Numer Prawa Jazdy"/>
            <input type="text" name="register-country" placeholder="Kraj"/>
            <input type="text" name="register-city" placeholder="Miejscowość"/>
            <input type="text" name="register-street" placeholder="Ulica i numer domu"/>
            <input type="text" name="register-phone" placeholder="Numer Telefonu"/>
            <input type="text" name="register-email" placeholder="E-mail"/>
            <input type="text" name="register-password" placeholder="Hasło"/>
            <input type="submit" name="btn-register-confirm" value="Zarejestruj się"/>
          </form>

          <Link to="/" className="btn-open-login-form">Masz już konto? Zaloguj się!</Link>
        </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm