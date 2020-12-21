import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import font from "../assets/fonts/Kanit-Regular.ttf";

// Register font
Font.register({ 
    family: 'Kanit', 
    src: 'font' 
});

// Reference font
const styles = StyleSheet.create({
    title: {
        fontFamily: 'Kanit'
      },
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

const MyDoc = (props) => (
    <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Text>สวัสดี</Text>
        </View>

        {props.chart.map((item) => {
            return item.chart.map((n,index) => {
                return (
                    <>
                        {item.vmname}
                        <Line key={index} data={n} />
                    </>
                    )

            })
        })}


{/* 
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View> */}


    </Page>
  </Document>
)

// const PDF_Demo = props.chart
// console.log(PDF_Demo,'Demo');

export default function React_PDF(props) {
    console.log(props.chart,'pdf props');

    return (
        <div className="PDF_Sector">

        <PDFDownloadLink 
            document={MyDoc(props)} 
            fileName="Cloud Operation (inet).pdf">

        {({ blob, url, loading, error }) => (

            loading ? 
            <button id="Loading_Button" className="btn btn-primary btn-md" role="button">
                Loading document...
            </button>

            :             
            <button id="Download_Button" className="btn btn-primary btn-md" role="button">
                Download now!
            </button>

            )}

        </PDFDownloadLink>

        </div>
    )
}
