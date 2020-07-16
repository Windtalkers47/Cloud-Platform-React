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

    {/* <Route path="/pdf" component={chartlist}/> */}

    <Route exact path="/" component={Login}  />
    
    <Route path="/admin" render={props => <AdminLayout {...props} />} />
    <Redirect from="/" to="/admin/dashboard" />
    <Route path="/signup" component={Signup}/>



   </Switch>


 </BrowserRouter>


  ,document.getElementById("root")
);
