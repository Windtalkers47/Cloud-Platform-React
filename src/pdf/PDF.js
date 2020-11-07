import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Chartlist from "./chart";
import axios from "axios";
import { Grid, Row, Col, Table } from "react-bootstrap";
import chartjs from "../ChartJs/Chartjs";

export default function PDF(props) {

  // Function ตัวแปรเอาไว้เก็บ componentRef ที่เอาไว้แสดงผล
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  // Function ดึง API Company Name
  const [CompanyNameTH, setCompanyNameTH] =  useState()
  const [CompanyNameEN, setCompanyNameEN] =  useState()
  
  
  // const CNOAPI = () => {

  //   const url = process.env.REACT_APP_API_COMPANY_NAME;
  //   const cno = {
  //                 "cno" : "10375"
  //               };

  //   try {
  //     const res =  axios.post(url, cno, {
  //       headers: {
  //         authorization: `Bearer ${this.state.access_token}`,
  //         "Access-Control-Allow-Origin": "*",
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json', 
  //       },
  //     }, () => {
  //       console.log(res,'CNO API');
  //     });

  //   } catch (e) {
  //       console.log({...e});
  //     return null;
  //   }
  // }

  // const CNOAPI = () => {

  //   axios({
  //     method: 'post',
  //     url: process.env.REACT_APP_API_COMPANY_NAME,
  //     data: {'cno' : 123456789},
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json', 
  //     }
  //   }, () => {
  //     console.log(CNOAPI,'CNOAPI');
  //   })
  //   .then((res) => {
  //     this.setState({
  //       CompanyNameTH : res.data.companynameth, // เก็บค่าใส่ตัวแปร TH
  //       CompanyNameEN : res.data.companynameen, // เก็บค่าใส่ตัวแปร EN
  //     })
  //   })
  // }

    return (
        <div>
            <Col md={1}>
              <button className="btn btn-primary btn-md" role="button"
                onClick={handlePrint}>Print Report</button>
            </Col>
            {/* <Col md={1}>
              <button className="btn btn-primary btn-md" role="button"
                onClick={CNOAPI}>Call Company Name</button>
            </Col> */}
            <ComponentToPrint  
              ref={componentRef} 
              cpu_total={props.cpu_total}
              cpu_datetime={props.cpu_datetime}
              cpu_downtime={props.cpu_downtime}
              disk_FreeSpace={props.disk_FreeSpace}
              disk_datetime={props.disk_datetime}
              disk_downtime={props.disk_downtime}
              memory_percent={props.memory_percent}
              memory_datetime={props.memory_datetime}
              memory_downtime={props.memory_downtime}
              set_datetime={props.set_datetime}
            />
        </div>
    )
}

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (

      <Chartlist {...this.props}
      style={
        {"margin  ":"0"},
        {"padding": "0"}
        }
        className="print-container"
      />
      
    );
  }
}



