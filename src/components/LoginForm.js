import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './LoginForm.css'
import { Link, useHistory} from 'react-router-dom'

//const [isSubmitted, setIsSubmitted] = useState(false);




const users = [
  {
    email: 'admin@admin.pl',
    password: 'admin'
  },
  {
    email: 'patryk@lason',
    password: 'patryk'
  }

]

function LoginForm(props) {

  let history = useHistory();

  const [response, setResponse] = useState({});

  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    uname: "Do podanego adresu email nie jest przypisane konto!",
    pass: "Nieprawidłowe hasło!",
    empty: "Wypełnij wszystkie pola!",
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function clicked(event) {
    const result = await window.db.sayHello('hello from React!');
    console.log(result);
  }

  const handleEmailChange = (event) => {
    const nextFormState = {
      email: event.target.value,
      password: form.password,
    };

    setForm(nextFormState);
  }

  const handlePasswordChange = (event) => {
    const nextFormState = {
      email: form.email,
      password: event.target.value,
    };

    setForm(nextFormState);
  }

  async function handleSubmit(event) {
    event.preventDefault();


    if(form.email === '' || form.password === '') {
      setErrorMessages({name: "empty", message: errors.empty});
      return;
    }

    const dbResult = await window.db.validateLogin(form);
    console.log(dbResult);

    if (typeof dbResult.email === 'undefined') {
      setErrorMessages({name: "uname", message: errors.uname});
    }
    else {
      if(typeof dbResult.password === 'undefined') {
        setErrorMessages({name: "pass", message: errors.pass});
      }
      else{
        //window.localStorage.setItem('clientID', dbResult.clientID);
        window.sessionStorage.setItem('clientID', dbResult.clientID);
        history.push('/fleet');
      }
    }
    /*const foundData = users.find((user) => user.email === form.email)

    if(foundData) {
      if(foundData.password !== form.password) {
        setErrorMessages({name: "pass", message: errors.pass});
      }
      else {
        history.push("/fleet");
      }
    }
    else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }*/
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
      <motion.div className="login-container"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.5, delay: 0.1}}
      >
        <h1>Zaloguj się</h1>
        <div className="login-image-container">
          <i className="fa-solid fa-user-tie"></i>
        </div>
        <form className="login-form" onSubmit={(event) => {handleSubmit(event);}}>
          <input type="email" name="login-user-login" placeholder="E-mail" value={form.email} onChange={handleEmailChange}/>
          <input type="password" name="login-user-password" placeholder="Hasło" value={form.password} onChange={handlePasswordChange}/>
          {renderErrorMessage("pass")}
          {renderErrorMessage("uname")}
          {renderErrorMessage("empty")}
          <input type="submit" name="btn-login-confirm" value="Zaloguj"/>
        </form>
        <Link to="/register" className="btn-open-create-account-form">Nie masz konta? Zarejestruj się!</Link>
      </motion.div>
    </div>
  );
}




export default LoginForm