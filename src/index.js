import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login/Login.js";
import Signup from "./Login/Signup.js";
import axios from 'axios';


import { BrowserRouter, Route, Switch, Redirect, Router, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import signup from "./Login/Signup.js";

import PrivateRoute from "./helper/PrivateRoute.js";
import history from "./helper/history.js";
import  Dashboard from "./views/Dashboard"
import TableList from "./views/Reports";
import PRTG_Test from "./views/PRTG_Test.jsx";
import PRTG_NX_Cloud from "./views/PRTG_NX_Cloud.jsx";

require('dotenv').config()
ReactDOM.render(
  // Backup Code เผื่อพัง
  // <BrowserRouter>
  //   <Switch>
  //     <Route path="/admin" render={props => <AdminLayout {...props} />} />
  //     <Redirect from="/" to="/admin/dashboard" />
  //   </Switch>
  // </BrowserRouter>

  <BrowserRouter history={ history } >
  <Switch>
    {/* <Redirect exact from="/" to="/login"/> */}

    <Route exact path="/" component={Login}  />
    <Route exact path="/signup" component={Signup}/>
      
    <Route exact path="/admin/dashboard" render={props => <AdminLayout {...props} />} />
    {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
    <Route exact path="/admin/devices" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/sensors" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/alarms" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/reports" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/prtg-test" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/prtg-nx-cloud" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/maps" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/user" render={props => <AdminLayout {...props} />} />



   </Switch>


 </BrowserRouter>


  ,document.getElementById("root")
);
