import React, { Component, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TableList } from "../views/Reports";
import "./DateCSS.css";
import moment from "moment";
import Dropdown from "./Dropdown";

export default function Datepicker(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <Col md={6}>
      {/* วันที่เริ่ม
          กำหนดค่าส่งไปที่ Backend 
          ยึดเอา Pattern >> year-Month-Day-Hours-Minutes-Second
          */}
      <p>วันที่เริ่ม</p>
      <DatePicker
        selected={startDate}
        onChange={
          (e) => {
            setStartDate(e);
            props.setDate("sdate", e)
          }
        }
        selectsStart
        // startDate={startDate}
        // endDate={endDate}
        showMonthDropdown
        showYearDropdown
        timeInputLabel="Time"
        showTimeInput
        dateFormat="yyyy-MM-dd-00-00-00 aa"
      />
      </Col>

      <Col md={6}>
      <p>วันที่สิ้นสุด</p>
      <DatePicker
        // วันที่สิ้นสุด
        selected={endDate}
        onChange={(e) => {setEndDate(e);props.setDate("edate", e)}}
        selectsEnd
        // startDate={startDate}
        // endDate={endDate}
        // minDate={startDate}
        showMonthDropdown
        showYearDropdown
        timeInputLabel="Time"
        showTimeInput
        dateFormat="yyyy-MM-dd-00-00-00 aa"
        // dateFormat="yyyy-MM-dd-hh-mm-ss aa"
      />
      </Col>

    </div>
  );
}

// export default function Datepicker() {
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     return (
//         <div>
//           {/* วันที่เริ่ม
//           กำหนดค่าส่งไปที่ Backend
//           ยึดเอา Pattern >> year-Month-Day-Hours-Minutes-Second
//           */}
//           <p>วันที่เริ่ม</p>
//             <DatePicker
//               selected={startDate}
//               onChange={date => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               // endDate={endDate}
//               showMonthDropdown
//               showYearDropdown
//               timeInputLabel="Time"
//               showTimeInput
//               dateFormat="yyyy-MM-dd-00-00-00 aa"
//             />
//             <p>วันที่สิ้นสุด</p>
//             <DatePicker
//               // วันที่สิ้นสุด
//               selected={endDate}
//               onChange={date => setEndDate(date)}
//               selectsEnd
//               // startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               showMonthDropdown
//               showYearDropdown
//               timeInputLabel="Time"
//               showTimeInput
//               dateFormat="yyyy-MM-dd-hh-mm-ss aa"
//             />
//         </div>
//     )
// }
