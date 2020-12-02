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
import PRTG_Multi_VM_ from "./views/PRTG_Multi_VM";
import Report_modal from "./views/Report_Modal.jsx";


import { Area, Line, Bar } from "chart.js";
import { useReactToPrint } from 'react-to-print';

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

var routes = {
  login: "/login",
  register: "/register",
  dashboard: "/admin/dashboard",
  reports: "/admin/reports",
  report_modal: "/admin/report_modal",
  prtg_nx_cloud: "/admin/prtg_nx_cloud",
  prtg_multi_vm: "/admin/prtg_multi_vm",
  maps: "/admin/maps",
  user: "/admin/user",
}

require('dotenv').config()


// Wrap the rendering in a function:
const render = () => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <BrowserRouter history={ history } >
    <Switch>
      <Redirect exact from="/" to={routes.login}/>
      <Route exact path={routes.login} component={Login}  />
      <Route exact path={routes.register} component={Signup}/>
     </Switch>
  
     <Switch>
      <PrivateRoute path={routes.dashboard} component={AdminLayout} render={props => <AdminLayout {...props} />} />
      <PrivateRoute path={routes.reports} component={AdminLayout} render={props => <AdminLayout {...props} />} />
      <PrivateRoute path={routes.report_modal} component={AdminLayout} render={props => <AdminLayout {...props} />} />
      <PrivateRoute path={routes.prtg_nx_cloud} component={AdminLayout} render={props => <AdminLayout {...props} />} />
      <PrivateRoute path={routes.prtg_multi_vm} component={AdminLayout} render={props => <AdminLayout {...props} />} />
      <PrivateRoute path={routes.maps} component={AdminLayout} render={props => <AdminLayout {...props} />} />
      <PrivateRoute path={routes.user} component={AdminLayout} render={props => <AdminLayout {...props} />} />
     </Switch>
  
  
   </BrowserRouter>
    
    ,
    document.getElementById('root')
  );
};

// Render once
render();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}