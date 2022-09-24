import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ImgBackArrow from "../../../../assets/images/left-arrow-black.svg"
//import WebService from "../../../utility/WebService";
//import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "../../../config/Store";
import "./AddContracts.scss";
import { Calendar2Week } from 'react-bootstrap-icons';

import SawinSelect, { Options } from "../../../../components/Select/SawinSelect";
import SawinDatePicker from "../../../../components/SawinDatePicker/SawinDatePicker"
import DraggableModal from "../../../../components/DraggableModal/DraggableModal";
import { Fade } from "react-bootstrap";

const AddContractMaintenanceSchedule = () => {
  const {
    formState: { errors },
    control,
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());

  const callEvery: Options[] = [
    { id: 1, value: "Month(s)" },
    { id: 2, value: "Day(s)" },
  ];
  const taskCode: Options[] = [
    { id: 1, value: "Full Planned Maintenance.Restaurant Cooking" },
    { id: 2, value: "Full Planned Maintenance.Restaurant Refrigeration" },
    { id: 3, value: "Full Planned Maintenance.Training" },
  ];

  //Modal
  const [showStatndardDescriptionModel, setShowStatndardDescriptionModel] = useState(false);
  const closeModal = (value: any) => {
    setShowStatndardDescriptionModel(value);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <DraggableModal
        isOpen={showStatndardDescriptionModel}
        onClose={closeModal}
        title="Standard Descriptions"
        type="STANDARD_DESCRIPTION"
        previousData={null}
      />
      <div className="page-content-wraper">
        <Breadcrumb>
          <Breadcrumb.Item href="#">UpWork</Breadcrumb.Item>
          <Breadcrumb.Item href=" ">
            Service Contract
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Maintenance Schedule</Breadcrumb.Item>
        </Breadcrumb>
        <div className="contetn-card card">
          <Row>
            <Col md={'6'}>
              <div className="d-flex align-items-center">
                <Button variant="link" className="ps-0" onClick={goBack}><img src={ImgBackArrow} className='menu-icon' alt={'Back icon'} width={'20'} height={"20"} /></Button>
                <h2 className="page-title">Add Contact </h2>
              </div>
            </Col>
            <Col md={'6'}>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="step-wizard ">
                <div className="active step-1">
                  <div className="step-count">1</div>
                  <div className="step-name">General Details</div>
                </div>

                <div className="line"></div>
                <div className="step-2 active">
                  <div className="step-count">2</div>
                  <div className="step-name">Maintenance Schedule</div>
                </div>
                <div className="line"></div>
                <div className="step-3">
                  <div className="step-count">3</div>
                  <div className="step-name">Billing</div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="border-top pt-3 my-3 ">
            <Col className="text-end">
              <Button variant="light" className="btn-brand-light">New Apple</Button>
            </Col>
          </Row>
          <Card className="mb-4">
            <Card.Header>
              <h4 className="font-18 mb-0">Maintenance Schedule</h4>
            </Card.Header>
            <Card.Body>
              <Form className="form-style">
                <Tabs
                  defaultActiveKey="create"
                  transition={Fade}
                  id="jnoanim-tab-example"
                  className="mb-3 tab-style-1"
                >
                  <Tab eventKey="create" title="Create">
                    <Row>
                      <Card className="border-0">
                        <Card.Header className="mb-3 border-0 d-flex justify-content-between bg-brand-ligh">
                          <h4 className="font-16 mb-0 text-secondary">Contract # <a href="">normal</a> </h4>
                          <h4 className="font-16 mb-0 text-secondary">Start Date <span className="text-dark">09/22/22</span> </h4>
                          <h4 className="font-16 mb-0 text-secondary">Expiration Date <span className="text-dark">09/22/22</span> </h4>
                        </Card.Header>
                      </Card>
                      <Col lg={4} md="6">
                        <Form.Group className="mb-3" >
                          <Form.Label>Task Code </Form.Label>
                          <SawinSelect
                            options={taskCode}
                            type={"ARROW"}
                            onChange={console.log("fd")}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4} md="6">
                        <Form.Group className="mb-3" >
                          <Form.Label>Maintenance Call Every </Form.Label>
                          <div className="d-flex">
                            <Form.Control type="text" className="w-50 me-3" />
                            <SawinSelect
                              options={callEvery}
                              type={"ARROW"}
                              onChange={console.log("fd")}
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col lg={4} md="6">
                        <Form.Group className="mb-3" >
                          <Form.Label>No. Of Maintenance Call </Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>

                      <Col lg={4} md="6">
                        <Form.Group className="mb-3" >
                          <Form.Label>Starting Detail Line</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                      <Col lg={4} md="6">
                        <Form.Group className="mb-3" >
                          <Form.Label>First Maintenance Date</Form.Label>
                          <Controller
                            control={control}
                            name="firstMaintdDate"
                            render={({ field }) => (
                              <SawinDatePicker
                                onChange={(data: any) => field.onChange(data)}
                              />
                            )}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group className="mb-3" >
                          <Form.Label className="w-100 d-flex justify-content-between align-items-center">Description
                            <Button variant="light" className="btn-brand-light float-end mb-2"
                              onClick={() =>
                                setShowStatndardDescriptionModel(
                                  !showStatndardDescriptionModel
                                )
                              }>Standard Descriptions</Button>
                          </Form.Label>
                          <Form.Control as="textarea" rows={4} className="h-auto" />
                        </Form.Group>
                      </Col>
                      <Col lg={12} className="mt-3">
                        <Card className="border-0">
                          <Card.Header className="mb-3 border-0 bg-brand-ligh">
                            <h4 className="font-18 mb-0">Equipment</h4>
                          </Card.Header>
                          <h3 className="text-secondary text-center">Table Here</h3>
                        </Card>
                      </Col>
                      <Col lg={12} className="mt-3 mb-4">
                        <Card className="border-0">
                          <Card.Header className="mb-3 border-0 bg-brand-ligh">
                            <h4 className="font-18 mb-0">Parts Used In Maintenance Schedule</h4>
                          </Card.Header>
                          <h3 className="text-secondary text-center">Table Here</h3>
                        </Card>
                      </Col>
                      <Col lg={12} className='text-center'>
                        <Button variant="primary" className="btn-brand-solid me-3" type="submit">Save & Next</Button>
                        <Button variant="primary" className="btn-brand-outline" type="button">Cancel</Button>
                      </Col>
                    </Row>
                  </Tab>
                  {/* Tab 2  Scheduled listing */}
                  <Tab eventKey="Schedulelisting" title="Schedule listing">
                    
                      <h3 className="text-secondary text-center mb-4">Table here</h3>
                      <Card className="border-0 mb-4">
                        <Card.Header className="mb-3 border-0 bg-brand-ligh">
                          <h4 className="font-18 mb-0">Description</h4>
                        </Card.Header>
                        <Form.Group className="mb-3" >
                          <Form.Label className="w-100 d-flex justify-content-between align-items-center">Description
                          </Form.Label>
                          <Form.Control as="textarea" rows={4} className="h-auto" />
                        </Form.Group>
                      </Card>
                      <Card className="border-0 mb-4">
                        <Card.Header className="mb-3 border-0 bg-brand-ligh">
                          <h4 className="font-18 mb-0">Equipment</h4>
                        </Card.Header>
                        <h3 className="text-secondary text-center mb-4">Table here</h3>
                      </Card>
                      <Card className="border-0 mb-4">
                        <Card.Header className="mb-3 border-0 bg-brand-ligh">
                          <h4 className="font-18 mb-0">Parts Used In Maintenance Schedule</h4>
                        </Card.Header>
                        <h3 className="text-secondary text-center mb-4">--</h3>
                      </Card>
                       <div className="text-center">
                          <Button variant="primary" className="btn-brand-solid me-3" type="submit">Save & Next</Button>
                          <Button variant="primary" className="btn-brand-outline" type="button">Cancel</Button>
                      </div> 
                   
                  </Tab>
                </Tabs>
              </Form>
            </Card.Body>
          </Card>

        </div>

      </div>

    </>
  );
};

export default AddContractMaintenanceSchedule;
