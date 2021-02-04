import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col, Table } from "react-bootstrap";
import  { Redirect } from 'react-router-dom'

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

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

class Reports_Modal extends Component {
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
    }

  DataFilter = (data) => {

      // console.log(data,'data');
  
      const cpuData = data.cpu_data;
      const diskData = data.disk_data;
      const memoryData = data.memory_data;

      let  chartList = [];

      this.chartData('cpu',cpuData,chartList)
      this.chartData('disk',diskData,chartList)
      this.chartData('memory',memoryData,chartList)

      return chartList;

  };

  // Function Structure Arrange for ChartJS 
  chartData = (type,rows,chartList) => {
    rows.forEach(item => {
      // console.log(element,'el');
      // console.log(item,'item');

      let labels = [];
      let freeSpace = [];
      let cpuTotal = [];
      let percentMemory = [];

      item.raw_data.map(item=>{
          labels.push(item.datetime);
          if(item.free_space){
            freeSpace.push(item.free_space)
          }
          if(item.total){
            cpuTotal.push(item.total)
          }
          if(item.percent_available_memory){
            percentMemory.push(item.percent_available_memory)
          }
      })

      // console.log(item,'item');

      let datasets = {
        label: item.name,
        responsive: true,
        data: [],
        fill: false,
        lineTension: 0.2,
        borderColor:'',
        borderWidth: 1
      }

      item.raw_data.map(item=>{
        datasets.data.push(item.downtime);
      })
      datasets.borderColor = this.ramdomColor();

      let data ={};
      if(type=='disk'){
        let datasetsFree = {
          label: 'Free',
          responsive: true,
          data: [],
          fill: false,
          lineTension: 0.2,
          borderColor:'',
          borderWidth: 1
        }
        datasetsFree.data = freeSpace;
        datasetsFree.borderColor = this.ramdomColor();
        data = {
          labels: labels,
          datasets: [datasets,datasetsFree]
        }
      }

      if(type =='cpu'){
        let datasetsTotal = {
          label: 'Total',
          responsive: true,
          data: [],
          fill: false,
          lineTension: 0.2,
          borderColor:'',
          borderWidth: 1
        }
        datasetsTotal.data = cpuTotal;
        datasetsTotal.borderColor = this.ramdomColor();
        data = {
          labels: labels,
          datasets: [datasets,datasetsTotal]
        }
      }

      if(type =='memory'){
        let datasetsPercent = {
          label: 'percent',
          responsive: true,
          data: [],
          fill: false,
          lineTension: 0.2,
          borderColor:'',
          borderWidth: 1
        }
        datasetsPercent.data = percentMemory;
        datasetsPercent.borderColor = this.ramdomColor();
        data = {
          labels: labels,
          datasets: [datasets,datasetsPercent]
        }  
      }

      
      chartList.push(data);


    });
  }

  ramdomColor() {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z})`;
  // alt+9+6
  //   x+""+y+""
  }

  // เซ็ต State ส่งค่าไปที่ Button ของ VM
  handlevm = (e) => {
    // this.setState({ vm: event.target.value });
    this.setState({ selectedVM: e.target.value });
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

  Multi_VM = async (e) => {
    e.preventDefault();
    // console.log(e.target.value,'e value');
    
    const url = process.env.REACT_APP_API_VM_MULTI;

    const objid = {
      customer: this.state.selectedCustomer,
      device: this.state.selectedVM,
      sdate: this.state.sdate,
      edate: this.state.edate,
      token: localStorage.getItem("access_token"),
    };

    this.setState({ loading: true });
    this.setState({openModal : true})

    try {
      const res = await axios.post(url, objid, {
        headers: {
          authorization: `Bearer ${this.state.access_token}`,
        },
      });

    var packageChart = []

    res.data.map(item => {
      // return this.DataFilter(item);
      console.log(this.DataFilter(item),'Data')

      packageChart.push({
        vmname:item.vmname,
        chart: this.DataFilter(item),
      })
      
    })

    this.setState({
      chart: packageChart
    })

    console.log(packageChart,' แพ็คเก็จ');


    this.setState({loading: false})
    this.setState({success : true})


    } catch (error) {
      console.log({...error});
      
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


    }
  }

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

    // console.log(this.state.chart.map(item => {
    //   return item.map((n,index) => {
    //     console.log(n,'n นะจ๊ะ');
    //     console.log(index,'index นะจ๊ะ');
    //   })
    // }),'chart นะ');


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
                                onSubmit={this.Multi_VM}
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
                                onSubmit={this.Multi_VM}
                              >
                                <div className="panel-heading">VM</div>
                                <div className="panel-body">

                                  <Select 
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
                                onSubmit={this.Multi_VM}
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

                    <Col md={1}>
                      <button id="proceed" className="btn btn-primary btn-md" role="button"
                        onClick={(event) => this.Multi_VM(event) }
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
                          {!loading && <span>Process</span>}
                      </button>
                    </Col>

                    {/* <Col md={2}>
                      <React_PDF chart={this.state.chart}/>
                    </Col> */}



                    
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

                      {this.state.chart.length > 0 &&
                        <Chartjs chart={this.state.chart}/>
                      }


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

export default Reports_Modal;
