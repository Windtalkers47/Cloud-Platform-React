// import React, { Component } from 'react'
// import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Card from "components/Card/Card.jsx";
// import { Grid, Row, Col, Table } from "react-bootstrap";
// import { jsPDF } from "jspdf";

// var chartColors = {
//     red: 'rgb(255, 99, 132)',
//     orange: 'rgb(255, 159, 64)',
//     yellow: 'rgb(255, 205, 86)',
//     green: 'rgb(75, 192, 192)',
//     blue: 'rgb(54, 162, 235)',
//     purple: 'rgb(153, 102, 255)',
//     grey: 'rgb(231,233,237)'
//   };
  
//   var randomScalingFactor = function() {
//     return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
//   };
  
//   var data =  {
//     labels: ["Downtime", "Total", "AVG"],
//     datasets: [{
//       label: 'Fuel',
//       backgroundColor: [
//         chartColors.red,
//         chartColors.blue,
//         chartColors.yellow],
//       data: [
//         1, 
//         randomScalingFactor(), 
//         randomScalingFactor(), 
//       ]
//     }]
//   };
  
//   var myBar = document.getElementById(document.getElementById("myChart"), {
//     type: 'Bar', 
//     data: data, 
//     options: {
//       responsive: true,
//       title: {
//         display: true,
//         text: "รายงานความก้าวหน้า CPU (เหลือนำเข้าข้อมูล)"
//       },
//       tooltips: {
//         mode: 'index',
//         intersect: false
//       },
//       legend: {
//         display: false,
//       },
//       scales: {
//         xAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
  
//   var myBar2 = document.getElementById(document.getElementById("myChart2"), {
//     type: 'Bar', 
//     data: data, 
//     options: {
//       responsive: true,
//       title: {
//         display: true,
//         text: "รายงานความก้าวหน้า Disk (เหลือนำเข้าข้อมูล)"
//       },
//       tooltips: {
//         mode: 'index',
//         intersect: false
//       },
//       legend: {
//         display: false,
//       },
//       scales: {
//         xAxes: [{
//           ticks: {
//             beginAtZero: true,
//             stepSize: 2
//           }
//         }]
//       }
//     }
//   });
  
//   var myBar3 = document.getElementById(document.getElementById("myChart3"), {
//     type: 'Bar', 
//     data: data, 
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       title: {
//         display: true,
//         text: "รายงานความก้าวหน้า Memory (เหลือนำเข้าข้อมูล)"
//       },
//       tooltips: {
//         mode: 'index',
//         intersect: false
//       },
//       legend: {
//         display: false,
//       },
//       scales: {
//         xAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
  
//     document.getElementById.chart('downloadPdf').click(function(event) {
//     // get size of report page
//     var reportPageHeight = document.getElementById('reportPage').innerHeight();
//     var reportPageWidth = document.getElementById('reportPage').innerWidth();
    
//     // create a new canvas object that we will populate with all other canvas objects
//     var pdfCanvas = document.getElementById('<canvas />').attr({
//       id: "canvaspdf",
//       width: reportPageWidth,
//       height: reportPageHeight
//     });
    
//     // keep track canvas position
//     var pdfctx = document.getElementById(pdfCanvas)[0].getContext('2d');
//     var pdfctxX = 0;
//     var pdfctxY = 0;
//     var buffer = 100;
    
//     // for each chart.js chart
//     document.getElementById("canvas").each(function(index) {
//       // get the chart height/width
//       var canvasHeight = document.getElementById(this).innerHeight();
//       var canvasWidth = document.getElementById(this).innerWidth();
      
//       // draw the chart into the new canvas
//       pdfctx.drawImage(document.getElementById(this)[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
//       pdfctxX += canvasWidth + buffer;
      
//       // our report page is in a grid pattern so replicate that in the new canvas
//       if (index % 2 === 1) {
//         pdfctxX = 0;
//         pdfctxY += canvasHeight + buffer;
//       }
//     });
    
//     // create new pdf and add our new canvas as an image
//     var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
//     pdf.addImage(document.getElementById(pdfCanvas)[0], 'PNG', 0, 0);
    
//     // download the pdf
//     pdf.save('filename.pdf');
//   });

// export default class Exportpdf extends Component {
//     render() {
//         return (
//             <div>
//                 <button>
//                     <a href="#" id="downloadPdf">Download PDF</a>
//                 </button>
//             </div>
//         )
//     }
// }
