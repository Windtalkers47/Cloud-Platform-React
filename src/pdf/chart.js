import React, { Component, useState, useEffect, useRef } from 'react'
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table } from "react-bootstrap";
import ReactToPrint ,{ useReactToPrint } from 'react-to-print';
import PDF from "./PDF.js";

export default function Chartlist({
    chartReference,
    cpu_total,
    cpu_datetime,
    cpu_downtime,
    disk_FreeSpace,
    disk_datetime,
    disk_downtime,
    memory_percent,
    memory_datetime,
    memory_downtime,
    Datareport,
}) {

    const [total, setTotal] = useState([])
    const [isloading, setisloading] = useState(false)
    // const chartRef = React.createRef()


const getCustomers = async () =>  {
    await axios.post(process.env.API_GETCUSTOMER)
    .then((res) => {
      // เซ็ต State ให้เก็บ data ที่ respone แล้วไว้ในตัวแปร customerList
      this.setState({ customerList: res.data.customername });
    });
  }



const CPU_chart = (cpu_total,
    cpu_datetime,
    cpu_downtime, 
    ) => {

    // cpu_datetime.map(item=>{
    //     if(item.moment().format() ==="12:00:00"){
    //         return item.moment().format()
    //     }else{
    //         return ""
    //     }
    // })

        // console.log(cpu_total,'cpu_total');


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

const Disk_chart = ( 
    disk_FreeSpace,
    disk_datetime,
    disk_downtime,
    ) => {


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

const Memory_chart = ( 
    memory_datetime,
    memory_downtime,
    memory_percent,) => {


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

useEffect( () => {
    
    CPU_chart()
    Disk_chart()
    Memory_chart()

})

// if(isloading) return <div>Loading...</div>

// console.log(cpu_total,'CPU Chart');

        return (
            <div className="container">
                <div className="chart" id="chart">


                    <Line
                    // ref={el => this.chartRef = el}
                        data={CPU_chart(cpu_total,cpu_datetime,cpu_downtime)}
                        options={{
                            responsive:true,
                            title:{
                                text: "รายงานความก้าวหน้าของ CPU",
                                display: true,
                                fontsize: 60,
                            },
                            scales:{
                                yAxes:[{
                                    ticks:{
                                        autoSkip:true,
                                        maxTicksLimit:10,
                                        beginAtZero:true,
                                    },
                                    gridLines:{
                                        display:true,
                                    }
                                }],
                                xAxes:[{
                                    ticks:{
                                        autoSkip:true,
                                        maxTicksLimit:10,
                                        beginAtZero:true,
                                    },
                                    gridLines:{
                                        display:false,
                                    }
                                }]
                            },

                        }}

                    />

                </div>

                <div className="chart">

                    <Line
                        // ref={el => this.chartRef2 = el}
                        data={Disk_chart(disk_datetime,disk_downtime,disk_FreeSpace)}
                        options={{
                            responsive:true,
                            title:{
                                text: "รายงานความก้าวหน้าของ Disk",
                                display: true,
                                fontsize: 60,
                            },
                            scales:{
                                yAxes:[{
                                    ticks:{
                                        autoSkip:true,
                                        maxTicksLimit:10,
                                        beginAtZero:true,
                                    },
                                    gridLines:{
                                        display:true,
                                    }
                                }],
                                xAxes:[{
                                    ticks:{
                                        autoSkip:true,
                                        maxTicksLimit:10,
                                        beginAtZero:true,
                                    },
                                    gridLines:{
                                        display:false,
                                    }
                                }]
                            },

                        }}

                    />
                </div>

                <div className="chart">

                    <Line
                        // ref={el => this.chartRef3 = el}
                        data={Memory_chart(memory_datetime,memory_downtime,memory_percent)}
                        options={{
                            responsive:true,
                            title:{
                                text: "รายงานความก้าวหน้าของ memory",
                                display: true,
                                fontsize: 60,
                            },
                            scales:{
                                yAxes:[{
                                    ticks:{
                                        autoSkip:true,
                                        maxTicksLimit:10,
                                        beginAtZero:true,
                                    },
                                    gridLines:{
                                        display:true,
                                    }
                                }],
                                xAxes:[{
                                    ticks:{
                                        autoSkip:true,
                                        maxTicksLimit:10,
                                        beginAtZero:true,
                                    },
                                    gridLines:{
                                        display:false,
                                    }
                                }]
                            },

                        }}

                    />
                </div>

            </div>

            
        )
    
}

