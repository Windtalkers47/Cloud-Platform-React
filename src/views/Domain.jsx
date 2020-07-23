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

class Domain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [], // เอาไว้เก็บ res.data ของ api selectCustomer ที่ Post ไว้
      VMList: [],
      selectedCustomer: [], // state ส่ง cus
      selectedVM: [],
      sdate: "",
      edate: "",
      report: [],
    };
  }

  // console.log(new Date(this.state.sdate).toString())
  // console.log(moment(this.state.sdate).format('yyyy-MM-DD-hh-mm-ss'))

  // componentWillMount(){
  //   // console.log('test')
  //   // this.printPDF() ทำรายการทันที
  // }

  // เซ็ต State ส่งค่าไปที่ Button ของ VM
  // handleDropdownVM = (event) => {
  //   this.setState({ selectVM: event.target.value });
  // };

  // เซ็ต State สำหรับปุ่มรับค่า Customer รับค่าเข้ามาใช้หน้า Interface
  // handleselectcustomer = (e) => {
  //   this.setState({
  //     [e.target.selectcustomer]: e.target.value,
  //   });
  // };

  // เซ็ต State สำหรับส่งค่าทั้งกล่องเพื่อ post ไปที่ Backend
  // โดยอ้างอิงข้อมูลจาก url ที่กำหนดถ้าข้อมูลไม่มาให้ดูตรงนี้ก่อน <<<<<
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    // console.log("vm submit",this.state.vm)
    // url ที่กำหนด
    const url = "http://203.151.34.28:5551/api/selectVm";
    const qs = require("querystring");
    // Object Identify ที่ใช้ในการเรียกใช้ State
    const objid = {
      customer: this.state.selectedCustomer,
      device: this.state.selectedVM,
      sdate: this.state.sdate,
      edate:this.state.edate,
      // sdate: this.state.sdate,
      // edate: this.state.edate,
    };
    // console.log("sdate : ", this.state.sdate);
    // console.log("edate : ", this.state.edate);
    // console.log("this.props");
    // console.log(this.props);
    // กำหนดส่งค่า url และ Object Identify ออกไป
    axios
      .post(url, objid)
      .then((res) => {
        //handle your method
        // console.log(res);
        this.setState({report:res.data})
        // console.log(this.props);
      })
      .catch((e) => {
        //handle your errors
        console.log(e);
      });
  };

  // เซ็ต State ส่งค่าไปที่ Button ของ VM
  handlevm = (e) => {
    // this.setState({ vm: event.target.value });
    this.setState({ selectedVM: e.target.value });
  };

  // เซ็ต State สำหรับปุ่มรับค่า Customer รับค่าเข้ามาใช้หน้า Interface
  handlecustomers = (e) => {
    var data = { customer: e.target.value };
    this.setState({ selectedCustomer: e.target.value });
    axios
      .post("http://203.151.34.28:5000/api/selectCustomer", data)
      .then((res) => {
        this.setState({ VMList: res.data.vmname });
        console.log(res.data);
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

  getAllDevices() {
    axios.get("http://203.151.34.28:5000/api/getAllDevices").then((res) => {
      var result = res.data;
      console.log(result);
    });
  }

  getCustomers() {
    axios.post("http://203.151.34.28:5000/api/selectCustomer").then((res) => {
      // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
      this.setState({ customerList: res.data.customername });
    });
  }

  // Life Cycle ที่ใช้เรียกข้อมูลออกมาดู
  componentDidMount() {
    this.getAllDevices();
    this.getCustomers();

    // axios.post("http://203.151.34.28:5000/api/selectVM")
    // .then((res) => {
    //   console.log(res);
    // })
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

    // ประกาศฟังก์ชั่น setDate เพื่อเซ็ตค่าที่เลือกส่งไปให้ Component DatePicker
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
                title="PRTG ตัวจริง"
                category="ออกรายงานเพื่อดูความก้าวหน้า"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <div
                      className="panel panel-primary"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="panel-heading">Group</div>
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

                        {/* ส่วนของตัวเลือกเวลา */}
                        <Datepicker
                          setDate={setDate}
                          edate={this.state.edate}
                        />

                        <br></br>
                        <button onClick={(event) => this.handleSubmit(event)}>
                          Preview
                        </button>
                      </div>
                    </div>

                    {/* <button onClick={this.export_pdf}>Download PDF</button> */}

                    {/* ส่วนของปุ่มดาวน์โหลด PDF */}
                    <PDFexport />
                    {/* <button onClick={this.printPDF}>Download PDF</button> */}

                    {/* <Chartlist report={this.state.report}/> */}
                  </div>
                }
              />
            </Col>

            {/* <Col md={12}>
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
            </Col> */}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Domain;

