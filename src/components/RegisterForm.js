import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Alert from "@mui/material/Alert";
import PhoneInput from 'react-phone-input-2'
import pl from 'react-phone-input-2/lang/pl.json'
import 'react-phone-input-2/lib/style.css'
import './styles/RegisterForm.css'

function RegisterForm() {

  const initialForm = {
    clientID: '',
    firstName: '',
    surname: '',
    driverLicenseNumber: '',
    dateOfJoining: '',
    country: '',
    city: '',
    streetAndHouseNumber: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const [form, setForm] = useState(initialForm);

  const [errorMessages, setErrorMessages] = useState({});
  const [showError, setShowError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const errors = {
    phone: "Podany numer telefonu jest nieprawidłowy",
    pass: "Hasło musi mieć co najmniej 6 znaków",
    passMatch: "Podane hasła się różnią",
  };

  const handleClientIDChange = (event) => {
    const nextState = form;
    nextState.clientID = event.target.value;
    setForm(nextState);
  };

  const handleNameChange = (event) => {
    const nextState = form;
    nextState.firstName = event.target.value;
    setForm(nextState);
  };

  const handleSurnameChange = (event) => {
    const nextState = form;
    nextState.surname = event.target.value;
    setForm(nextState);
  };

  const handleDriverLicenseChange = (event) => {
    const nextState = form;
    nextState.driverLicenseNumber = event.target.value;
    setForm(nextState);
  };

  const handleCountryChange = (event) => {
    const nextState = form;
    nextState.country = event.target.value;
    setForm(nextState);
  };

  const handleCityChange = (event) => {
    const nextState = form;
    nextState.city = event.target.value;
    setForm(nextState);
  };

  const handleStreetChange = (event) => {
    const nextState = form;
    nextState.streetAndHouseNumber = event.target.value;
    setForm(nextState);
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    const nextState = form;
    nextState.phone = '+' + value;

    setForm(nextState);
  };

  const handleEmailChange = (event) => {
    const nextState = form;
    nextState.email = event.target.value;
    setForm(nextState);
  };

  const handlePasswordChange = (event) => {
    const nextState = form;
    nextState.password = event.target.value;
    setForm(nextState);
  };

  const handleRepeatPasswordChange = (event) => {
    const nextState = form;
    nextState.passwordConfirm = event.target.value;
    setForm(nextState);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.phone.length < 12) {
      setErrorMessages({name: "phone", message: errors.phone});
      return;
    }

    if (form.password.length < 6) {
      setErrorMessages({name: "pass", message: errors.pass});
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setErrorMessages({name: "passMatch", message: errors.passMatch});
      return;
    }

    const accountExists = await window.db.checkAccountExists(form);

    if(accountExists) {
      setShowError(true);
      return;
    }

    setShowError(false);
    const dbResult = await window.db.createAccount(form);

    setForm(initialForm);
    setShowAlert(true);

  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

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
        <motion.div className="register-container"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5, delay: 0.1}}>
          <h1>Zarejestruj się</h1>
          <div className="login-image-container">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <label>Numer Dowodu Osobistego</label>
            <input type="text" name="register-client-id" placeholder="AXX3289182" required onChange={handleClientIDChange}/>
            <label>Imię</label>
            <input type="text" name="register-firstname" placeholder="Jan" pattern="[a-zA-Z0-9ąęźżśóćńł-]+" required onChange={handleNameChange}/>
            <label>Nazwisko</label>
            <input type="text" name="register-surname" placeholder="Kowalski" pattern="[a-zA-Z0-9ąęźżśóćńł-]+" required onChange={handleSurnameChange}/>
            <label>Numer Prawa Jazdy</label>
            <input type="text" name="register-driver-license" placeholder="B119AA213" required onChange={handleDriverLicenseChange}/>
            <label>Kraj</label>
            <input type="text" name="register-country" placeholder="Kraj" pattern="[a-zA-Ząęźżśóćńł-]+" required onChange={handleCountryChange}/>
            <label>Miejscowość</label>
            <input type="text" name="register-city" placeholder="Wrocław" pattern="[a-zA-Ząęźżśóćńł-]+" required onChange={handleCityChange}/>
            <label>Ulica i Numer Domu</label>
            <input type="text" name="register-street" placeholder="ul. Wybrzeże Wyspiańskiego 22/10" required onChange={handleStreetChange}/>
            <label>Numer Telefonu</label>
            <PhoneInput placeholder="Numer Telefonu" regions={'europe'} country={'pl'} localization={pl} countryCodeEditable={false}
            containerClass="phoneInputContainer" inputClass="phoneInput" buttonStyle={{backgroundColor: "transparent"}} onChange={handlePhoneChange}
            />
            <label>E-mail</label>
            <input type="email" name="register-email" placeholder="przyklad@pwr.pl" onChange={handleEmailChange}/>
            <label>Hasło</label>
            <input type="password" name="register-password" placeholder="Hasło" onChange={handlePasswordChange}/>
            <label>Powtórz Hasło</label>
            <input type="password" name="register-password" placeholder="Powtórz hasło" onChange={handleRepeatPasswordChange}/>
            {renderErrorMessage("phone")}
            {renderErrorMessage("pass")}
            {renderErrorMessage("passMatch")}
            <input type="submit" name="btn-register-confirm" value="Zarejestruj się"/>
          </form>

          {showError && (
            <Alert className="popup-alert" severity="error" onClose={() => {setShowError(false)}}><strong>Wystąpił Błąd!</strong> - Podany e-mail / numer telefonu / dowodu osobistego / prawa jazdy istniej(e/ą) w systemie!</Alert>
          )}

          {showAlert && (
            <Alert className="popup-alert" severity="success" onClose={() => {setShowAlert(false)}}><strong>Konto zostało utworzone!</strong> - twoje dane zostaną zweryfikowane, możesz przejść do logowania.</Alert>
          )}

          <Link to="/" className="btn-open-login-form">Masz już konto? Zaloguj się!</Link>
        </motion.div>
        </div>
      </div>
    );
}

export default RegisterForm