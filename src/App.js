import React from "react";
import {Route, Switch} from "react-router-dom";

//components 
import Signin from "./components/Signin";
import Resetpassword from "./components/Resetpassword";
import Employees from "./components/Employees";
import Suspects from "./components/Suspects";
import AddEmployee from "./components/AddEmployee";
import AddSuspect from "./components/AddSuspect";
import EmployeeDetails from "./components/EmployeeDetails";
import SuspectDetails from "./components/SuspectDetails";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/reset-password" component={Resetpassword} />
        <Route path="/suspects" component={Suspects} />
        <Route path="/add-employee" component={AddEmployee} />
        <Route path="/add-suspect" component={AddSuspect} />
        <Route path="/employees/:id" component={EmployeeDetails} />
        <Route path="/suspects/:id" component={SuspectDetails} />
        <Route path="/employees" component={Employees} />
      </Switch>
    </div>
  );
}

export default App;
