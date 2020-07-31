import React, { Component, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

import { Bar, Line, Area } from "chart.js";
import { Chart } from "react-chartjs-2";
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
require('dotenv').config()


// function getBase64FromImageUrl(url) {
//   var img = new Image();

//   img.setAttribute('crossOrigin', 'anonymous');

//   img.onload = function () {
//       var canvas = document.createElement("canvas");
//       canvas.width =this.width;
//       canvas.height =this.height;

//       var ctx = canvas.getContext("2d");
//       ctx.drawImage(this, 0, 0);

//       var dataURL = canvas.toDataURL("image/png");

//       alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
//   };

//   img.src = 'https://203.151.151.186/chart.png?id=2014&avg=15&sdate=2020-05-06-00-00-00&edate=2020-05-07-00-00-00&width=850&height=270&graphstyling=baseFontSize=12%20showLegend=1&graphid=-1&username=readonly&password=mis@Pass01;
// }

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [], // เอาไว้เก็บ res.data ของ api selectCustomer ที่ Post ไว้
      VMList: [],
      selectedCustomer: [], // state ส่ง cus
      selectedVM: [],
      sdate: "",
      edate: "",
      access_token: localStorage.getItem("access_token"),

      // State ไว้เก็บข้อมูลของ CPU
      cpu_total: [],
      cpu_datetime: [],
      cpu_downtime:[],

      // State ไว้เก็บข้อมูลของ Disk อาจมีหลาย Disk
      disk_FreeSpace:[],
      disk_datatime:[],
      disk_downtime:[],

      // State ไว้เก็บข้อมูลของ Memory
      memory_percent:[],
      memory_datetime:[],
      memory_downtime:[],
      
      // เผื่อเอาไว้รวม State จากทั้งหมด 9 State
      DateReport:[], 
      
    };
  }

  // console.log(new Date(this.state.sdate).toString())
  // console.log(moment(this.state.sdate).format('yyyy-MM-DD-hh-mm-ss'))


  // เซ็ต State สำหรับส่งค่าทั้งกล่องเพื่อ post ไปที่ Backend
  // โดยอ้างอิงข้อมูลจาก url ที่กำหนดถ้าข้อมูลไม่มาให้ดูตรงนี้ก่อน <<<<<
  handleSubmit = async (e) => {
    e.preventDefault();

    // url ที่กำหนด
    // const url = "http://192.168.250.134:5555/api/selectVm";
    const url = process.env.REACT_APP_API_VM;
    // const qs = require("querystring");
    // Object Identify ที่ใช้ในการเรียกใช้ State
    const objid = {
      customer: this.state.selectedCustomer,
      device: this.state.selectedVM,
      sdate: this.state.sdate,
      edate: this.state.edate,
      token:localStorage.getItem('access_token')
    };

    try {
      const res = await axios.post(url, objid,{
        headers: {
          authorization: `Bearer ${this.state.access_token}`
        }
      });
      console.log('Response Preview',res);
      


      // ใช้ if ดัก data ให้มันรอและเซ็ต report ให้เก็บ res.data
      if (res.data) {
        this.setState({ DateReport: res.data });
        console.log('Data Report',res.data);
        console.log('Data CPU' , res.data.cpu_data);
        console.log( );
        this.setState({ 
          cpu_total: res.data.cpu_data[0].raw_data.map((item)=>{
            return item.Total
          })
      });

      this.setState({ 
        cpu_datetime: res.data.cpu_data[0].raw_data.map((item)=>{
          return item.datetime
        })
    });

    this.setState({ 
      cpu_downtime: res.data.cpu_data[0].raw_data.map((item)=>{
        return item.downtime
      })
  });

      this.setState({
        cpu_downtime: res.data.cpu_data.map((item1) => {
          item1.raw_data.map((item2) => {
            return item2.downtime;
          })
        })
      })

      // this.setState({
      //   cpu_downtime: res.data.cpu_data.map((item1) => {
      //     item1.raw_data.map((item2) => {
      //       return item2.downtime;
      //     })
      //   })
      // })





















      }
    } catch (e) {
      console.log({...e});
      return null;
    }
  };

  // เซ็ต State ส่งค่าไปที่ Button ของ VM
  handlevm = (e) => {
    // this.setState({ vm: event.target.value });
    this.setState({ selectedVM: e.target.value });
  };

  // เซ็ต State สำหรับปุ่มรับค่า Customer รับค่าเข้ามาใช้หน้า Interface
  handlecustomers = (e) => {
    var data = { 
      customer: e.target.value,
      // access_token:  this.state.access_token
    };
    this.setState({ selectedCustomer: e.target.value });
    axios
      .post(process.env.REACT_APP_API_CUSTOMER, data,{
        headers: {
          authorization: `Bearer ${this.state.access_token}`
        }
      })
      .then((res) => {
        this.setState({ VMList: res.data.vmname });
        // console.log("Customer", res.data.customername);
      });
  };

  // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (sdate)
  handlesdate = (event) => {
    this.setState({ sdate: event.target.value });
    // this.state({
    //   sdate: event.target.value,
    // });
    // console.log(event);
  };

  // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (edate)
  handleedate = (event) => {
    this.state({ edate: event.target.value });
  };

  // getAllDevices = async () => {
  //   await axios
  //     // .get(process.env.API_GETALLDEVICES)
  //     .get("http://192.168.250.134:5555/api/getAllDevices")
  //     .then((res) => {
  //       var result = res.data;
  //       // console.log(result);
  //     });
  // };

  getCustomers = () => {
   axios
      .post(process.env.REACT_APP_API_CUSTOMER,{}, {
        headers: {
          authorization: `Bearer ${this.state.access_token}`
        }
      })
      .then((res) => {
        // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
        this.setState({ 
          customerList: res.data.customername,
          
         });
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };


  handleData = () => {
    axios.get(process.env.REACT_APP_API_VM).then((res) => {
      this.setState({ data: res.data });
      // console.log('res',res);
      // console.log(res.data.cpu_data.raw_data);

      console.log(this.state.total);
    });
  };



  // Life Cycle ที่ใช้เรียกข้อมูลออกมาดู
  componentDidMount() {
    // this.getAllDevices();
    this.getCustomers();

    // console.log("token", this.state.access_token);
  }

  render() {
    // let array = [{name: "g1"}]

    // let array = [{ name: "TestCloud" }, { name: "Test Com 7" }];
    // let VMname = [{ VM: "" }];

    // การ Filter ข้อมูลจากๅ text
    //   data.filter((text) => {
    //     const _searchText = category.toString().toLowerCase()
    //     const _text = text.category_id == null ? '' : text.category_id.toString().toLowerCase()
    //     return _text.search(_searchText) !== -1
    // });

    // ประกาศฟังก์ชั่น setDate เพื่อเซ็ตค่าที่เลือกส่งไปให้ State DatePicker
    const setDate = (key, val) => {
      if (key === "sdate") {
        this.setState({ sdate: moment(val).format("yyyy-MM-DD-hh-mm-ss") });
      } else {
        this.setState({ edate: moment(val).format("yyyy-MM-DD-hh-mm-ss") });
      }
    };
    // console.log(this.state.report);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="กรุณาเลือกข้อมูลที่ต้องการ"
                category="ออกรายงานเพื่อดูความก้าวหน้า"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row>
                      <Col md={6}>
                        <Card
                          category="กรุณาเลือก Customer ที่ต้องการ"
                          ctTableFullWidth
                          ctTableResponsive
                          content={
                            <div>
                              <div
                                className="panel panel-info"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">Customers</div>
                                <div className="panel-body">
                                  <select
                                    id="dropdown"
                                    onChange={this.handlecustomers}
                                  >
                                    <option value="">Select Customer</option>
                                    {this.state.customerList
                                      ? this.state.customerList?.map(
                                          (item, key) => {
                                            return (
                                              <option key={key} value={item}>
                                                {item}
                                              </option>
                                            );
                                          }
                                        )
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </Col>
                      <Col md={6}>
                        <Card
                          category="กรุณาเลือก VM ที่ต้องการ"
                          ctTableFullWidth
                          ctTableResponsive
                          content={
                            <div>
                              <div
                                className="panel panel-info"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">VM</div>
                                <div className="panel-body">
                                  <select
                                    id="dropdown"
                                    onChange={this.handlevm}
                                  >
                                    <option value="">Select VM</option>
                                    {this.state.VMList
                                      ? this.state.VMList?.map((item, key) => {
                                          return (
                                            <option key={key} value={item}>
                                              {item}
                                            </option>
                                          );
                                        })
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <Card
                          category="กรุณาเลือกช่องเวลาที่ต้องการ"
                          ctTableFullWidth
                          ctTableResponsive
                          content={
                            <div>
                              <div
                                className="panel panel-info"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">Date Time</div>
                                <div className="panel-body">
                                  {/* ส่วนของตัวเลือกเวลา */}
                                  <Datepicker
                                    setDate={setDate}
                                    edate={this.state.edate}
                                  />
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </Col>
                    </Row>

                    <Col md={1}>
                      <button onClick={(event) => this.handleSubmit(event)}>
                        Preview
                      </button>
                    </Col>

                    <Col md={2}>
                      <PDFexport />
                    </Col>


                    {this.state.cpu_total.length > 0 &&
                      this.state.cpu_datetime.length > 0 &&
                      this.state.cpu_downtime.length > 0 &&

                      // this.state.disk_FreeSpace.length > 0 &&
                      // this.state.disk_datatime.length > 0 &&
                      // this.state.disk_downtime.length > 0 &&

                      // this.state.memory_percent.length > 0 &&
                      // this.state.memory_datetime.length > 0 &&
                      // this.state.memory_downtime.length > 0 &&
                      (
                      <Chartlist

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

                    {/* {this.state.total.length > 0 &&
                      this.state.dateTimeData.length > 0 && (
                        <Chartlist
                          total={this.state.total}
                          dateTimeData={this.state.dateTimeData}
                          Datareport={this.state.Datareport}
                        />
                      )} */}

                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>

        {/* <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="กรุณาเลือกข้อมูลที่ต้องการ"
                category="ออกรายงานเพื่อดูความก้าวหน้า"
                ctTableFullWidth
                ctTableResponsive
                content={

                  <div>
                    <div
                      className="panel panel-info"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="panel-heading">Customers</div>
                      <div className="panel-body">
                        <select id="dropdown" onChange={this.handlecustomers}>
                          <option value="">Select Customer</option>
                          {this.state.customerList
                            ? this.state.customerList?.map((item, key) => {
                                return (
                                  <option key={key} value={item}>
                                    {item}
                                  </option>
                                );
                              })
                            : null}
                        </select>

                        <br></br>
                        <br></br>

                        <select id="dropdown" onChange={this.handlevm}>
                          <option value="">Select VM</option>
                          {this.state.VMList
                            ? this.state.VMList?.map((item, key) => {
                                return (
                                  <option key={key} value={item}>
                                    {item}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                        
                      </div>
                    </div>

                        <Datepicker
                          setDate={setDate}
                          edate={this.state.edate}
                        />

                        <br></br>
                        <button onClick={(event) => this.handleSubmit(event)}>
                          Preview
                        </button>


                    <PDFexport />

                    <Chartlist report={this.state.report}/>
                  </div>
                }
              />
            </Col>

          </Row>
        </Grid> */}
      </div>

      /* <Col md={12}>
              <Card
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                plain
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col> */
    );
  }
}

export default TableList;
