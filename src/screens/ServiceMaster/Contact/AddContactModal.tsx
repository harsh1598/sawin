import ToggleButton from "../../../components/ToggleButton/ToggleButton";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Label } from "../../../components/Label/Label";
import SawinDatePicker from "../../../components/SawinDatePicker/SawinDatePicker";
import SawinSelect from "../../../components/Select/SawinSelect";
import TextEditor from "../../../components/TextEditor/TextEditor";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";



interface PropData {
  isShow: boolean;
  title: any;
  isClose: any;
}

const AddContactModal = (props: PropData) => {
  const [isDefault,setIsDefault] = useState(false)
  const [isInvoiceMail,setIsInvoiceMail] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }, control
  } = useForm();


  const onCloseModal = () => {
    props.isClose(!props.isShow);
  };

  const onSubmit = (requestBody: any) => {
    
    props.isClose(!props.isShow, "ON_SAVE");
    console.log(isDefault);
    console.log(isInvoiceMail);
    
    
    requestBody.IsDefaultForEntityId = isDefault;
    requestBody.IncludeInInvoiceEmail = isInvoiceMail;
    console.log(requestBody);
    // requestBody.AccountId = customerInfo.AccountId;
    // requestBody.AccountId = customerInfo.AccountId;
    // requestBody.AccountId = customerInfo.AccountId;
    // requestBody.CompanyId = customerInfo.CompanyId;
    // requestBody.SDServiceMasterId = customerInfo.Id;
    // WebService.postAPI({
    //   action: `EntityContact`,
    //   body: requestBody,
    // })
    //   .then((res: any) => {
    //     toast.success("Message Sent successfully.")
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const onDefault  = (e:any) => {
    console.log(e);
    
      setIsDefault(e)
  } 
  const onInvoiceMail = (e:any) => {
     console.log(e);
    setIsInvoiceMail(e)
  }

  return (

    <Offcanvas show={props.isShow} onHide={onCloseModal} placement={'end'} className="offcanvas-large" >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Contact</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="border-bottom px-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row px-4">
            <div className="col-6">
              <Label title="Contact Name" />
              <input className="form-control input" type="text" placeholder="Contact Name"
               {...register(`ContactName`, { required: true })}
              ></input>
                {errors.ContactName && (
                <Label title={"Please enter contact name"} modeError={true} />
              )}
            </div>
            <div className="col-6">
              <Label title="Email" />
              <input className="form-control input" type="text" placeholder="Email"
               {...register(`Email`, { pattern: /^\S+@\S+$/i, required: true })}
              ></input>
                {errors.Email && (
                <Label title={"Please enter email"} modeError={true} />
              )}
            </div>
            <div className="col-6">
              <Label title="Primary Number" />
              <input className="form-control input" type="text" placeholder="Primary Number"
               {...register(`WorkPhone`, { required: true })}
              ></input>
                {errors.WorkPhone && (
                <Label title={"Please enter work number"} modeError={true} />
              )}
            </div>
            <div className="col-6">
              <Label title="Secondary Number" />
              <input className="form-control input" type="text" placeholder="Secondary Number" {...register(`HomePhone`, { required: true })}
              ></input>
                {errors.HomePhone && (
                <Label title={"Please enter home phone"} modeError={true} />
              )}
            </div>
          </div>


          <div className="row px-3 mx-2">
            <Label title="Comment"></Label>
               <textarea
                  className="form-control form-control-textarea"
                  {...register(`Comment`, { required: true })}
                  placeholder="Comment"  rows={10} />
                {errors.Comment && (
                <Label title={"Please enter extension"} modeError={true} />
              )}
          </div>

          <div className=" row ml-4 mt-4 ">
            <div className="col-4">
              <ToggleButton title="Is Default" label_id="default" onChange={(data: any) => onDefault(data)} />
            </div>
            <div className="col-4">
              <ToggleButton title="Include In Invoice Email"
                label_id="invoiceEmail" onChange={(data: any) => onInvoiceMail(data)} />
              
            </div>
          </div>


          <div className="offcanvas-footer mt-4">
            <Button variant="primary" className="btn-brand-solid me-3" type="submit">Submit</Button>
            <Button variant="primary" className="btn-brand-outline" type="button" onClick={onCloseModal}>Cancel</Button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>

    // <Modal show={props.isShow} className="modal right fade" size="xl">
    //   <Modal.Header>
    //     <Modal.Title>
    //       <div className="col-12 row d-flex justify-content-between">
    //         <div className="col-6">{props.title}</div>
    //         <div className="col-6 text-end">
    //           <img
    //             className="image"
    //             src={require("../../../assets/images/cross-black.svg").default}
    //             onClick={() => onCloseModal()}
    //           />
    //         </div>
    //       </div>
    //     </Modal.Title>
    //   </Modal.Header>

    //   <Modal.Body>
    //     <div className="add-contact">
    //       <div className="add-contact-heading-view ">
    //         <div className=" col-12 row">
    //           <Label title="Contact" type="BOLD" />
    //           <div className="col-3">
    //             <Label title="Contact Name" showStar={true} />
    //             <input className="form-control input" type="text" placeholder="Contact Name"></input>
    //           </div>
    //           <div className="col-3">
    //             <Label title="Email" />
    //             <input className="form-control input" type="text" placeholder="Email"></input>
    //           </div>
    //           <div className="col-3">
    //             <Label title="Work#" />
    //             <input className="form-control input" type="text" placeholder="Work#"></input>
    //           </div>
    //           <div className="col-3">
    //             <Label title="Extension" />
    //             <input className="form-control input" type="text" placeholder="Extension#"></input>
    //           </div>
    //         </div>

    //         <div className=" col-12 row">
    //           {/* <Label title="Contact" type="BOLD" /> */}
    //           <div className="col-3">
    //             <Label title="Fax" />
    //             <input className="form-control input" type="text" placeholder="Fax"></input>
    //           </div>
    //           <div className="col-3">
    //             <Label title="Personal Mobile" />
    //             <input className="form-control input" type="text" placeholder="Personal Mobile"></input>
    //           </div>
    //           <div className="col-3">
    //             <Label title="Office Mobile" />
    //             <input className="form-control input" type="text" placeholder="Office Mobile"></input>
    //           </div>
    //           <div className="col-3">
    //             <Label title="Home#" />
    //             <input className="form-control input" type="text" placeholder="Home#"></input>
    //           </div>
    //         </div>

    //         <div className="col-12  ">
    //           <Label title="Comment"></Label>
    //           <input
    //             className="form-control input h-100 w-100 mr-3"
    //             type="text"
    //             placeholder="Comment"
    //           />
    //         </div>

    //         <div className="col-12 row ml-4 mt-4 ">
    //         <div className="col-3">
    //           <ToggleButton title="Is Default" label_id="default" />
    //         </div>
    //         <div className="col-4">
    //           <ToggleButton title="Include In Invoice Email"
    //              label_id="invoiceEmail" />
    //         </div>
    //       </div>

    //       </div>
    //     </div>




    //   </Modal.Body>
    //   <hr />
    //   <Modal.Header>
    //     <Modal.Title>
    //       <div className="col-12 mt-5 d-flex justify-content-end row ">
    //         <div className="col-2">
    //           <Button
    //             size="large"
    //             label="Save"
    //             // onClick={handleSubmit(onSubmit)}
    //             b_type="SAVE"
    //           />
    //         </div>
    //         <div className="col-2">
    //           <Button
    //             size="small"
    //             label="Cancel"
    //             // onClick={handleSubmit(onSubmit)}
    //             b_type="CANCEL"
    //           />
    //         </div>
    //       </div>
    //     </Modal.Title>
    //   </Modal.Header>

    // </Modal >
  );
};
export default AddContactModal;