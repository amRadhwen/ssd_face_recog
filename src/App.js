import React from "react";
import {Route, Switch} from "react-router-dom";

//css
import 'react-toastify/dist/ReactToastify.css';

//components 
import Signin from "./components/Signin";
import Resetpassword from "./components/Resetpassword";
import Employees from "./components/Employees";
import Suspects from "./components/Suspects";
import AddEmployee from "./components/AddEmployee";
import AddSuspect from "./components/AddSuspect";
import EmployeeDetails from "./components/EmployeeDetails";
import SuspectDetails from "./components/SuspectDetails";
import Notifications from "./components/Notifications";
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

//auth middlewares
import { isAuth, needAuth} from "./protection/authProtection";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={isAuth(Signin)} />
        <Route path="/home" component={needAuth(Home)} />
        <Route path="/reset-password" component={isAuth(Resetpassword)} />
        <Route path="/add-employee" component={needAuth(AddEmployee)} />
        <Route path="/add-suspect" component={needAuth(AddSuspect)} />
        <Route path="/employees/:id" component={needAuth(EmployeeDetails)} />
        <Route path="/suspects/:id" component={needAuth(SuspectDetails)} />
        <Route path="/suspects" component={needAuth(Suspects)} />
        <Route path="/employees" component={needAuth(Employees)} />
        <Route path={"/notifications"} component={needAuth(Notifications)}/>
        <Route path={"/add-user"} component={needAuth(AddUser)} />
        <Route path={"/users/:id"} component={needAuth(UserDetails)}/>
        <Route path={"/users"} component={needAuth(Users)} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
