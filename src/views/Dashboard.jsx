
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Badge, Form } from "react-bootstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLayout from "layouts/Admin.jsx";


import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      myChart:[],
      access_token: localStorage.getItem("access_token"),

    }
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

// chart = async () => {
//   await axios.get('http://203.151.34.28:5000/api/getAllDevices')
//   .then(res=>{
//     let sensors = res.data.result
//     // console.log(sensors)
    
//   })
// }

componentDidMount(){
  // console.log(this.chart);
  // this.chart()
  this.setState({myChart: this.chart });
  // console.log(this.state.myChart)

  if (this.state.access_token === null  ){
    return this.props.history.push("/login");
    }
}

  render() {
    return (
      <div className="content">
        <Grid fluid>

      {/* ส่วนของ Card แสดงผล */}

          <Row>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Capacity"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}

            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="Users"
                statsValue="0"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>


            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col> */}

            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-signal text-success" />}
                statsText="Sensors"
                statsValue="33"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>

            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="0"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>

            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-bell text-info" />}
                statsText="Notifications"
                statsValue="0"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>

            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}

          </Row>

      {/* ส่วนของกราฟแสดงผล */}
            {/* Dashboard */}
          <Row>
          <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="All Sensors"
                category="24 Hours performance"
                stats="Updated a few minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>

            {/* <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col> */}

            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Statistics"
                category="24 Hours performance"
                stats="Updated a few minutes ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          {/* <Row>
            <Col md={12}>
                <Card content={
                  <h3>กล่องใส่ content</h3>
                }
                />

            </Col>
          </Row> */}

                {/* การแสดงผลแบบกราฟแท่งและ Task */}
          {/* <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Thailand"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row> */}

        </Grid>
      </div>
    );
  }
}

export default Dashboard;
