import React from "react";
import {Route, Switch} from "react-router-dom";

//components 
import Signin from "./components/Signin";
import Resetpassword from "./components/Resetpassword";
import Employees from "./components/Employees";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/reset-password" component={Resetpassword} />
        <Route path="/employees" component={Employees} />
      </Switch>
    </div>
  );
}

export default App;
