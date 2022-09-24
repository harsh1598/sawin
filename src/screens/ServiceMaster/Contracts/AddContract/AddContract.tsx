import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import ImgBackArrow from "../../../../assets/images/left-arrow-black.svg"
//import WebService from "../../../utility/WebService";
//import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "../../../config/Store";
import "./AddContracts.scss";
import { Calendar2Week } from 'react-bootstrap-icons';

import SawinSelect, { Options } from "../../../../components/Select/SawinSelect";
import SawinDatePicker from "../../../../components/SawinDatePicker/SawinDatePicker"
import DraggableModal from "../../../../components/DraggableModal/DraggableModal";

const AddContract = () => {
  const {
    formState: { errors },
    control,
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());

  const contactType: Options[] = [
    { id: 1, value: "Home" },
    { id: 2, value: "Personal Mobile" },
    { id: 3, value: "Office Mobile" },
    { id: 4, value: "Work" },
  ];
  const location: Options[] = [
    { id: 1, value: "Default" },
    { id: 2, value: "Home" },
    { id: 3, value: "Office" },
    { id: 4, value: "Work" },
  ];
  const classOptions: Options[] = [
    { id: 1, value: "Default" },
    { id: 2, value: "1" },
  ];
  const salesmanOptions: Options[] = [
    { id: 1, value: "Default" },
    { id: 2, value: "1" },
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
          <Breadcrumb.Item active>General Details</Breadcrumb.Item>
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
                <div className="step-2">
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
              <h4 className="font-18 mb-0">General Details</h4>
            </Card.Header>
            <Card.Body>
              <Form className="form-style">
                <Row>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Contract </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Operator Code </Form.Label>
                      <InputGroup>
                        <Form.Control type="password" />
                        <InputGroup.Text className="font-14">Base User</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>of Systems </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Start Date </Form.Label>
                      <Controller
                        control={control}
                        name="startDate"
                        render={({ field }) => (
                          <SawinDatePicker
                            onChange={(data: any) => field.onChange(data)}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Expiration Date</Form.Label>
                      <Controller
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                          <SawinDatePicker
                            onChange={(data: any) => field.onChange(data)}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Contract Type</Form.Label>
                      <SawinSelect
                        options={contactType}
                        type={"ARROW"}
                        onChange={console.log("fd")}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Amount </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Location </Form.Label>
                      <SawinSelect
                        options={location}
                        type={"ARROW"}
                        sakey="booknewservice"
                        onChange={console.log("fd")}
                        isSearchable={false}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Class </Form.Label>
                      <SawinSelect
                        options={classOptions}
                        type={"ARROW"}
                        sakey="booknewservice"
                        onChange={console.log("fd")}
                        isSearchable={false}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Customer PO</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Label>Salesman </Form.Label>
                      <SawinSelect
                        options={salesmanOptions}
                        type={"ARROW"}
                        sakey="booknewservice"
                        onChange={console.log("fd")}
                        isSearchable={false}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">

                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Check
                        type="switch"
                        id="ContractBilling"
                        label="Contract Billing"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Check
                        type="switch"
                        id="ReserveAccounting"
                        label="Reserve Accounting"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md="6">
                    <Form.Group className="mb-3" >
                      <Form.Check
                        type="switch"
                        id="IsApproved"
                        label="Is Approved"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12}>
                    <Form.Group className="mb-3" >
                      <Form.Label className="w-100 d-flex justify-content-between align-items-center">Contract Description
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
                   <Col lg={12} className='text-center'>
                   <Button variant="primary" className="btn-brand-solid me-3" type="submit">Save & Next</Button>
                   <Button variant="primary" className="btn-brand-outline" type="button">Cancel</Button>
                   </Col>       
                </Row>
              
     

              </Form>
            </Card.Body>
          </Card>
          <Card className="border-0">
            <Card.Header className="mb-3 border-0">
              <h4 className="font-18 mb-0">Equipment</h4>
            </Card.Header>
            <h3 className="text-secondary text-center">Table Here</h3>
          </Card>
        </div>

      </div>
      
    </>
  );
};

export default AddContract;
