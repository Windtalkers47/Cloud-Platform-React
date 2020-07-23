/*!
=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================
* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Devices() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            title="Striped Table with Hover"
            category="Here is a subtitle for this table"
            ctTableFullWidth
            ctTableResponsive
            content={
              <div>
              <h2>Devices Page...</h2>


              </div>


            }
          />


        


        </Col>
      </Row>
    </Grid>
  </div>
  )
}

export default Devices
