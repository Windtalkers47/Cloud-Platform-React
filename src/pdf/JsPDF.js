// import React from 'react'
// import { jsPDF } from "jspdf";

// var chart = new CanvasJS.Chart("chartContainer",
// {
// 		title: {
// 			text: "Exporting chart using jsPDF & toDataurl"
// 		},
// 		data: [
// 		{
// 			type: "spline",
// 			dataPoints: [ 
// 				{ x: 10, y: 4 }, 
// 				{ x: 20, y: 7 },
// 				{ x: 30, y: 2 },
// 				{ x: 40, y: 3 },
// 				{ x: 50, y: 5 }
// 			]
// 		}
// 		]
// });
// chart.render();

// var chart = new CanvasJS.Chart("chartContainer2", {
// 	animationEnabled: true,
// 	exportEnabled: true,
// 	theme: "light1", // "light1", "light2", "dark1", "dark2"
// 	title:{
// 		text: "Simple Column Chart with Index Labels"
// 	},
// 	data: [{
// 		type: "column", //change type to bar, line, area, pie, etc
// 		//indexLabel: "{y}", //Shows y value on all Data Points
// 		indexLabelFontColor: "#5A5757",
// 		indexLabelPlacement: "outside",
// 		dataPoints: [
// 			{ x: 10, y: 71 },
// 			{ x: 20, y: 55 },
// 			{ x: 30, y: 50 },
// 			{ x: 40, y: 65 },
// 			{ x: 50, y: 92, indexLabel: "Highest" },
// 			{ x: 60, y: 68 },
// 			{ x: 70, y: 38 },
// 			{ x: 80, y: 71 },
// 			{ x: 90, y: 54 },
// 			{ x: 100, y: 60 },
// 			{ x: 110, y: 36 },
// 			{ x: 120, y: 49 },
// 			{ x: 130, y: 21, indexLabel: "Lowest" }
// 		]
// 	}]
// });
// chart.render();

// var content = document.getElementById("txtContent"),
//   button = document.getElementById("btnDownload");

// function generatePDF() {
//   var canvases = [];
//   canvases.push(document.querySelector("#chartContainer .canvasjs-chart-canvas"));
//   canvases.push(document.querySelector("#chartContainer2 .canvasjs-chart-canvas"))
  
//   var pdf = new jsPDF();
//   pdf.setFontSize(12);
//   let count = 0
  
//   canvases.forEach(canvas => {
//     var dataURL = canvas.toDataURL('image/jpeg');
//     /* ************ */
//     if (count > 0) pdf.addPage(canvas.style.width, canvas.style.height); // had to do this
//     count++; // because the first page was blank... I only add new pages after first is created
//     /* ************* */
//     pdf.addImage(dataURL, 'JPEG', 15, 40, 180, 180);
//   })
  
//   pdf.save("download.pdf");
// }

// button.addEventListener("click", generatePDF);


// export default function JsPDF() {
//     return (
//         <div>


//         <br/>
//         <button id="btnDownload"> Download PDF </button>
//         <br/><hr/><br/>
//         <div id="chartContainer" style="height: 300px; width: 300px;"></div>
//         <div id="chartContainer2" style="height: 300px; width: 300px;"></div>
                    
//         </div>
//     )
// }
