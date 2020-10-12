import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login/Login.js";
import Signup from "./Login/Signup.js";
import axios from 'axios';
import { jsPDF } from "jspdf";

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
import Report_modal from "./views/Report_Modal.jsx";
import Chartlist from "./pdf/chart.js";
import PDF from "./pdf/PDF";

import { Area, Line, Bar } from "chart.js";
import { useReactToPrint } from 'react-to-print';



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
    <Route exact path="/" component={Login}  />
    <Route path="/signup" component={Signup}/>
      
    <Route path="/admin/dashboard" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/devices" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/sensors" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/alarms" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/reports" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/report_modal" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/chart" component={Chartlist}/>
    <Route path="/admin/prtg-test" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/prtg-nx-cloud" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/maps" render={props => <AdminLayout {...props} />} />
    <Route path="/admin/user" render={props => <AdminLayout {...props} />} />



   </Switch>


 </BrowserRouter>


  ,document.getElementById("root")
);
