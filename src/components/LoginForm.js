import React from 'react'
import './LoginForm.css'
import { Link, useHistory} from 'react-router-dom'

const handleSubmit = (event, history) => {
  event.preventDefault();
  history.push("/fleet");
}

function LoginForm() {

  let history = useHistory();

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
      <div className="login-container">
        <h1>Zaloguj się</h1>
        <div className="login-image-container">
          <i className="fa-solid fa-user-tie"></i>
        </div>
        <form className="login-form" onSubmit={(event) => {handleSubmit(event, history);}}>
          <input type="text" name="login-user-login" placeholder="E-mail"/>
          <input type="password" name="login-user-password" placeholder="Hasło"/>
          <input type="submit" name="btn-login-confirm" value="Zaloguj"/>
        </form>
        <Link to="/register" className="btn-open-create-account-form">Nie masz konta? Zarejestruj się!</Link>
      </div>
    </div>
  );
}




export default LoginForm