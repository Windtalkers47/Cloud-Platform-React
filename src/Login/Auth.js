import React, { Component } from 'react'
import Login from "./Login.js";
import Signup from "./Signup.js";
import { BrowserRouter, Route, Switch, Redirect, Router, Link } from "react-router-dom";
import AdminLayout from "../layouts/Admin";
import axios from 'axios';
import history from "./helper/history.js";


export default class Auth extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const TOKEN_KEY = "user_id";
const USER_NAME = "user_name";
const USER_ROLE = "user_role";
const USER_SERVICEROLE = "user_service_role";

export const setTokenLogin = (id, name, role, serviceRole) => {
  localStorage.setItem(TOKEN_KEY, id);
  localStorage.setItem(USER_NAME, name);
  localStorage.setItem(USER_ROLE, role);
  localStorage.setItem(USER_SERVICEROLE, serviceRole);
};

export const getDisplayName = () => {
  return localStorage.getItem(USER_NAME);
};

export const getRole = () => {
  return localStorage.getItem(USER_ROLE);
};

export const getServiceRole = () => {
  return localStorage.getItem(USER_SERVICEROLE);
};

export const isLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_NAME);
  localStorage.removeItem(USER_ROLE);
  localStorage.removeItem(USER_SERVICEROLE);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
