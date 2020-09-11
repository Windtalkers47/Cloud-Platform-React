import React, { Component } from 'react'
import {Button} from 'react-bootstrap';

import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

import { HorizontalBar, Bar, Line } from "react-chartjs-2";
import PDFexport, { toDataURL } from "../pdf/PDFexport";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import base64Img from "base64-img";
import ReactPDF from "@react-pdf/renderer";
import Datepicker from "../variables/Datepicker";
import "../variables/DateCSS.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Dropdown from "../variables/Dropdown";
import Chartlist from "../pdf/chart";
import Exportpdf from "../pdf/Exportpdf";
import { jsPDF } from "jspdf";

export default class Report_Modal extends Component {
  constructor(props) {
    super(props)
  
    this.state = {}
  }

      // JSpdf Generator For generating the PDF
      jsPdfGenerator = () => {

        // Example From https://parall.ax/products/jspdf
        var doc = new jsPDF('p', 'pt');
        
        doc.text(20, 20, 'This is the default font.')

        doc.text(20, 30, 'This is courier normal.')

        doc.text(20, 40, 'This is times italic.')

        doc.text(20, 50, 'This is helvetica bold.')

        doc.text(20, 60, 'This is courier bolditalic.')
        
        // Save the Data
        doc.save('Generated.pdf');
    }

  
  
  render() {

    return (
      <div>
      <Button onClick={this.jsPdfGenerator} type="primary"> Generate PDF </Button> 

                          {/* เงื่อนไขเช็คข้อมูลก่อนแสดงผลกราฟ */}
                          {this.state.cpu_total.length > 0 &&
                      this.state.cpu_datetime.length > 0 &&
                      this.state.cpu_downtime.length > 0 &&
                      this.state.disk_FreeSpace.length > 0 &&
                      this.state.disk_datatime.length > 0 &&
                      this.state.disk_downtime.length > 0 &&
                      this.state.memory_percent.length > 0 &&
                      this.state.memory_datetime.length > 0 &&
                      this.state.memory_downtime.length > 0 && (
                        <Chartlist
                          chartReference={this.chartReference}
                          cpu_total={this.state.cpu_total}
                          cpu_datetime={this.state.cpu_datetime}
                          cpu_downtime={this.state.cpu_downtime}
                          disk_FreeSpace={this.state.disk_FreeSpace}
                          disk_datatime={this.state.disk_datatime}
                          disk_downtime={this.state.disk_downtime}
                          memory_percent={this.state.memory_percent}
                          memory_datetime={this.state.memory_datetime}
                          memory_downtime={this.state.memory_downtime}
                          Datareport={this.state.Datareport}
                        />
                      )}
      </div>
    )
  }
}


// import React, { Component } from 'react'
// import { Grid, Row, Col, Table } from "react-bootstrap";

// import Card from "components/Card/Card.jsx";
// import { thArray, tdArray } from "variables/Variables.jsx";

// import { HorizontalBar, Bar, Line } from "react-chartjs-2";
// import PDFexport, { toDataURL } from "../pdf/PDFexport";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import base64Img from "base64-img";
// import ReactPDF from "@react-pdf/renderer";
// import Datepicker from "../variables/Datepicker";
// import "../variables/DateCSS.css";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
// import Dropdown from "../variables/Dropdown";
// import Chartlist from "../pdf/chart";
// import Exportpdf from "../pdf/Exportpdf";
// import { jsPDF } from "jspdf";


// export default class Report_Modal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           customerList: [], // เอาไว้เก็บ res.data ของ api selectCustomer ที่ Post ไว้
//           VMList: [],
//           selectedCustomer: [], // state ส่ง cus
//           selectedVM: [],
//           sdate: "",
//           edate: "",
//           access_token: localStorage.getItem("access_token"),
    
//           // State ไว้เก็บข้อมูลของ CPU
//           cpu_total: [],
//           cpu_datetime: [],
//           cpu_downtime: [],
    
//           // State ไว้เก็บข้อมูลของ Disk อาจมีหลาย Disk
//           disk_FreeSpace: [],
//           disk_datatime: [],
//           disk_downtime: [],
    
//           // State ไว้เก็บข้อมูลของ Memory
//           memory_percent: [],
//           memory_datetime: [],
//           memory_downtime: [],
    
//           // เผื่อเอาไว้รวม State จากทั้งหมด 9 State
//           DateReport: [],
//           chartData: React.createRef(),
//         };
//       }
    
//       // console.log(new Date(this.state.sdate).toString())
//       // console.log(moment(this.state.sdate).format('yyyy-MM-DD-hh-mm-ss'))
    
//       // เซ็ต State สำหรับส่งค่าทั้งกล่องเพื่อ post ไปที่ Backend
//       // โดยอ้างอิงข้อมูลจาก url ที่กำหนดถ้าข้อมูลไม่มาให้ดูตรงนี้ก่อน <<<<<
//       handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // url ที่กำหนด
//         // const url = "http://192.168.250.134:5555/api/selectVm";
//         const url = process.env.REACT_APP_API_VM;
//         // const qs = require("querystring");
//         // Object Identify ที่ใช้ในการเรียกใช้ State
//         const objid = {
//           customer: this.state.selectedCustomer,
//           device: this.state.selectedVM,
//           sdate: this.state.sdate,
//           edate: this.state.edate,
//           token: localStorage.getItem("access_token"),
//         };
    
//         try {
//           const res = await axios.post(url, objid, {
//             headers: {
//               authorization: `Bearer ${this.state.access_token}`,
//             },
//           });
//           console.log("Response Preview", res);
//           // console.log("Time", objid);
    
//           // ใช้ if ดัก data ให้มันรอและเซ็ต report ให้เก็บ res.data
//           if (res.data) {
//             this.setState({ DateReport: res.data });
//             // console.log("Data Report", res.data); // เอาไว้ดูข้อมูลทั้ง 3 ส่วน
//             // console.log('CPU Data' , res.data.cpu_data); // เอาไว้ดูข้อมูลของ CPU
//             // console.log('Disk Data', res.data.disk_data); // เอาไว้ดูข้อมูลของ Disk
//             // console.log('Memory Data', res.data.memory_data);
    
    
//             // State เก็บค่า CPU Total
//             this.setState({
//               cpu_total: res.data.cpu_data[0].raw_data.map((item) => {
//                 return item.Total;
//               }),
//             });
    
//             // State เก็บค่า CPU Datetime
//             this.setState({
//               cpu_datetime: res.data.cpu_data[0].raw_data.map((item) => {
//                 return item.datetime;
//               }),
//             });
    
//             // State เก็บค่า CPU Downtime
//             this.setState({
//               cpu_downtime: res.data.cpu_data[0].raw_data.map((item) => {
//                 return item.downtime;
//               }),
//             });
    
//             // อันนี้คือลอง map 2 ชั้น
//             // State เก็บค่า Disk Free Space
//             this.setState({
//               disk_FreeSpace: res.data.disk_data.map((item1) => {
//                 return item1.raw_data.map((item2) => {
//                   return item2.free_space;
//                 });
//               }),
//             });
    
//             // State เก็บค่า Disk datetime
//             this.setState({
//               disk_datatime: res.data.disk_data.map((item1) => {
//                 return item1.raw_data.map((item2) => {
//                   return item2.datetime;
//                 });
//               }),
//             });
    
//             // State เอาไว้เก็บค่า downtime ของ disk
//             this.setState({
//               disk_downtime: res.data.disk_data.map((item1) => {
//                 return item1.raw_data.map((item2) => {
//                   return item2.downtime;
//                 });
//               }),
//             });
    
//             // State เอาไว้เก็บค่า Datetime ของ Memory
//             this.setState({
//               memory_datetime: res.data.memory_data.map((item1) => {
//                 return item1.raw_data.map((item2) => {
//                   return item2.datetime;
//                 });
//               }),
//             });
    
//             // State เอาไว้เก็บค่า Downtime ของ Memory
//             this.setState({
//               memory_downtime: res.data.memory_data.map((item1) => {
//                 return item1.raw_data.map((item2) => {
//                   return item2.downtime;
//                 });
//               }),
//             });
    
//             // State เอาไว้เก็บค่า Percent_Available_Memory ของ Memory
//             this.setState({
//               memory_percent: res.data.memory_data.map((item1) => {
//                 return item1.raw_data.map((item2) => {
//                   return item2.percent_available_memory;
//                 });
//               }),
//             });
//           }
//         } catch (e) {
//           // console.log({...e});
//           return null;
//         }
//       };
    
//       // เซ็ต State ส่งค่าไปที่ Button ของ VM
//       handlevm = (e) => {
//         // this.setState({ vm: event.target.value });
//         this.setState({ selectedVM: e.target.value });
//       };
    
//       // เซ็ต State สำหรับปุ่มรับค่า Customer รับค่าเข้ามาใช้หน้า Interface
//       handlecustomers = (e) => {
//         var data = {
//           customer: e.target.value,
//           // access_token:  this.state.access_token
//         };
//         this.setState({ selectedCustomer: e.target.value });
//         axios
//           .post(process.env.REACT_APP_API_CUSTOMER, data, {
//             headers: {
//               authorization: `Bearer ${this.state.access_token}`,
//             },
//           })
//           .then((res) => {
//             this.setState({ VMList: res.data.vmname });
//             // console.log("Customer", res.data.customername);
//           });
//       };
    
//       // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (sdate)
//       handlesdate = (event) => {
//         this.setState({ sdate: event.target.value });
//       };
    
//       // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (edate)
//       handleedate = (event) => {
//         this.state({ edate: event.target.value });
//       };
    
//       getCustomers = () => {
//         axios
//           .post(
//             process.env.REACT_APP_API_CUSTOMER,
//             {},
//             {
//               headers: {
//                 authorization: `Bearer ${this.state.access_token}`,
//               },
//             }
//           )
//           .then((res) => {
//             // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
//             this.setState({
//               customerList: res.data.customername,
//             });
//             // console.log(res.data);
//           })
//           .catch((err) => {
//             // console.log("AXIOS ERROR: ", err);
//           });
//       };
    
//       handleData = () => {
//         axios.get(process.env.REACT_APP_API_VM).then((res) => {
//           this.setState({ data: res.data });
//           // console.log('res',res);
//           // console.log(res.data.cpu_data.raw_data);
    
//           // console.log(this.state.total);
//         });
//       };

//       generatePDF = () => {
//         const doc = new jsPDF();

//         doc.text("Hello world!", 10, 10);
//         doc.save("a4.pdf");
//       }  
    
//       // Life Cycle ที่ใช้เรียกข้อมูลออกมาดู
//       componentDidMount() {
//         this.getCustomers();
    
//         // console.log("token", this.state.access_token);
//       }
    
//       chartReference(ref) {
//         console.log(ref);
//         // this.setState({
//         //   chartData: ref
//         // })
//       }

//     render() {
        
//     // ประกาศฟังก์ชั่น setDate เพื่อเซ็ตค่าที่เลือกส่งไปให้ State DatePicker
//     const setDate = (key, val) => {
//       if (key === "sdate") {
//         this.setState({ sdate: moment(val).format("yyyy-MM-DD-hh-mm-ss") });
//       } else {
//         this.setState({ edate: moment(val).format("yyyy-MM-DD-hh-mm-ss") });
//       }
//     };

//         return (
//       <div className="content">
//         <Grid fluid>
//           <Row>
//             <Col md={12}>
//               <Card
//                 title="กรุณาเลือกข้อมูลที่ต้องการ"
//                 category="ออกรายงานเพื่อดูความก้าวหน้า"
//                 ctTableFullWidth
//                 ctTableResponsive
//                 content={
//                   <div>
//                     <Row>
//                       <Col md={6}>
//                         <Card
//                           category="กรุณาเลือก Customer ที่ต้องการ"
//                           ctTableFullWidth
//                           ctTableResponsive
//                           content={
//                             <div>
//                               <div
//                                 className="panel panel-info"
//                                 onSubmit={this.handleSubmit}
//                               >
//                                 <div className="panel-heading">Customers</div>
//                                 <div className="panel-body">
//                                   <select
//                                     id="dropdown"
//                                     onChange={this.handlecustomers}
//                                   >
//                                     <option value="">Select Customer</option>
//                                     {this.state.customerList
//                                       ? this.state.customerList?.map(
//                                           (item, key) => {
//                                             return (
//                                               <option key={key} value={item}>
//                                                 {item}
//                                               </option>
//                                             );
//                                           }
//                                         )
//                                       : null}
//                                   </select>
//                                 </div>
//                               </div>
//                             </div>
//                           }
//                         />
//                       </Col>
//                       <Col md={6}>
//                         <Card
//                           category="กรุณาเลือก VM ที่ต้องการ"
//                           ctTableFullWidth
//                           ctTableResponsive
//                           content={
//                             <div>
//                               <div
//                                 className="panel panel-info"
//                                 onSubmit={this.handleSubmit}
//                               >
//                                 <div className="panel-heading">VM</div>
//                                 <div className="panel-body">
//                                   <select
//                                     id="dropdown"
//                                     onChange={this.handlevm}
//                                   >
//                                     <option value="">Select VM</option>
//                                     {this.state.VMList
//                                       ? this.state.VMList?.map((item, key) => {
//                                           return (
//                                             <option key={key} value={item}>
//                                               {item}
//                                             </option>
//                                           );
//                                         })
//                                       : null}
//                                   </select>
//                                 </div>
//                               </div>
//                             </div>
//                           }
//                         />
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col md={12}>
//                         <Card
//                           category="กรุณาเลือกช่องเวลาที่ต้องการ"
//                           ctTableFullWidth
//                           ctTableResponsive
//                           content={
//                             <div>
//                               <div
//                                 className="panel panel-info"
//                                 onSubmit={this.handleSubmit}
//                               >
//                                 <div className="panel-heading">Date Time</div>
//                                 <div className="panel-body">
//                                   {/* ส่วนของตัวเลือกเวลา */}
//                                   <Datepicker
//                                     setDate={setDate}
//                                     edate={this.state.edate}
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           }
//                         />
//                       </Col>
//                     </Row>

//                     <Col md={2}>
//                       <button onClick={(event) => this.handleSubmit(event)}>
//                         Preview
//                       </button>
//                     </Col>

//                     <button onClick={this.generatePDF} type="primary">JsPDF</button> 


//                     <Col md={2}>
//                     <button onClick={() => window.print()}>PRINT</button>
//                     </Col>


//                     <Col md={3}>
//                       <PDFexport
//                         component={Chartlist}
//                         chartReference={this.state.chartData}
//                       />
//                     </Col>

//                     {/* เงื่อนไขเช็คข้อมูลก่อนแสดงผลกราฟ */}
//                     {this.state.cpu_total.length > 0 &&
//                       this.state.cpu_datetime.length > 0 &&
//                       this.state.cpu_downtime.length > 0 &&
//                       this.state.disk_FreeSpace.length > 0 &&
//                       this.state.disk_datatime.length > 0 &&
//                       this.state.disk_downtime.length > 0 &&
//                       this.state.memory_percent.length > 0 &&
//                       this.state.memory_datetime.length > 0 &&
//                       this.state.memory_downtime.length > 0 && (
//                         <Chartlist
//                           chartReference={this.chartReference}
//                           cpu_total={this.state.cpu_total}
//                           cpu_datetime={this.state.cpu_datetime}
//                           cpu_downtime={this.state.cpu_downtime}
//                           disk_FreeSpace={this.state.disk_FreeSpace}
//                           disk_datatime={this.state.disk_datatime}
//                           disk_downtime={this.state.disk_downtime}
//                           memory_percent={this.state.memory_percent}
//                           memory_datetime={this.state.memory_datetime}
//                           memory_downtime={this.state.memory_downtime}
//                           Datareport={this.state.Datareport}
//                         />
//                       )}
//                   </div>
//                 }
//               />
//             </Col>
//           </Row>
//         </Grid>

//       </div>

//         );
//     }
// }
