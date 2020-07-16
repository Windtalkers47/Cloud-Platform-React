// import React, { Component } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Card from "components/Card/Card.jsx";
// import { Grid, Row, Col, Table } from "react-bootstrap";

// export default class Dropdown extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       customers: [],
//       vm: [],
//     };
//     this.handlecustomers = this.handlecustomers.bind(this);
//     this.handlevm = this.handlevm.bind(this);
//   }

//   // เซ็ต State ส่งค่าไปที่ Button ของ VM
//   handlevm = (e) => {
//     // this.setState({ vm: event.target.value });
//     var datavm = { vm: e.target.value };
//     axios
//       .post("http://203.151.34.28:5000/api/selectCustomer", datavm)
//       .then((res) => {
//           console.log(res);
          
//         // this.setState({ vm: res.data });
//       });
//   };

//   // เซ็ต State สำหรับปุ่มรับค่า Customer รับค่าเข้ามาใช้หน้า Interface
//   handlecustomers = (e) => {
//     var data = { customer: e.target.value };
//     axios
//       .post("http://203.151.34.28:5000/api/selectCustomer", data)
//       .then((res) => {
//         this.setState({ vm: res.data });
//       });
//   };

//   // Life Cycle ที่ใช้ลองเรียกข้อมูลออกมาดู
//   componentDidMount() {
//     // console.log(this.state.sdate);

//     axios.post("http://203.151.34.28:5000/api/selectCustomer")
//     .then((res) => {
//       let selectcustomer = res.data;
//       // console.log(res);

//       console.log(selectcustomer);
//       this.setState({ vm: selectcustomer });

//       let selectvm = res.data.result;
//       console.log(res);

//       let customers = [];
//       let vm = [];

//       // กำหนด State แต่ละตัวให้เก็บข้อมูลของ
//       //   this.groupCustomer(selectcustomer);
//       this.setState({ customers: selectcustomer });
//       this.setState({ vm: selectvm });
//     });
//   }

//   render() {
//     return (
//       <div>
//         <select id="dropdown" onChange={this.handlecustomers}>
//           <option value="">Select Customer</option>
//           {this.state.customers
//             ? this.state.customers.map((item, key) => {
//                 return (
//                   <option key={key} value={item}>
//                     {item}
//                   </option>
//                 );
//               })
//             : null}
//         </select>

//         {/* <div>Selected customer is : {this.state.customers}</div> */}

//         {/* device?.map((item,i)=>{
//                               return(<React.Fragment>

//                               </React.Fragment>)
//                             }) */}
//         <br></br>
//         <br></br>

//         <select id="dropdown" onChange={this.handlevm}>
//           <option value="">Select VM</option>
//           {this.state.vm
//             ? this.state.vm.map((item, key) => {
//                 return (
//                   <option key={key} value={item}>
//                     {item}
//                   </option>
//                 );
//               })
//             : null}
//         </select>

//         {/* <div>Selected device is : {this.state.vm}</div> */}
//       </div>
//     );
//   }
// }
