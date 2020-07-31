import React, { Component, useState } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

import { Bar, Line, Area } from "chart.js";
import { Chart } from "react-chartjs-2";
import PDFexport, { toDataURL } from "../pdf/PDFexport";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import base64Img from "base64-img";
import ReactPDF from "@react-pdf/renderer";
import Datepicker from "../variables/Datepicker";
import "../variables/DateCSS.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Dropdown from "../variables/Dropdown";
import Chartlist from "../pdf/chart";
require("dotenv").config();

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      vm: "",
      data: "",
      total: [],
      dateTimeData: [],
    };
  }

  handleSubmit = () => {
    alert("เก่งมากกก ไอ้ต้าวววว *0*");
  };

  handleCustomer = () => {
    axios
      .get("http://202.183.198.6/ci_api/api/selectCustomer")
      .then((res) => {
        this.setState({ name: res.data });
        // console.log(res.data);
      });
  };

  handleVM = () => {
    axios.get("http://202.183.198.6/ci_api/api/selectVM").then((res) => {
      this.setState({ vm: res.data });
      // console.log(res.data);
    });
  };

  handleData = () => {
    axios.get("http://202.183.198.6/ci_api/api/selectVM2").then((res) => {
      this.setState({ data: res.data });
      // console.log(res.data.cpu_data.raw_data);
      // console.log(
      //   // res.data.cpu_data.raw_data.map((item) => {
      //   //   return item.Total;
      //   // })
      // );
      this.setState({
        total: res.data.cpu_data.raw_data.map((item) => {
          return item.Total;
        }),
      });
      this.setState({
        dateTimeData: res.data.cpu_data.raw_data.map((item) => {
          return item.datetime;
        }),
      });
      // console.log(this.state.total);
    });
  };

  // Life Cycle ที่ใช้เรียกข้อมูลออกมาดู
  componentDidMount() {
    this.handleCustomer();
    this.handleVM();
    this.handleData();
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="กรุณาเลือกข้อมูลที่ต้องการ"
                category="ออกรายงานเพื่อดูความก้าวหน้า"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row>
                      <Col md={6}>
                        <Card
                          category="กรุณาเลือก Customer ที่ต้องการ"
                          ctTableFullWidth
                          ctTableResponsive
                          content={
                            <div>
                              <div
                                className="panel panel-info"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">Customers</div>
                                <div className="panel-body">
                                  <select
                                    id="dropdown"
                                    onChange={this.handleCustomer}
                                  >
                                    <option value="">Select Customer</option>
                                    {this.state.name
                                      ? this.state.name?.map((item, key) => {
                                          return (
                                            <option key={key} value={item}>
                                              {item}
                                            </option>
                                          );
                                        })
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </Col>
                      <Col md={6}>
                        <Card
                          category="กรุณาเลือก VM ที่ต้องการ"
                          ctTableFullWidth
                          ctTableResponsive
                          content={
                            <div>
                              <div
                                className="panel panel-info"
                                onSubmit={this.handleSubmit}
                              >
                                <div className="panel-heading">VM</div>
                                <div className="panel-body">
                                  <select
                                    id="dropdown"
                                    onChange={this.handleVM}
                                  >
                                    <option value="">Select VM</option>
                                    {this.state.vm
                                      ? this.state.vm?.map((item, key) => {
                                          return (
                                            <option key={key} value={item}>
                                              {item}
                                            </option>
                                          );
                                        })
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </Col>
                    </Row>

                    <Col md={1}>
                      <button onClick={(event) => this.handleData(event)}>
                        Preview
                      </button>
                    </Col>

                    <Col md={2}>
                      <PDFexport />
                    </Col>

                    {this.state.total.length > 0 &&
                      this.state.dateTimeData.length > 0 && (
                        <Chartlist
                          total={this.state.total}
                          dateTimeData={this.state.dateTimeData}
                          report={this.state.report}
                        />
                      )}
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
