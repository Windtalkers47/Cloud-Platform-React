import React, { Component } from 'react'
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import "./Login.css";
import axios from 'axios';


// export default class Signup extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//           myUsers:[]
//         }
//       }

//     loginauth = () => {
//         axios.post('http://192.168.250.35:5000/user/login')
//         // http://192.168.250.53:5000/api/getAllDevices
//         // 192.168.250.53:5000/api/getHistoricData
//         .then(res=>{
//           let users = res.data.result
//           console.log(users)
      
//           // myUsers = res.data;
//           // this.setState({myUsers: res });
      
//           // sensors.map(sensor =>{
//           //   console.log(sensor);
//           //   // this.setState({myUsers:sensor})
//           // })
//           // return res
          
//         })
//       }
//       componentDidMount(){
//         // console.log(this.chart);
//         this.loginauth()
//         this.setState({myUsers: this.chart });
//         console.log(this.state.myUsers)
//       }


//     render() {
//         return (
//             <div className="content">
//                 <Grid fluid>
//                     <Col md={12}>
//                         <Card title="Register Form"
//                             content={
//             <form>
//                 {/* <h3>Register Form</h3> */}

//                 <div className="form-group">
//                     <label>First name</label>
//                     <input type="text" className="form-control" placeholder="First name" />
//                 </div>

//                 <div className="form-group">
//                     <label>Last name</label>
//                     <input type="text" className="form-control" placeholder="Last name" />
//                 </div>

//                 <div className="form-group">
//                     <label>User Name</label>
//                     <input type="email" className="form-control" placeholder="Enter email" />
//                 </div>

//                 <div className="form-group">
//                     <label>Password</label>
//                     <input type="password" className="form-control" placeholder="Enter password" />
//                 </div>

//                 <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
//                 <p className="forgot-password text-right">
//                     Already registered <a href="/">sign in?</a>
//                 </p>
//             </form>
//             }
//             >

//             </Card>
//             </Col>
//             </Grid>
//             </div>
//         );
//     }
// }

export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
            username: '',
            email:'',
            password: '',
            passwordCheck:''
        };
    }
    
    handleUserName = (e) => {
    
        this.setState({
    
            [e.target.name]: e.target.value
    
        });
    }
    
    handleEmail = event => {
        this.setState({email: event.target.value});
    }
    
    handlePassword = event => {
        this.setState({password: event.target.value});
    }
    
    handlePasswordCheck = event => {
        this.setState({passwordCheck: event.target.value});
    }
    
    handleSubmit = async (e) => {
    
        e.preventDefault();
    
        const url = process.env.REACT_APP_API_SIGNUP;
        console.log(url)
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordCheck: this.state.passwordCheck
        }
    
        console.log(user);

        await axios.post(url, user).then((res) => {
    
            //handle your login 
            console.log(res);
            
    
        })
        .catch((e) => {
    
            console.log({...e})
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
                <h3>Register form</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.handleUserName} name= "username" className="form-control" placeholder="Enter user name" />
                </div>

                {/* <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div> */}

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleEmail} name= "email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name = "password" onChange={this.handlePassword} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Password Confirm</label>
                    <input type="password" name = "passwordCheck" onChange={this.handlePasswordCheck} className="form-control" placeholder="Confirm password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
            </form>
                              }
                              >
                          </Card>
                      </Col>
                  </Grid>
              </div>
        );
    }
}