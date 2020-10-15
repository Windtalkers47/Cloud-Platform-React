import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Chartlist from "./chart";
import axios from "axios";
import { Grid, Row, Col, Table } from "react-bootstrap";

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
  //     });

  //     console.log("CompanyName",res);


  //   } catch (e) {
  //       console.log({...e});
  //     return null;
  //   }
  // }

  const CNOAPI = () => {

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
    })
  }

  // console.log(CompanyNameTH,'CNO');


    return (
        <div>
            <Col md={2}>
              <button className="btn btn-primary btn-md" role="button"
                onClick={handlePrint}>Print Report</button>
            </Col>
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
      />
    );
  }
}