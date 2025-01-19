import React from "react";
// Node.js library that concatenates classes
import classNames from "classnames";
// React plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// Reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// Core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "/home/safouat/Downloads/MedicalAI_FrontEnd-master/src/css/chart.js";

function Dashboard(props) {
  const [bigChartData, setBigChartData] = React.useState("data1");

  const handleBgChartDataChange = (name) => {
    setBigChartData(name);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Sales by Months</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      {["data1", "data2", "data3"].map((data, index) => (
                        <Button
                          key={index}
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === data,
                          })}
                          color="info"
                          size="sm"
                          onClick={() => handleBgChartDataChange(data)}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            {data === "data1"
                              ? "Accounts"
                              : data === "data2"
                              ? "Purchases"
                              : "Sessions"}
                          </span>
                          <span className="d-block d-sm-none">
                            <i
                              className={
                                data === "data1"
                                  ? "tim-icons icon-single-02"
                                  : data === "data2"
                                  ? "tim-icons icon-gift-2"
                                  : "tim-icons icon-tap-02"
                              }
                            />
                          </span>
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {[
            {
              category: "Total Shipments",
              title: "763,215",
              icon: "tim-icons icon-bell-55 text-info",
              chart: chartExample2,
            },
            {
              category: "Daily Sales",
              title: "3,500€",
              icon: "tim-icons icon-delivery-fast text-primary",
              chart: chartExample3,
            },
            {
              category: "Completed Tasks",
              title: "12,100K",
              icon: "tim-icons icon-send text-success",
              chart: chartExample4,
            },
          ].map((item, index) => (
            <Col lg="4" key={index}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">{item.category}</h5>
                  <CardTitle tag="h3">
                    <i className={item.icon} /> {item.title}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line data={item.chart.data} options={item.chart.options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Tasks (5)</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    {["Action", "Another action", "Something else"].map(
                      (item, index) => (
                        <DropdownItem
                          key={index}
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {item}
                        </DropdownItem>
                      )
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      {[
                        {
                          title: "Update the Documentation",
                          description: "Dwuamish Head, Seattle, WA 8:47 AM",
                        },
                        {
                          title: "GDPR Compliance",
                          description:
                            "The GDPR is a regulation that requires businesses to protect the personal data and privacy of Europe citizens for transactions within EU member states.",
                        },
                        {
                          title: "Solve the Issues",
                          description:
                            "Fifty percent of all respondents said they would be more likely to shop at a company.",
                        },
                      ].map((task, index) => (
                        <tr key={index}>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">{task.title}</p>
                            <p className="text-muted">{task.description}</p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              title="Edit Task"
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
