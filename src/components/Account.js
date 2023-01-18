import React, { useState, useEffect } from 'react'
import './Account.css'
import { motion } from 'framer-motion'
import loginForm from "./LoginForm";

function Account(props) {

  const [userData, setUserData] = useState({});

  async function getElementsInfo() {
    const clientID = window.sessionStorage.getItem('clientID');
    const result = await window.db.getClientInfo(clientID);

    let dt = result.dateOfJoining;
    dt = dt.getDate() + '.' + (dt.getMonth() + 1) + '.' + dt.getFullYear();
    result.dateOfJoining = dt;

    setUserData(result);
  }

  useEffect(() => {
    getElementsInfo()
      .catch(err => console.log(err));
  }, []);


    return (
      <motion.div className="account-container"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.5}}
      >
        <h3>Twoje Konto</h3>
      <ul className="account-ul">
        <li>
          <span className="account-li-item-title">
          Numer Dowodu Osobistego
          </span>
          <span className="account-ClientID">
            {userData.clientID}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Imię
          </span>
          <span className="account-FirstName">
            {userData.firstName}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Nazwisko
          </span>
          <span className="account-Surname">
            {userData.surname}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Numer Prawa Jazdy
          </span>
          <span className="account-DriverLicenseNumber">
            {userData.driverLicenseNumber}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Data dołączenia
          </span>
          <span className="account-DateOfJoining">
            {userData.dateOfJoining}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Kraj
          </span>
          <span className="account-Country">
            {userData.country}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Miejscowość
          </span>
          <span className="account-City">
            {userData.city}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Ulica i Numer Domu
          </span>
          <span className="account-StreetAndHouseNumber">
            {userData.streetAndHouseNumber}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          Numer Telefonu
          </span>
          <span className="account-Phone">
            {userData.phone}
          </span>
        </li>
        <li>
          <span className="account-li-item-title">
          E-mail
          </span>
          <span className="account-Email">
            {userData.email}
          </span>
        </li>
      </ul>
      </motion.div>
    );
}

export default Account