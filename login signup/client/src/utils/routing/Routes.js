import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        
      </Switch>
    </div>
  );
};

export default Routes;
