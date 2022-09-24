import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
// import { Button } from "../../../components/Button/Button";
import { Label } from "../../../components/Label/Label";
import SawinDatePicker from "../../../components/SawinDatePicker/SawinDatePicker";
import SawinSelect from "../../../components/Select/SawinSelect";
import TextEditor from "../../../components/TextEditor/TextEditor";

interface PropData {
  isShow: boolean;
  title: any;
  isClose: any;
}

const AddRecommendationModal = (props: PropData) => {
  const [previousData, setpreviousData] = useState('');

  const onCloseModal = () => {
    props.isClose(!props.isShow);
  };

  const currentValue = (value: any) => {
    setpreviousData(value)
  }

  return (
    <Offcanvas show={props.isShow} onHide={onCloseModal} placement={'end'} className="offcanvas-large" >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Recommendation</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="border-bottom px-0">

        <div className="row px-4">
          <div className="col-4 ">
            <div className="col-12 w-100" style={{ marginTop: -7 }}>
              <div className="col-12 search-form rounded-pill p-1 mr-3">
                <Label title="Recommended Date" />
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
          <div className="col-4">
            <Label title="Recommended By " showStar={true} />
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
            <Label title="Status" showStar={true} />
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
          <div className="col-12">
            <Label title="Comment" showStar={true} />
            <TextEditor data={null} editedData={currentValue}
            />
          </div>
        </div>
        <div className="offcanvas-footer mt-4">
          <Button variant="primary" className="btn-brand-solid me-3" type="submit">Submit</Button>
          <Button variant="primary" className="btn-brand-outline" type="button" onClick={onCloseModal}>Cancel</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default AddRecommendationModal;