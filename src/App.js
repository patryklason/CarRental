import './App.css';
import Navbar from './components/Navbar'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import Fleet from "./components/Fleet";
import Rents from "./components/Rents";
import Account from "./components/Account";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
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
              <Route path="/account" component={Account}/>
            </div>
          </div>
        </Switch>
      </HashRouter>
      {/*<Navbar />
      <div className="pageContent">
        <Switch>
          <Route exact path="/fleet" component={Fleet}/>
          <Route path="/rents" component={Rents}/>
          <Route path="/account" component={Account}/>
        </Switch>
      </div>*/}
    </div>
  );
}

export default App;
