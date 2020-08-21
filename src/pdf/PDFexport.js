import React from 'react'
import axios from "axios";
import moment from "moment"
import Chartlist from "../pdf/chart";
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import TableList from "../views/Reports";

// การออกรายงาน PDF

// จะใช้ import หรือ var ก็ได้

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// แปลง data ให้เป็น link
export default function PDFexport({ chartReference }) {
    const toDataURL = (url, callback) => {
        // console.log(url);
        
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
              resolve(reader.result)
            }
            reader.readAsDataURL(xhr.response);
          };
          xhr.open('GET', url);
          xhr.responseType = 'blob';
          xhr.send();
        })
      }

      const printtest = async () => {
        console.log('Printtest ChartReference : ', chartReference)
        // await this.setState({ chartReference: res.data });
        // return chartReference; // ส่งค่า Ref กลับคืนไป
      }

    
    const  printPDF = async () => {
        // console.log(printPDF);
 
        // กำหนด URL ที่ใช้ในการรับข้อมูลเพื่อรอการส่งออก
        // https://203.151.151.186/chart.png?id=2074&avg=300&width=850&height=270&graphstyling=base&FontSize='12'&showLegend='1'&graphid=-1&username=readonly&passhash=1564011095&sdate=2020-06-20-00-00-00&edate=2020-06-22-00-00-00
        
        // let url = "https://203.151.151.186/chart.png?id="+  +"&avg=300&width=850&height=270&graphstyling=base&FontSize='12'&showLegend='1'&graphid=-1&username=readonly&passhash=1564011095&sdate=" +  + "&edate=" + +"";
        let url ="https://203.151.151.186/chart.png?id=2074&avg=300&width=850&height=270&graphstyling=base&FontSize='12'&showLegend='1'&graphid=-1&username=readonly&passhash=1564011095&sdate=2020-06-20-00-00-00&edate=2020-06-22-00-00-00";
        let result = await toDataURL(url)
        pdfMake.fonts = {
          Kanit: {
            normal: "Kanit-Regular.ttf",
            bold: "Kanit-Bold.ttf",
            italics: "Kanit-Italic.ttf",
            bolditalics: "Kanit-BoldItalic",
          },
          Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf",
            italics: "Roboto-Italic.ttf",
            bolditalics: "Roboto-MediumItalic",
          },
          THSarabunNew: {
            normal: "THSarabunNew.ttf",
            bold: "THSarabunNew-Bold.ttf",
            italics: "THSarabunNew-Italic.ttf",
            bolditalics: "THSarabunNew-BoldItalic.ttf",
          },
        };
        var docDefinition = {
          content: [
            {
              text: "Cloud Platform Report",
              fontSize: 18,
              alignment: "center",
            },
            {
              image: result,
              width: 500,
              height: 150,
            },
            {
              
            },

            // {
            //   canvas: [
            //     {
            //      type: 'path',
            //      d: 'M 0,20 L 100,160 Q 130,200 150,120 C 190,-40 200,200 300,150 L 400,90',
            //      lineWidth: 10,
            //      lineColor: 'blue',
            //      linecolor:'red',
            //     },
            //     ]
            // },

    
          ],
          defaultStyle: {
            font: "THSarabunNew",
          },
    
        };
        pdfMake.createPdf(docDefinition).open();
        
        var chartColors = {
          red: "rgb(255, 99, 132)",
          orange: "rgb(255, 159, 64)",
          yellow: "rgb(255, 205, 86)",
          green: "rgb(75, 192, 192)",
          blue: "rgb(54, 162, 235)",
          purple: "rgb(153, 102, 255)",
          grey: "rgb(231,233,237)",
        };
      
      }
    
    return (
        <div>
            <button onClick={printPDF}>Download PDF</button>      
        </div>
    )
}
