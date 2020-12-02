import React, { Component, useState, useEffect } from 'react'

import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import axios from 'axios';
import { BrowserRouter} from "react-router-dom";
import {Router, Route, Link, RouteHandler} from 'react-router';
import history from "../helper/history";
import NotificationSystem from "react-notification-system";

import bg_fog from "../assets/img/bg_fog.jpg";
import "./Login.css";

import { login } from "../API/api.jsx";



export default class Login extends React.Component {  
    constructor(props) {
      super(props);
      let loggedIn = false
      this.state = {
          username: '',
          password: '',
          loggedIn ,
          loader : 0,
      };
  }
  
  handleUserName = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  }

  
  handlePassword = event => {
      this.setState({password: event.target.value});
  }

  login = async (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    }
    let res = await login(user)
    console.log(res.result,'response login');

    if (res.result.status == "200") {
      // window.alert("ยินดีต้อนรับเข้าสู่ระบบค่ะ")
      localStorage.setItem('access_token', res.result.data.token)
      this.props.history.push('/admin/dashboard')                
    }
  }

  handleSignup = () => {
      this.props.history.push("/signup")
  }


    render() {

      localStorage.clear();

      return (
          <div className="contentHome" >
            <div className="mainlogin" style={{ backgroundImage: `url(${bg_fog})` }} >
                         
              <form onSubmit={this.login}>

                  <div className="form-group">
                  <h2 className="Login-text">Login...</h2>
                  <br></br>
                  Username: <br></br>
                  <input required type = "text" onChange={this.handleUserName} 
                    name= "username" className="form-control" 
                    value={this.state.username}
                    placeholder="Enter Username">
                  </input>
                  <br></br>

                  <br></br>
                  Password: <br></br>
                  <input required type = "password" name = "password" 
                    onChange={this.handlePassword} className="form-control" 
                    value={this.state.password}
                    placeholder="Enter Password">
                    
                  </input>
                  <br></br>
                  <br></br>
                  <button type="submit" className="btn btn-lg btn-block">Login</button>
                  
                  {/* <br></br> */}
                  {/* <button type="button" onClick={this.handleSignup} className="btn btn-primary btn-block">Sign up</button> */}
                  
                  </div>
              </form>
                            
            </div>
          </div>
  
      )
    }
  }