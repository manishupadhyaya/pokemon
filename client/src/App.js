import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignUp from './Components/SignUp'
import Home from './Components/Home'
import Profile from './Components/Profile'
import SignIn from './Components/SignIn'

function App() {
  return(
    <Router>
          <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/signUp">
                <SignUp />
              </Route>
              <Route exact path="/signIn">
                <SignIn/>
              </Route>
              <Route exact path="/profile">
                <Profile/>
              </Route>
          </Switch>
        </Router>
  )
}

export default App;
