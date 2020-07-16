/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import Devices from "views/Devices.jsx";
import Sensors from "views/Sensors.jsx";
import Alarms from "views/Alarms.jsx";
import Reports from "views/Reports.jsx";
import Login from "Login/Login.js";
import Signup from "Login/Signup";



// ส่วนของ List รายการเมนู
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/Devices",
    name: "Devices",
    icon: "pe-7s-server",
    component: Devices,
    layout: "/admin"
  },
  {
    path: "/Sensors",
    name: "Sensors",
    icon: "pe-7s-signal",
    component: Sensors,
    layout: "/admin"
  },
  {
    path: "/Alarms",
    name: "Alarms",
    icon: "pe-7s-bell",
    component: Alarms,
    layout: "/admin"
  },
  {
    path: "/Reports",
    name: "Reports",
    icon: "pe-7s-print",
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },

  // {
  //   path: "/Login",
  //   name: "User",
  //   icon: "pe-7s-user",
  //   component: Login,
  //   layout: "/admin"
  // },

  // {
  //   path: "/Signup",
  //   name: "Singup",
  //   icon: "pe-7s-user-female",
  //   component: Signup,
  //   layout: "/admin"
  // },

  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "pe-7s-map-marker",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Option",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
