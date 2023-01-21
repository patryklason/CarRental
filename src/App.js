import './App.css';
import Navbar from './components/Navbar'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Fleet from "./components/Fleet";
import Rents from "./components/Rents";
import Account from "./components/Account";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Car from "./components/Car";
import React from "react";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LoginForm}/>
          <Route path="/register" component={RegisterForm}/>
          <div>
            <Navbar/>
            <div className="pageContent">
              <Route path="/fleet" component={Fleet}/>
              <Route path="/rents" component={Rents}/>
              <Route path="/rent-car" component={Car}/>
              <Route path="/account" component={Account}/>
            </div>
          </div>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
