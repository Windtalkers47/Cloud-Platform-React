import React, { Component } from 'react'
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table } from "react-bootstrap";

export default class Chartlist extends Component {
constructor(props) {
    super(props)

    this.state = {
        customer:{},


         chartData:{
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
                     backgroundColor:[
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                     ],
                     borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],

                 }
             ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

         }
    }
}

componentDidMount(){
    axios.post("http://203.151.34.28:5000/api/selectVM")
    .then((res) => {
        let DataVM = res.data;
        console.log(DataVM);
        
    })
}


    render() {
        return (
            <div className="chart">
                <Bar
                data={this.state.chartData}
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
