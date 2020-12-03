import React, { Component, Fragment } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';



export default function chartjs(props) {
    const chartRender = props.chart;
    console.log(props,'props ออกเถอะคร้าบบบบ');
        return (
            <div>
                {chartRender.map((item) => {
                    console.log(item.vmname,'vmname นะจ๊ะ');
                    console.log(item.chart,'Chart นะจ๊ะ');
                    return item.chart.map((n,index) => {
                        return (
                            <>
                                {item.vmname}
                                <Line key={index} data={n} />
                            </>
                            )

                    })
                })}
            </div>
            
        )
        

}
