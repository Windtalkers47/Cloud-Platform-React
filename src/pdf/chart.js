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
            total:[],
        }
    }


getCustomers = async () =>  {
    await axios.post(process.env.API_GETCUSTOMER)
    .then((res) => {
      // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
      this.setState({ customerList: res.data.customername });
    });
  }


//   handleData = async() => {
//     await axios.get('http://192.168.253.217/ci_api/api/selectVM2')
//     .then(res => {
//       this.setState ({data: res.data})
//       // console.log(this.state.total.length);
//       // console.log(res.data.cpu_data.raw_data);
//       // console.log(res.data.cpu_data.raw_data.map((item)=>{return item.Total}));
//       this.setState ({total:res.data.cpu_data.raw_data.map((item)=>{return item.Total})})
//  // console.log(this.state.total);
//     })
//   }

componentDidMount(){
    // this.getData();
// console.log(this.props.total);

}


chart(cpu_total,cpu_datetime,cpu_downtime){

    // cpu_datetime.map(item=>{
    //     if(item.moment().format() ==="12:00:00"){
    //         return item.moment().format()
    //     }else{
    //         return ""
    //     }
    // })

//    // console.log("datetime", datetime);
//    // console.log("total", total);
    let chart = {
            labels:cpu_datetime, // X
            datasets:[ // Y
                {
                    label:'Number',
                    responsive: true,
                    data:cpu_total,

                    backgroundColor: [
                        'rgba(255, 99, 132, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 2,
                },
                {
                    label:'Number2',
                    responsive: true,
                    data:cpu_downtime,

                    backgroundColor: [
                        'rgba(255, 99, 12, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 12, 1)',
                    ],
                    borderWidth: 2,
                },
                // {
                //     label:'Number',
                //     responsive: true,
                //     data:datetime,
                // },
            ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }

    return chart
}


    render() {
        return (
            <div className="chart">
                            <span>555</span>

                <Line
                data={this.chart(this.props.cpu_total,this.props.cpu_datetime,this.props.cpu_downtime)}
                options={{
                    responsive:true,
                    title:{
                        text: "Hello There",
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
//         // console.log(DataVM);
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
