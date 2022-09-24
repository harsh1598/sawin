import { any, array } from "prop-types";
import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

import logoPlaceholder from "../../../../../assets/images/logo-placeholder.png"
import iconCompany from "../../../../../assets/images/companysetup-menu-icon/company.svg";
import iconGeneralLedger from "../../../../../assets/images/companysetup-menu-icon/general-ledger.svg";
import iconReceivables from "../../../../../assets/images/companysetup-menu-icon/receivables.svg";
import iconPayroll from "../../../../../assets/images/companysetup-menu-icon/payroll.svg";
import iconInventory from "../../../../../assets/images/companysetup-menu-icon/inventory.svg";
import iconServiceDispatch from "../../../../../assets/images/companysetup-menu-icon/service-dispatch.svg";
import iconSalesMarketing from "../../../../../assets/images/companysetup-menu-icon/sales-marketing.svg";
import iconTax from "../../../../../assets/images/companysetup-menu-icon/tax.svg";
import iconEdit from "../../../../../assets/images/edit.svg";
import iconTraining from "../../../../../assets/images/companysetup-menu-icon/training.svg";
import { ArrowRight, Telephone, Phone, Envelope } from 'react-bootstrap-icons';
import UploadLogo from "../../../../../components/UploadLogo/UploadLogo"

import "./CompanyInfo.scss";

const CompanyInfo = () => {
  //Edit Modal
  const [showModal1, setShowModal1] = useState(false);
  const CloseModal1 = () => setShowModal1(false);
  const ShowModal1 = () => setShowModal1(true);
  //Integration Modal
  const [showModal2, setShowModal2] = useState(false);
  const CloseModal2 = () => setShowModal2(false);
  const ShowModal2 = () => setShowModal2(true);

  return (
    <>
      <div className="page-content-wraper">
        <Row>
          <Col lg="3">
            <Accordion defaultActiveKey="0" className="innermenu-accordion" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header><img src={iconCompany} className='menu-icon' alt={'icon'} width={'20'} height={"20"} />  Company</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Information</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Title of Courtesy</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Billing Codes</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Customer Source</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Business Type</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Solution Codes</a>
                  <Accordion defaultActiveKey="">
                    <Accordion.Item eventKey="0.0" className="child-accordion">
                      <Accordion.Header><ArrowRight size={17} className="icon" />Price Sheet</Accordion.Header>
                      <Accordion.Body>
                        <a href="" className="child-menu-item">Price Code</a>
                        <a href="" className="child-menu-item">Pricing</a>
                      </Accordion.Body>
                    </Accordion.Item>
                   
                  </Accordion>
                  
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />AP Payment Terms</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Payment Terms</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Tags</a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header><img src={iconGeneralLedger} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> General Ledger</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header><img src={iconReceivables} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> Receivables</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header><img src={iconPayroll} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> Payroll</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header><img src={iconInventory} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> Inventory</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header><img src={iconServiceDispatch} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> Service Dispatch</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header><img src={iconSalesMarketing} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> Sales & Marketing</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header><img src={iconTax} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> Tax</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header><img src={iconTraining} className='menu-icon' alt={'icon'} width={'20'} height={"20"} /> Training</Accordion.Header>
                <Accordion.Body>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                  <a href="" className="child-menu-item"><ArrowRight size={17} className="icon" />Child Menu Item</a>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col lg="9">
            <Card className="contetn-card p-0">
              <Card.Body className="border-bottom">
                <Row>
                  <Col md="4">
                    <label className="mb-2">Report Logo</label>
                    <UploadLogo />
                    <small className="font-12"><em> Note - Image will be streched if larger than 265 x 130</em></small>
                  </Col>
                  <Col md="4">
                    <label className="mb-2">Customer Portal Company Logo</label>
                    <UploadLogo />
                    <small className="font-12"><em> Note - Image will be streched if larger than 130 x 40</em></small>
                  </Col>
                  <Col md="4">
                    <label className="mb-2">Customer Portal Company Logo</label>
                    <UploadLogo />
                    <small className="font-12"><em> Note - Image will be streched if larger than 40 x 40</em></small>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body className="border-bottom">
                <h4 className="font-20">Basic Information <a href="javascript:void(0)" className="float-end link-icon" onClick={ShowModal1}><img src={iconEdit} alt={'Edit'} width={'18'} height={"18"} /></a></h4>
                <p>DH Plumbing & Heating</p>
                <p className="font-14">Raily Miller</p>
                <p className="font-14">
                  <span className="me-3"><Telephone size={15} className="align-text-top" /> 832-783-0997</span>
                  <span className="me-3"><Phone size={15} className="align-text-top" /> 832-783-0997</span>
                </p>
                <p className="font-14">
                  <span className="me-3"><Envelope size={15} className="align-text-top" /> rilleymiller82892@gmail.com</span>

                </p>
              </Card.Body>
              <Card.Body className="border-bottom">
                <h4 className="font-20">Address</h4>
                <Row>
                  <Col lg="3" md="6" className="border-end">
                    <p>Physical</p>
                    <p className="font-14">7899 Lamppost Court, Olympia, Pune Mumbai Houston, Texas 77065 US</p>
                  </Col >
                  <Col lg="3" md="6" className="border-end">
                    <p>Billing</p>
                    <p className="font-14">7899 Lamppost Court, Olympia, Pune Mumbai Houston, Texas 77065 US</p>
                  </Col >
                  <Col lg="3" md="6" className="border-end">
                    <p>Legal</p>
                    <p className="font-14">7899 Lamppost Court, Olympia, Pune Mumbai Houston, Texas 77065 US</p>
                  </Col >
                  <Col lg="3" md="6">
                    <p>Invoice</p>
                    <p className="font-14">7899 Lamppost Court, Olympia, Pune Mumbai Houston, Texas 77065 US</p>
                  </Col >
                </Row>
              </Card.Body>
              <Card.Body className="text-end">
                <Button variant="primary" className="btn-brand-light ms-auto mb-md-5" onClick={ShowModal2}>Integration</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Edit */}
      <Offcanvas show={showModal1} onHide={CloseModal1} placement={'end'} className="offcanvas-large" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Basic Information</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="border-bottom px-0">
          <Form className="form-style">
            <div className="px-4 border-bottom pb-3 mb-3">
              <Row>
                <Col md="12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Comapny Name" />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Primary Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="Primary Contact Number" />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Company" />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" placeholder="https://www.websitename.com" />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Time Zone</Form.Label>
                    <Form.Select className="form-control">
                      <option>Select time zone</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md="12" className="d-md-flex justify-content-end">
                  <Form.Group className=" me-md-3">
                    <Form.Check
                      type="checkbox"
                      id="BillingAddress"
                      label="Default To Billing Address"
                    />
                  </Form.Group>
                  <Form.Group className=" ">
                    <Form.Check
                      type="checkbox"
                      id="LegalAddress"
                      label="Default To Legal Address"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className="px-4 border-bottom pb-3 mb-3">
              <h4 className="font-20">Address</h4>

              <Row>
                <Col md="12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <div className="d-lg-flex">
                      <Form.Control type="text" placeholder="Address line 1" className="me-3" />
                      <Form.Control type="text" placeholder="Address line 2" />
                    </div>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Country</Form.Label>
                    <Form.Select className="form-control">
                      <option>Select Country</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Enter Zip code" />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Select className="form-control">
                      <option>Select State</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Select className="form-control">
                      <option>Select City</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="px-4 border-bottom pb-3 mb-3">
              <h4 className="font-20">Billing Address</h4>
            </div>

            <div className="px-4 border-bottom pb-3 mb-3">
              <h4 className="font-20">Lega Address</h4>
            </div>

            <div className="px-4 pb-4 mb-5">
              <h4 className="font-20">Setting</h4>
              <Row>
                <Col md="6">
                  <Form.Label>Address on Invoice</Form.Label>
                </Col>
                <Col md="6" className="d-flex justify-content-end">
                  <Form.Group className="mb-3" controlId="">
                    <Form.Check
                      type="checkbox"
                      id="DefaultBillAdd"
                      label="Default To Billing Address"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className="offcanvas-footer mt-4">
              <Button variant="primary" className="btn-brand-solid me-3" type="submit">Submit</Button>
              <Button variant="primary" className="btn-brand-outline" type="button" onClick={CloseModal1}>Cancel</Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Integration Modal  */}
      <Offcanvas show={showModal2} onHide={CloseModal2} placement={'end'} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Integration</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-0">
          <Form className="form-style">
            <div className="px-4 border-bottom pb-3 mb-3">
              <Row>
                <Col md="12">
                  <Form.Label className="mb-2">Account Package</Form.Label>
                  <Card className="text-center">
                    <Card.Body>
                      <img src={logoPlaceholder} className='object-contain mb-3' alt={'Logo'} width={'250'} height={"60"} />
                      <Form.Group className=" d-flex justify-content-center">
                        <Form.Check
                          type="checkbox"
                          id="AccoutnPackage"
                          label=" "
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className="px-4 border-bottom pb-3 mb-3">
              <Row>
                <Col md="12">
                  <Form.Label className="mb-2">Tele-Communication Gateway</Form.Label>
                  <Card className="text-center">
                    <Card.Body>
                      <img src={logoPlaceholder} className='object-contain mb-3' alt={'Logo'} width={'250'} height={"60"} />
                      <Form.Group className=" d-flex justify-content-center">
                        <Form.Check
                          type="checkbox"
                          id="CommunicationGateway"
                          label=" "
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className="px-4 border-bottom pb-3 mb-3">
              <Row>
                <Col md="12">
                  <Form.Label className="mb-2">Mail Server</Form.Label>
                  <Card className="text-center">
                    <Card.Body>
                      <img src={logoPlaceholder} className='object-contain mb-3' alt={'Logo'} width={'250'} height={"60"} />
                      <Form.Group className=" d-flex justify-content-center">
                        <Form.Check
                          type="checkbox"
                          id="MailServer"
                          label=" "
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className="px-4 border-bottom pb-3 mb-3">
              <Row>
                <Col md="12">
                  <Form.Label className="mb-2">Customer Portal Enabled <span className="ms-3">Yes</span> </Form.Label>
                </Col>
              </Row>
            </div>
            <div className="offcanvas-footer mt-4">
              <Button variant="primary" className="btn-brand-solid me-3" type="submit">Submit</Button>
              <Button variant="primary" className="btn-brand-outline" type="button" onClick={CloseModal2}>Cancel</Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

export default CompanyInfo;
