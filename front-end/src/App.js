import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import WelcomeUI from "./component/welcome.jsx";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/hashurl" component={WelcomeUI} />
        <Redirect to="/hashurl"/>
      </Switch>
    </>
  );
}

export default App;
