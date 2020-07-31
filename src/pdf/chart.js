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
        // console.log(this.props);
    }


getCustomers = async () =>  {
    await axios.post(process.env.API_GETCUSTOMER)
    .then((res) => {
      // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
      this.setState({ customerList: res.data.customername });
      console.log(res);
    });
  }


//   handleData = async() => {
//     await axios.get('http://192.168.253.217/ci_api/api/selectVM2')
//     .then(res => {
//       this.setState ({data: res.data})
//       console.log(this.state.total.length);
//       console.log(res.data.cpu_data.raw_data);
//       console.log(res.data.cpu_data.raw_data.map((item)=>{return item.Total}));
//       this.setState ({total:res.data.cpu_data.raw_data.map((item)=>{return item.Total})})
//  console.log(this.state.total);
//     })
//   }

componentDidMount(){
    // this.getData();
console.log(this.props.total);

}


chart(total,datetime){
   console.log("datetime", datetime);
   console.log("total", total);
    let chart = {
            labels:datetime, // X
            datasets:[ // Y
                {
                    label:'Number',
                    responsive: true,
                    data:total,
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
                <Line
                data={this.chart(this.props.total,this.props.dateTimeData)}
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
