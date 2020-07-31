import React, { Component, useState, useEffect } from 'react'

import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import axios from 'axios';
import { BrowserRouter} from "react-router-dom";
import {Router, Route, Link, RouteHandler} from 'react-router';
import history from "../helper/history";

import "./Login.css";
require('dotenv').config()


// import { UserLogin } from "../API/api.jsx";
// import SignUp from "./Signup.js";
// import { registerUser } from 'API/api';


//  ระบบ Login ที่ควรมี
// Signing &signing out
// Password reset
//  Profile page

// export function Register(props) {
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [name, setName] = useState('')

//     const insertUser = async (e) => {
//       e.preventDefault();
//       let user = {
//         username: username,
//         password: password,
//         name: name
//       }
//       // let result = await registerUser(user)
//       // console.log(user);
      
//       // localStorage.setItem
//     }
  
// }


export default class Login extends React.Component {  
    constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: '',
          error: '',
          loader : 0
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


  handleSubmit = async (e) => {
      e.preventDefault();

      const url = process.env.REACT_APP_API_USERLOGIN;
  
      const user = {
  
          username: this.state.username,
          password: this.state.password,
      }
  
      await axios.post(url, user)
      .then((res) => {
        localStorage.setItem('access_token', res.data.result.data.token);
          //handle your login 
          this.props.history.push('/admin/dashboard')
          // console.log(res);
          // console.log(this.props);


      })
      .catch((e) => {

          //handle your errors
          // console.log({...e});

      });

  }

  handleSignup = () => {
      this.props.history.push("/signup")
  }


    render() {
      return (
          <div className="content">
                  <Grid fluid>
                      <Col md={12}>
                          <Card title="Cloud Platform"
                              content={

              <form onSubmit={this.handleSubmit}>

                  <div className="form-group">
                  <h2>Login Pretty Please...</h2>
                  <br></br>
                  Username: <br></br>
                  <input type = "text" onChange={this.handleUserName} name= "username" className="form-control" placeholder="Enter Username"></input>
                  <br></br>

                  <br></br>
                  Password: <br></br>
                  <input type = "password" name = "password" onChange={this.handlePassword} className="form-control" placeholder="Enter Password"></input>
                  <br></br>
                  <br></br>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                  <br></br>
                  <button type="button" onClick={this.handleSignup} className="btn btn-primary btn-block">Sign up</button>
                  </div>

              </form>
                              }
                          >
                      </Card>
                  </Col>
              </Grid>
          </div>
  
      )
    }
  }