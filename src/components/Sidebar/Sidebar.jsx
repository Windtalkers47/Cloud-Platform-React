
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";

import logo from "assets/img/reactlogo.png";
import cloud from "assets/img/cloud.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  // เวลากดให้ทำงาน
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // ให้มันแสดงผลแบบ realtime ในส่วนของเมนูนะ
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  // แสดงผลภาพพื้นหลัง
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
          {this.props.hasImage ? (
            <div className="sidebar-background" style={sidebarBackground} />
          ) : (
            null
          )}
        <div className="logo"> {/* อย่าลืมเอาภาษาไทยออกเด่วมัน error =w= */}
          <a
            href="#"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={cloud} alt="logo_image" />
            </div>
          </a>
          <a
            href="/admin/dashboard" // Link ของ Logo
            className="simple-text logo-normal"
          >
             Cloud Platform {/* ชื่อ Logo ด้านซ้ายบน */}
          </a>
        </div>

        {/* ทำการห่อเมนูเอาไว้สำหรับขนาดหน้าจอ */}
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li

                    // ส่วนของ Hover Button ให้ดูดีขึ้น (สีจางๆนั้นแหละ) Template
                    className={
                      prop.upgrade
                        ? "active"
                        : this.activeRoute(prop.layout + prop.path)
                    }
                    key={key}

                  >

                    {/* ส่วนของ List เมนู */}

                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                    
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
