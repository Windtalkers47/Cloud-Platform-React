import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import  { Redirect } from 'react-router-dom'

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
import Chartlist from "../pdf/chart";
import JsPDF from "pdf/JsPDF";

import PDF from "../pdf/PDF.js";
import RenderPDF from "../pdf/chart";

import * as loadingData from "../loading.json";
import * as successData from "../success.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";


import "./loading.css";

// require('dotenv').config()

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: successData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};



class Report_Modal extends Component {
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
      cpu_downtime: [],

      // State ไว้เก็บข้อมูลของ Disk อาจมีหลาย Disk
      disk_FreeSpace: [],
      disk_datetime: [],
      disk_downtime: [],

      // State ไว้เก็บข้อมูลของ Memory
      memory_percent: [],
      memory_datetime: [],
      memory_downtime: [],

      // เผื่อเอาไว้รวม State จากทั้งหมด 9 State
      DateReport: [],
      chartData: React.createRef(),
      redirect: false,

      loading: false, 
      success: false,

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
      token: localStorage.getItem("access_token"),
    };

    try {
      const res = await axios.post(url, objid, {
        headers: {
          authorization: `Bearer ${this.state.access_token}`,
        },
      });
      console.log("Debug Axios", res);

      // ใช้ if ดัก data ให้มันรอและเซ็ต report ให้เก็บ res.data
      if (res.data) {
    
        this.setState({ DateReport: res.data });
        // console.log("Data Report", res.data); // เอาไว้ดูข้อมูลทั้ง 3 ส่วน
        // console.log('CPU Data' , res.data.cpu_data); // เอาไว้ดูข้อมูลของ CPU
        // console.log('Disk Data', res.data.disk_data); // เอาไว้ดูข้อมูลของ Disk
        // console.log('Memory Data', res.data.memory_data);

        // State เก็บค่า CPU Total
        this.setState({
          cpu_total: res.data.cpu_data[0].raw_data.map((item) => {
            return item.total;
          }),
        });

        // State เก็บค่า CPU Datetime
        this.setState({
          cpu_datetime: res.data.cpu_data[0].raw_data.map((item) => {
            return item.datetime;
          }),
        });

        // State เก็บค่า CPU Downtime
        this.setState({
          cpu_downtime: res.data.cpu_data[0].raw_data.map((item) => {
            return item.downtime;
          }),
        });

        // อันนี้คือลอง map 2 ชั้น
        // State เก็บค่า Disk Free Space
        this.setState({
          disk_FreeSpace: res.data.disk_data.map((item1) => {
            return item1.raw_data.map((item2) => {
              return item2.free_space;
            });
          }),
        },() => {
          // console.log(this.state.disk_FreeSpace,'Debug ค่า Map');
        });


        // State เก็บค่า Disk datetime
        this.setState({
          disk_datetime: res.data.disk_data.map((item1) => {
            return item1.raw_data.map((item2) => {
              return item2.datetime
            });
          }),
        });


        // State เอาไว้เก็บค่า downtime ของ disk
        // วิธีการเอา 2 arrays ของ axios post มารวมกัน
        // const disk_downtime = []
        //  res.data.disk_data.map((item1) => {
        //   const raw_data = item1.raw_data.map((item2) => {
        //     return item2.downtime
        //   });
        //   disk_downtime.push(...raw_data)
        //   return [...raw_data]
        // })
        // this.setState({
        //   disk_downtime: disk_downtime
        // },() => {
        //   console.log(this.state.disk_downtime,'Debug Disk Downtime');
        // });

        const _disk_downtime = res.data.disk_data.map((item1) => {
          const raw_data = item1.raw_data.map((item2) => {
            return item2.downtime
          })
        })
        this.setState({
          disk_downtime: _disk_downtime
        }, () => {
          console.log(this.state.disk_downtime,'Debug Disk Downtime');
        })


       
        
        // State เอาไว้เก็บค่า Datetime ของ Memory
        this.setState({
          memory_datetime: res.data.memory_data.map((item1) => {
            return item1.raw_data.map((item2) => {
              return item2.datetime;
            });
          }),
        });

        // State เอาไว้เก็บค่า Downtime ของ Memory
        this.setState({
          memory_downtime: res.data.memory_data.map((item1) => {
            return item1.raw_data.map((item2) => {
              return item2.downtime;
            });
          }),
        });

        // State เอาไว้เก็บค่า Percent_Available_Memory ของ Memory
        this.setState({
          memory_percent: res.data.memory_data.map((item1) => {
            return item1.raw_data.map((item2) => {
              return item2.percent_available_memory;
            });
          }),
        });

        this.setState({loading : true})
        this.setState({success : true})
      }
    } catch (e) {
      // console.log({...e});
      return null;
    }
    
    this.setState({ redirect: true });

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
      .post(process.env.REACT_APP_API_CUSTOMER, data, {
        headers: {
          authorization: `Bearer ${this.state.access_token}`,
        },
      })
      .then((res) => {
        this.setState({ VMList: res.data.vmname });
        // console.log("Customer", res.data.customername);
      });
  };

  // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (sdate)
  handlesdate = (event) => {
    this.setState({ sdate: event.target.value });
  };

  // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (edate)
  handleedate = (event) => {
    this.state({ edate: event.target.value });
  };

  getCustomers = () => {
    axios
      .post(
        process.env.REACT_APP_API_CUSTOMER,
        {},
        {
          headers: {
            authorization: `Bearer ${this.state.access_token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
          },
        }
      )
      .then((res) => {
        // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
        this.setState({
          customerList: res.data.customername,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
      });
  };

  CompanaName_API = () => {

    axios({
      method: 'post',
      url: process.env.REACT_APP_API_COMPANY_NAME,
      data: {'cno' : 123456789},
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      }
    })
    .then((res) => {
      this.setState({
        CompanyNameTH : res.data.companynameth, // เก็บค่าใส่ตัวแปร TH
        CompanyNameEN : res.data.companynameen, // เก็บค่าใส่ตัวแปร EN
      })
      console.log(this.state.CompanyNameTH,'CompanyName ENG');
      console.log(this.state.CompanyNameEN,'CompanyName TH');
    })
  }

  handleData = () => {
    axios.get(process.env.REACT_APP_API_VM).then((res) => {
      this.setState({ data: res.data });
    });
  };

  // Life Cycle ที่ใช้เรียกข้อมูลออกมาดู
  componentDidMount() {
    this.getCustomers();

    // console.log("token", this.state.access_token);
  }

  chartReference(ref) {
    console.log(ref);
    // this.setState({
    //   chartData: ref
    // })
  }

  render() {

    // if (!this.state.isLoading) {
    //   return <div>Loading...</div>
    // }

    // ประกาศฟังก์ชั่น setDate เพื่อเซ็ตค่าที่เลือกส่งไปให้ State DatePicker
    const setDate = (key, val) => {
      moment.locale('th');
      if (key === "sdate") {
        this.setState({ sdate: moment(val).format("yyyy-MM-DD-HH-mm-ss") });
      } else {
        this.setState({ edate: moment(val).format("yyyy-MM-DD-HH-mm-ss") });
      }
    };


    // ฟังก์ชั่นแปลงเวลาไปใส่ State DateTime ทั้ง 3 ตัว CPU,Disk,Memory
    const setDatetime = (key, val) =>{
      if (key === "0") {
        this.setState({ cpu_datetime : moment(val).format('L')});
      }
      if (key === "0"){
        this.setState({ disk_datetime : moment(val).format("L")});
      }
      if (key === "0"){
        this.setState({ memory_datetime : moment(val).format("L")});
      }
    }

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

                            <div>
                              <div
                                className="panel panel-success"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">Customers</div>
                                <div className="panel-body">
                                  <select
                                    id="dropdown"
                                    onChange={this.handlecustomers}
                                    className="btn btn-default dropdown-toggle"
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

                      </Col>
                      <Col md={6}>

                            <div>
                              <div
                                className="panel panel-success"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">VM</div>
                                <div className="panel-body">
                                  <select
                                    id="dropdown"
                                    onChange={this.handlevm}
                                    className="btn btn-default dropdown-toggle"
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

                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>

                            <div>
                              <div
                                className="panel panel-success"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">ระยะเวลา</div>
                                <div className="panel-body">
                                  {/* ส่วนของตัวเลือกเวลา */}
                                  <Datepicker
                                    setDate={setDate}
                                    edate={this.state.edate}
                                  />
                                </div>
                              </div>
                            </div>

                      </Col>
                    </Row>

                    {/* <Col md={2}>
                      <button className="btn btn-primary btn-md" role="button"
                        onClick={this.CompanaName_API}>Call Company Name</button>
                    </Col> */}

                    <Col md={2}>
                      <button id="proceed" className="btn btn-primary btn-md" role="button"
                        onClick={(event) => this.handleSubmit(event) }>
                        Proceed
                      </button>
                    </Col>
                    
                    {!this.state.success ? (
                    <FadeIn>
                      <div className ="loading">
                        {!this.state.loading ? (
                          <div className ='loading_img'>
                            <Lottie options={defaultOptions} height={200} width={200} />
                          </div>
                        ) : (
                            <Lottie options={defaultOptions2} height={200} width={200} />
                          )}
                      </div>
                    </FadeIn>
                  ) : (
                    <FadeIn>
                      <div>

                    {/* เงื่อนไขเช็คข้อมูลก่อนแสดงผลกราฟ */}
                    {this.state.cpu_total.length > 0 &&
                      this.state.cpu_datetime.length > 0 &&
                      this.state.cpu_downtime.length > 0 &&
                      this.state.disk_FreeSpace.length > 0 &&
                      this.state.disk_datetime.length > 0 &&
                      this.state.disk_downtime.length > 0 &&
                      this.state.memory_percent.length > 0 &&
                      this.state.memory_datetime.length > 0 &&
                      this.state.memory_downtime.length > 0 && (
                        <PDF
                          chartReference={this.chartReference}
                          cpu_total={this.state.cpu_total}
                          cpu_datetime={this.state.cpu_datetime}
                          cpu_downtime={this.state.cpu_downtime}
                          disk_FreeSpace={this.state.disk_FreeSpace}
                          disk_datetime={this.state.disk_datetime}
                          disk_downtime={this.state.disk_downtime}
                          memory_percent={this.state.memory_percent}
                          memory_datetime={this.state.memory_datetime}
                          memory_downtime={this.state.memory_downtime}
                          Datareport={this.state.Datareport}
                        />
                      )}

                      </div>
                    </FadeIn>
                    )}

                    {/* <Col md={3}>
                      <PDFexport
                        component={Chartlist}
                        chartReference={this.state.chartData}
                      />
                    </Col> */}


                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default Report_Modal;
