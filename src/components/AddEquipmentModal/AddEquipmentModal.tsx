import { useState } from "react";
import "./AddEquipmentModal.scss";
import { GridHeader, GridRow } from "../Grid/Grid";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Label } from "../../components/Label/Label";
import SawinDatePicker from "../../components/SawinDatePicker/SawinDatePicker";
import SawinSelect from "../../components/Select/SawinSelect";
import TextEditor from "../../components/TextEditor/TextEditor";

interface PropData {
  isShow: boolean;
  title: any;
  isClose: any;
  popupData: any;
  isEquipId? : any;
}

const headers: GridHeader[] = [
  {
    title: "Contract.No",
    isSorting: false,
  },
  {
    title: "Select",
    isSorting: false,
  },
  {
    title: "Manufacturer",
    isSorting: false,
  },
  {
    title: "Model",
    isSorting: false,
  },
  {
    title: "Description",
    isSorting: false,
  },
  {
    title: "Serial #",
    isSorting: false,
  },
  {
    title: "System",
    isSorting: false,
  },
  {
    title: "Location",
    isSorting: false,
  },
];

const rows: GridRow[] = [];
const AddEquipmentModal = (props: PropData) => {
  const [previousData, setpreviousData] = useState("");
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [LocalDocPath, setLocalDocPath] = useState("");
  
  const onCloseModal = () => {
    props.isClose(!props.isShow);
  };

  const onSubmit = (requestBody: any) => {
    props.popupData(requestBody);
    props.isClose(!props.isShow, "ON_SAVE");
  };
  const currentValue = (value: any) => {
    setpreviousData(value);
  };
  let formData = new FormData()
  const uploadDocument = (e:any) => {
     console.log(e);
     setLocalDocPath(e.target.value)
     formData.append('userpic', e.target.files[0])
  }
  return (
    <Offcanvas
      show={props.isShow}
      onHide={onCloseModal}
      placement={"end"}
      className="offcanvas-large"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Equipment</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="border-bottom px-0 new-box-main-view">
        <label htmlFor="upload-doc">
        <div className="ms-4 new-box-view d-flex justify-content-center align-items-center">
          <div className="col-12 upload-icon">
            {LocalDocPath ? <img src={LocalDocPath} /> :( <> <img src={require("../../assets/images/upload-icon.svg").default} />
            Upload Document  (.pdf/.jpg/.jpeg)</>)}
          </div>
        </div>
        </label>
        <input type="file" value={LocalDocPath} className="upload-file-input" id="upload-doc" onChange={(e) => uploadDocument(e)}
         />

        <div className="row px-4">
          <div className="col-4">
            <Label title="Manufacturer" showStar={true} />
            {/* <Controller
                control={control}
                name="PriceCodeLab"
                render={({ field }) => ( */}
            <SawinSelect
              // options={[]}
              disValue="BreakName"
              value="BreakCode"
              // onChange={(data: any) => field.onChange(data.id)}
              onChange={(data: any) => console.log(data)}
            />
            {/* )}
              /> */}
          </div>
          <div className="col-4">
            <Label title="Model" showStar={true} />
            {/* <Controller
                control={control}
                name="PriceCodeMat"
                render={({ field }) => ( */}
            <SawinSelect
              // options={PS}
              disValue="BreakName"
              value="BreakCode"
              // onChange={(data: any) => field.onChange(data.id)}
              onChange={(data: any) => console.log(data)}
            />
            {/* )}
              /> */}
          </div>
          <div className="col-4">
            <Label title="Equipment type" />
            {/* <Controller
                control={control}
                name="PriceCodeOther"
                render={({ field }) => ( */}
            <SawinSelect
              // options={PS}
              disValue="BreakName"
              value="BreakCode"
              // onChange={(data: any) => field.onChange(data.id)}
              onChange={(data: any) => console.log(data)}
            />
            {/* )}
              /> */}
          </div>
        </div>
        <div className="row px-4">
          <div className="col-4 mt-1">
            <Label title="Serial #" />
            <input
              className="form-control input"
              type="text"
              placeholder="Serial #"
            ></input>
          </div>
          <div className="col-4 mt-1">
            <Label title="Location" />
            <input
              className="form-control input"
              type="text"
              placeholder="Location"
            ></input>
          </div>
          <div className="col-4">
            <Label title="System" />
            <input
              className="form-control input"
              type="text"
              placeholder="System"
            ></input>
          </div>
        </div>

        <div className="row px-4 chkboxdiv">
          <div className="col-4 mt-1">
            <Label title="Unit" />
            <input
              className="form-control input"
              type="text"
              placeholder="Unit"
            ></input>
          </div>
          <div className={ props.isEquipId ? "col-4 appointment-view" : "col-4 appointment-view add-new-equipment" }>
            <Label title="Invalid Equipment" />
            <br/>
            <input type="checkbox" className="sawin-checkbox addequpment-chkbox" />
          </div>
          <div className={ props.isEquipId ? "col-4 appointment-view" : "col-4 appointment-view add-new-equipment" }>
            <Label title="Our Installation" />
            <br/>
            <input type="checkbox" className="sawin-checkbox addequpment-chkbox" />
          </div>
        </div>
        <div className="row px-4 mt-4  mb-2">
          <div className="col-12">
          <Label title="Description" />
          <textarea
                  className="form-control form-control-textarea"
                  placeholder="Description" rows={6} />
                  </div>
        </div>
        <div className={ props.isEquipId ? "row px-4" : "row px-4 add-new-equipment" } >
          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Installation Date" />
                {/* <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => ( */}
                <SawinDatePicker
                  // onChange={(data: any) => field.onChange(data)}
                  onChange={(data: any) => console.log(data)}
                />
                {/* //   )}
                  // /> */}

                {/* {errors.start_date && (
                    <Label
                      title={"Please select start date."}
                      modeError={true}
                    />
                  )} */}
              </div>
            </div>
          </div>

          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Replaced Date" />
                {/* <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => ( */}
                <SawinDatePicker
                  // onChange={(data: any) => field.onChange(data)}
                  onChange={(data: any) => console.log(data)}
                />
                {/* )}
                  /> */}

                {/* {errors.start_date && (
                    <Label
                      title={"Please select start date."}
                      modeError={true}
                    />
                  )} */}
              </div>
            </div>
          </div>

          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Last Repair Date" />
                {/* <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => ( */}
                <SawinDatePicker
                  // onChange={(data: any) => field.onChange(data)}
                  onChange={(data: any) => console.log(data)}
                />
                {/* )}
                  /> */}

                {/* {errors.start_date && (
                    <Label
                      title={"Please select start date."}
                      modeError={true}
                    />
                  )} */}
              </div>
            </div>
          </div>
        </div>

        <div className={ props.isEquipId ? "row px-4" : "row px-4 add-new-equipment" }>
          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Man. Warranty Date" />
                {/* <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => ( */}
                <SawinDatePicker
                  // onChange={(data: any) => field.onChange(data)}
                  onChange={(data: any) => console.log(data)}
                />
                {/* )}
                  /> */}

                {/* {errors.start_date && (
                    <Label
                      title={"Please select start date."}
                      modeError={true}
                    />
                  )} */}
              </div>
            </div>
          </div>

          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Extend Warranty Date" />
                {/* <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => ( */}
                <SawinDatePicker
                  // onChange={(data: any) => field.onChange(data)}
                  onChange={(data: any) => console.log(data)}
                />
                {/* )}
                  /> */}

                {/* {errors.start_date && (
                    <Label
                      title={"Please select start date."}
                      modeError={true}
                  //   />
                  // )} */}
              </div>
            </div>
          </div>

          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Part Warranty Date" />
                {/* <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => ( */}
                <SawinDatePicker
                  // onChange={(data: any) => field.onChange(data)}
                  onChange={(data: any) => console.log(data)}
                />
                {/* )}
                  /> */}

                {/* {errors.start_date && (
                    <Label
                      title={"Please select start date."}
                      modeError={true}
                    />
                  )} */}
              </div>
            </div>
          </div>
        </div>
        <div className={ props.isEquipId ? "row px-4" : "row px-4 add-new-equipment" }>
          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Labor Warranty Date" />
                {/* <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => ( */}
                <SawinDatePicker
                  // onChange={(data: any) => field.onChange(data)}
                  onChange={(data: any) => console.log(data)}
                />
                {/* )}
                /> */}

                {/* {errors.start_date && (
                  <Label
                    title={"Please select start date."}
                    modeError={true}
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>




        <div className="row px-4 text-editor-margin">
          <Label title="Equipment Notes" type="BOLD" />
          <TextEditor data={null} editedData={currentValue} />
        </div>
        <div className="offcanvas-footer mt-4">
          <Button
            variant="primary"
            className="btn-brand-outline"
            type="button"
            onClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn-brand-solid ms-3"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddEquipmentModal;
