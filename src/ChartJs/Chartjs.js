import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';



export default function chartjs(props) {
    const chartRender = props.chart;
    console.log(props,'props ออกเถอะคร้าบบบบ');
        return (
            <div>
               {chartRender.map((n, index) => {
                    return <Line key={index} data={n} />;
                })}
            </div>
            
        )
        

}
