import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import  { Redirect } from 'react-router-dom'

import { Grid, Row, Col, Table} from "react-bootstrap";

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

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

import PDF from "../pdf/PDF.js";

import Chartjs from "../ChartJs/Chartjs.js";
import React_PDF from "../pdf/React_PDF";

import * as loadingData from "../loading.json";
import * as successData from "../success.json";
import * as loadingAmongUs from "../loading-among-us.json"
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

import { Multi_Data } from "../API/api.jsx";
import Select from 'react-select';


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

const defaultOptions3 = {
  loop: true,
  autoplay: true,
  animationData: loadingAmongUs.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

class PRTG_NX_Cloud_Multi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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


      chart: [],

      selectOptionsCustomer : [],
      selectOptionVM:[],
      value:[],

      loading: false,
      openModal : false,


      };
  }

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
            selectOptionsCustomer: res.data.customername,
          });
  
          this.CustomerSelected(res.data.customername);
  
        })
        .catch((err) => {
          // console.log("AXIOS ERROR: ", err);
          if(this.state.selectOptionsCustomer===""){
            alert("โปรดรอสักครู่เนื่องจากความล่าช้าในการโหลดข้อมูล หรือกรุณาลองใหม่อีกครั้งค่ะ")
          }
        });
    };

    // เซ็ต State สำหรับปุ่มรับค่า Customer รับค่าเข้ามาใช้หน้า Interface
    handlecustomers = (e) => {
      // console.log(e.value,'event');

      var data = {
        customer: e.value,
        // access_token:  this.state.access_token
      };
      this.setState({ selectedCustomer: e.value });
      
      axios
        .post(process.env.REACT_APP_API_CUSTOMER, data, {
          headers: {
            authorization: `Bearer ${this.state.access_token}`,
          },
        })
        .then((res) => {
          this.VmSelected(res.data.vmname);
          // console.log(res.data.vmname,'vm เซ็ตแล้วจ้า');
          this.setState({
            selectedVM: res.data.vmname
          });
        });

    };

    CustomerSelected = (rows) => {
      let options = []
  
      rows.map(item => {
        options.push({value: item, label: item});
      })
  
      this.setState({
        selectOptionsCustomer: options
      })
      // console.log(this.state.selectOptionsCustomer,'customer จ้า')

    }

    // เซ็ต State ใส่ Label ใน VM
    VmSelected = (rows) => {
      let options = []
  
      rows.map(item => {
        options.push({value: item, label: item});
      })
  
      this.setState({
        selectOptionVM: options
      })
      // console.log(this.state.selectOptionVM,'selectOptionVM');
    }


  // เซ็ต State ส่งค่าไปที่ Button ของ VM
  handlevm = (e) => {
    let vm_value = e.map((item1)=>{
      return item1.value
    })
    this.setState({ selectedVM: vm_value})
    // console.log(vm_value,'VM ที่ Loop ออก Array');
    // console.log(this.state.selectedVM,'ค่าที่ส่ง Payload');
    // this.setState({ selectedVM: e.target.value });
    // console.log(e,'ค่าที่รับเข้ามาของ VM');
  };


  // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (sdate)
  handlesdate = (event) => {
    this.setState({ sdate: event.target.value });
  };

  // เซ็ต State สำหรับวันที่เริ่มต้นการแสดงเวลา (edate)
  handleedate = (event) => {
    this.state({ edate: event.target.value });
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

  handleSubmit = async (e) => {
    e.preventDefault();

    // url API ที่กำหนดของ Cloud Platform PRTG-Test
    const url = process.env.REACT_APP_API_PRTG_NX_CLOUD_MULTI;

    // Object Identify ที่ใช้ในการเรียกใช้ State
    const objid = {
      customer: this.state.selectedCustomer,
      device: this.state.selectedVM,
      sdate: this.state.sdate,
      edate: this.state.edate,
      token:localStorage.getItem('access_token')
    };

    this.setState({ loading: true });
    this.setState({openModal : true})


    // กำหนด Auth ให้ Headers ส่งไป
    try {
      const res = await axios.post(url, objid,{
        headers: {
          authorization: `Bearer ${this.state.access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
        }
      }).then((result)=>{

        this.setState({loading: false})

        this.setState({Link_NX_Cloud : result.data.result});
        window.open(this.state.Link_NX_Cloud)
        // console.log(result)

      }).catch(e => {

        if (this.state.selectedCustomer==="") {
            alert("ไม่พบข้อมูลที่ท่านต้องการ กรุณากรอก Customer ใหม่ด้วยค่ะ")
          } else if(this.state.selectedVM===""){
            alert("ไม่พบข้อมูลที่ต้องการ กรุณากรอก VM ใหม่ด้วยค่ะ")
          }
    
          if (this.state.sdate==="") {
            alert("กรุณากรอก \"วันที่เริ่ม\" ใหม่ด้วยค่ะ")
          } else if(this.state.edate===""){
            alert("กรุณากรอก \"วันที่สิ้นสุด\" ใหม่ด้วยค่ะ")
          } else {
            alert("กรุณากรอกข้อมูลให้ถูกต้องค่ะ")
          }
    
          if(objid===""){
            alert("ไม่พบข้อมูลที่ขอ กรุณาลองใหม่อีกครั้งค่ะ")
          }
          if(objid===null){
            alert("ไม่พบข้อมูลที่ขอ กรุณาลองใหม่อีกครั้งค่ะ")
          }

      })

      // console.log('PRTG NX Cloud',res.data);
      console.log('Link_NX_Cloud',this.state.Link_NX_Cloud);

      // ใช้ if ดัก data ให้มันรอและเซ็ต report ให้เก็บ res.data
      if (res.data) {
        this.setState({ DateReport: res.data });

        // State เก็บค่า CPU Total
        this.setState({ 
          cpu_total: res.data.cpu_data[0].raw_data.map((item)=>{
            return item.Total
          })
      });

      // State เก็บค่า CPU Datetime
      this.setState({ 
        cpu_datetime: res.data.cpu_data[0].raw_data.map((item) => {
          return item.datetime
        })
    });

    // State เก็บค่า CPU Downtime
    this.setState({
      cpu_downtime: res.data.cpu_data[0].raw_data.map((item) => {
        return item.downtime
      })
  });

      // State เก็บค่า Disk Free Space
      this.setState({
        disk_FreeSpace : res.data.disk_data.map((item1) => {  
          return item1.raw_data.map((item2) => {
            return item2.free_space
          })

        })
      })


      // State เก็บค่า Disk datetime
      this.setState({
        disk_datetime : res.data.disk_data.map((item1) => {
          return item1.raw_data.map((item2) => {
            return item2.datetime;
          })
        })
      })

      // State เอาไว้เก็บค่า downtime ของ disk
      this.setState({
        disk_downtime : res.data.disk_data.map((item1) => {
          return item1.raw_data.map((item2) => {
            return item2.downtime;
          })
        })
      })

      // State เอาไว้เก็บค่า Datetime ของ Memory
      this.setState({
        memory_datetime : res.data.memory_data.map((item1) => {
          return item1.raw_data.map((item2) => {
            return item2.datetime;
          })
        })
      })

      // State เอาไว้เก็บค่า Downtime ของ Memory
      this.setState({
        memory_downtime : res.data.memory_data.map((item1) => {
          return item1.raw_data.map((item2) => {
            return item2.downtime;
          })
        })
      })

      // State เอาไว้เก็บค่า Percent_Available_Memory ของ Memory
      this.setState({
        memory_percent : res.data.memory_data.map((item1) => {
          return item1.raw_data.map((item2) => {
            return item2.percent_available_memory;
          })
        })
      })


      }
    } catch (e) {
        // console.log({...e});
      return null;
    }
  };


  onCloseModal = ()=>{
    this.setState({openModal : false})
}

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

    const { loading } = this.state;

    // ประกาศฟังก์ชั่น setDate เพื่อเซ็ตค่าที่เลือกส่งไปให้ State DatePicker
    const setDate = (key, val) => {
      moment.locale('th');
      if (key === "sdate") {
        this.setState({ sdate: moment(val).format("yyyy-MM-DD-HH-mm-ss") });
      } else {
        this.setState({ edate: moment(val).format("yyyy-MM-DD-HH-mm-ss") });
      }
    };


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

                                <Select 
                                    onChange={this.handlecustomers}
                                    isSearchable
                                    placeholder="Select Customer"
                                    options={this.state.selectOptionsCustomer}
                                  />

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

                                  <Select 
                                    onChange={this.handlevm}
                                    isMulti
                                    isSearchable
                                    placeholder="Select VM"
                                    options={this.state.selectOptionVM} 
                                  />

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
                      <button className="btn btn-primary btn-md" role="button"
                        onClick={(event) => this.handleSubmit(event)}
                        disabled={loading}
                        >
                          {loading && (

                            <l
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px"}}
                            />,

                            <Modal 
                              open={this.state.openModal} 
                              onClose={this.onCloseModal}
                              center
                              >
                                <Lottie 
                                options={defaultOptions3}
                                  height={400}
                                  width={400}
                                />
                              <h2 style={{textAlign: "center"}}>กำลังโหลด...</h2>
                            </Modal>   

                          )}
                          {loading && <span>Loading...</span>}
                          {!loading && <span>Download PDF</span>}
                      </button>
                    </Col>

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

export default PRTG_NX_Cloud_Multi;

