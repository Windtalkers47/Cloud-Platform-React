import React, { Component, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import th from 'date-fns/locale/th';

import "react-datepicker/dist/react-datepicker.css";
import { TableList } from "../views/Reports";
import "./DateCSS.css";
import moment from "moment";

registerLocale('th', th)


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
        locale="th"
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
        dateFormat="dd/MM/yyyy"
        isClearable
        selectsRange
      />
      </Col>

      <Col md={6}>
      <p>วันที่สิ้นสุด</p>
      <DatePicker
        // วันที่สิ้นสุด
        locale="th"
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
        dateFormat="dd/MM/yyyy"
        // dateFormat="yyyy-MM-dd-00-00-00"
        // dateFormat="yyyy-MM-dd-hh-mm-ss aa"
        isClearable
        selectsRange
      />
      </Col>

    </div>
  );
}

