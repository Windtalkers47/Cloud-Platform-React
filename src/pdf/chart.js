import React, { Component, useState, useEffect } from 'react'
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table } from "react-bootstrap";

export default class Chartlist extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
        }
        // console.log(this.props);
    }

// getData = async () => {
//     await axios.post("http://192.168.250.97:5555/api/selectVm")
//     .then((res) => {
//         var ResultData = this.setState({ customerList: res.data.customername})        
//     })
// }

getCustomers = async () =>  {
    await axios.post("http://192.168.250.97:5555/api/selectCustomer").then((res) => {
      // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
      this.setState({ customerList: res.data.customername });
      console.log(res);
    });
  }

componentDidMount(){
    // this.getData();
}


chart(){
    // console.log("Report : ",this.state.report);
    let chart = {
            labels:['1','2','3','4','5' // Y
            ],
            datasets:[ // X
                {
                    label:'Number',
                    responsive: true,
                    data:[
                        20,
                        25,
                        30,
                        24,
                        48
                    ],
                },
                {
                    label:'Number',
                    responsive: true,
                    data:[
                        20,
                        25,
                        30,
                        24,
                        48
                    ],
                },
            ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }

    return chart
}


    render() {
        return (
            <div className="chart">
                <Line
                data={this.chart}
                options={{
                    responsive:true,
                    title:{text: "Hello There",
                    display: true,
                    fontsize: 48,
                    },

                }}

                />

            </div>
        )
    }
}


// export default function Chartlist() {

// const DataAPI = () => {
//     axios.post("http://203.151.34.28:5000/api/selectVM")
//     .then((res) => {
//         let DataVM = res.data;
//         console.log(DataVM);
//     })
// }

// const setData = () => {
    
// }

//     return (
//         <div>
//             <Bar
//                 data={DataAPI}
//                 options={{
//                     responsive:true,
//                     title:{text: "Hello There",
//                     display: true,
//                     fontsize: 48,
//                     },

//                 }}
//                 ref={this.chart}

//                 />
//         </div>
//     )
// }
