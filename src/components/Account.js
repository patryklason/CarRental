import React from 'react'
import './Account.css'

class Account extends React.Component {
  render() {
    return (
      <div className="account-container">
        <h3>Twoje Konto</h3>
      <ul className="account-ul">
        <li>
          <span className="account-li-item-title">
          Numer Dowodu Osobistego
          </span>
          <span className="account-ClientID">
            AXAX
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Imię
          </span>
          <span className="account-FirstName">
            Patryk
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Nazwisko
          </span>
          <span className="account-Surname">
            Monte-Negro
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Numer Prawa Jazdy
          </span>
          <span className="account-DriverLicenseNumber">
            DADADADA
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Data dołączenia
          </span>
          <span className="account-DateOfJoining">
            08.01.2023
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Kraj
          </span>
          <span className="account-Country">
            Polska
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Miejscowość
          </span>
          <span className="account-City">
            Wrocław
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Ulica i Numer Domu
          </span>
          <span className="account-StreetAndHouseNumber">
            Ruska 69
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Numer Telefonu
          </span>
          <span className="account-Phone">
            502-502-502
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          E-mail
          </span>
          <span className="account-Email">
            coco@chanel.pl
          </span>
        </li>
      </ul>
      </div>
    );
  }
}

export default Account