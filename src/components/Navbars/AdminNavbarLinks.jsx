import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import history from "../../helper/history";
import { Redirect } from "react-router-dom";
import axios from "axios";
// require('dotenv').config()
class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: localStorage.getItem("access_token"),
      isLogout: false,
    };
  }

  logoutHandler = async () => {
    //handle your logout
    const url = process.env.REACT_APP_API_USERLOGOUT
    try {
      await axios.post(url, null, {
        headers: {
          authorization: `Bearer ${this.state.access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
        }
      });

      // วิธีเขียนอีกแบบ
      // axios.post('http://192.168.250.200:3000/user/logout', {},
      // { headers: {'Authorization': `Bearer ${this.state.access_token}`}})
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   });

      localStorage.removeItem("access_token");
    } catch (error) {
      console.log(error);
    }

    this.setState({ isLogout: true });
    // console.log();
    // console.log(this.state.status);
    // this.props.history.push("/login");

    // window.location.reload()
    // this.props.history.push('/')
  };

  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="/admin/dashboard">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>1</MenuItem>
            <MenuItem eventKey={2.2}>2</MenuItem>
            <MenuItem eventKey={2.3}>3</MenuItem>
            <MenuItem eventKey={2.4}>4</MenuItem>
            <MenuItem eventKey={2.5}>null</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="/user">
            Account
          </NavItem>
          <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>1</MenuItem>
            <MenuItem eventKey={2.2}>2</MenuItem>
            <MenuItem eventKey={2.3}>3</MenuItem>
            <MenuItem eventKey={2.4}>4</MenuItem>
            <MenuItem eventKey={2.5}>5</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>link</MenuItem>
          </NavDropdown>

          <NavItem eventKey={3} href="#">
            <div onClick={() => this.logoutHandler()}>Log out</div>
          </NavItem>
        </Nav>
        {this.state.isLogout === true && <Redirect to="/" push={true} />}
      </div>
    );
  }
}

export default AdminNavbarLinks;
