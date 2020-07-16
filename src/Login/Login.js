import React, { Component, useState, useEffect } from 'react'

import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import axios from 'axios';
import { BrowserRouter} from "react-router-dom";

import "./Login.css";

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


// วิธีส่งค่า axios ไป backend

export default class PersonList extends React.Component {  
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



  handleSubmit = (e) => {
      e.preventDefault();
  
      const url = 'http://203.151.34.28:5000/user/login';
  
      const user = {
  
          username: this.state.username,
          password: this.state.password,
      }
  
      axios.post(url, user).then((res) => {
        //   if(res.status==200){
        //     console.log('Dashboard')
        //   }
  
          //handle your login 
          this.props.history.push('/admin/dashboard')
        //   localStorage.setItem(username: event.target.value);
          console.log(res);
          console.log(this.props);


      }).catch((e) => {

          //handle your errors
          console.log(e);

      });

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