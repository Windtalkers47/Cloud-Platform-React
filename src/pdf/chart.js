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
        this.chartRef = React.createRef()
    }

getCustomers = async () =>  {
    await axios.post(process.env.API_GETCUSTOMER)
    .then((res) => {
      // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
      this.setState({ customerList: res.data.customername });
    });
  }


componentDidMount(){
    // console.log(this.chartRef1.current.Instance.toBase64Image())
    // console.log(this.chartRef2.current.Instance.toBase64Image())
    // console.log(this.chartRef3.current.Instance.toBase64Image())
    // console.log(this.chartRef.current.chartInstance.chart.toBase64Image(), 'รูปภาพที่อ้างว้าง')
    console.log(this.chartRef.current.chartInstance.chart,'ChartRef');
}



CPU_chart(cpu_total,
    cpu_datetime,
    cpu_downtime, 
    ){

    // cpu_datetime.map(item=>{
    //     if(item.moment().format() ==="12:00:00"){
    //         return item.moment().format()
    //     }else{
    //         return ""
    //     }
    // })

    let CPU_chart = {
            labels:cpu_datetime, // X
            datasets:[ // Y
                {
                    label:'Total',
                    responsive: true,
                    data:cpu_total,

                    backgroundColor: [
                        'rgba(255, 99, 132, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 10)',
                    ],
                    borderWidth: 2,
                },
                {
                    label:'Downtime',
                    responsive: true,
                    data:cpu_downtime,

                    backgroundColor: [
                        'rgba(255, 99, 255, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 255, 10)',
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

    return CPU_chart
}

Disk_chart( 
    disk_FreeSpace,
    disk_datetime,
    disk_downtime,
    ){


    let Disk_chart = {
            labels:disk_datetime, // X
            datasets:[ // Y
                {
                    label:'Free Space',
                    responsive: true,
                    data:disk_FreeSpace,

                    backgroundColor: [
                        'rgba(255, 99, 132, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 10)',
                    ],
                    borderWidth: 2,
                },
                {
                    label:'Downtime',
                    responsive: true,
                    data:disk_downtime,

                    backgroundColor: [
                        'rgba(255, 99, 255, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 255, 10)',
                    ],
                    borderWidth: 2,
                },

            ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }

    return Disk_chart
}

Memory_chart( 
    memory_datetime,
    memory_downtime,
    memory_percent,){


    let Memory_chart = {
            labels:memory_datetime, // X
            datasets:[ // Y
                {
                    label:'Percent Available Memory',
                    responsive: true,
                    data:memory_percent,

                    backgroundColor: [
                        'rgba(255, 99, 132, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 10)',
                    ],
                    borderWidth: 2,
                },
                {
                    label:'Downtime',
                    responsive: true,
                    data:memory_downtime,

                    backgroundColor: [
                        'rgba(255, 99, 255, 10)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 255, 10)',
                    ],
                    borderWidth: 2,
                },
            ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }

    return Memory_chart
}

    render() {
        window.print()
        return (
            <div className="container">
                <div className="chart" id="chart">

                    <Line ref={this.chartRef}
                    data={this.CPU_chart(this.props.cpu_total,this.props.cpu_datetime,this.props.cpu_downtime)}
                    options={{
                        responsive:true,
                        title:{
                            text: "รายงานความก้าวหน้าของ CPU",
                            display: true,
                            fontsize: 60,
                        },

                    }}

                    />

                </div>

                <div className="chart">

                    <Line
                    ref={el => this.chartRef2 = el}
                    data={this.Disk_chart(this.props.disk_datetime,this.props.disk_downtime,this.props.disk_FreeSpace)}
                    options={{
                        responsive:true,
                        title:{
                            text: "รายงานความก้าวหน้าของ Disk",
                            display: true,
                            fontsize: 60,
                        },

                    }}

                    />
                </div>

                <div className="chart">

                    <Line
                    ref={el => this.chartRef3 = el}
                    data={this.Memory_chart(this.props.memory_datetime,this.props.memory_downtime,this.props.memory_percent)}
                    options={{
                        responsive:true,
                        title:{
                            text: "รายงานความก้าวหน้าของ memory",
                            display: true,
                            fontsize: 60,
                        },

                    }}

                    />
                </div>

            </div>

            
        )
    }
}



