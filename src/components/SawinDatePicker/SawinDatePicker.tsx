import "./SawinDatePicker.scss";
import React, { useState, Fragment } from "react";
import { Label } from "../../components/Label/Label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface PropData {
  onChange?: any;
}

const SawinDatePicker = (props: PropData) => {
  const [startDate, setStartDate] = useState(new Date());
  let textInput = React.createRef<HTMLInputElement>();

  return (
    <>
      <Fragment>
        <div className="col-12 search-form rounded-pill p-1 mr-3">
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
              if (props.onChange) {
                props.onChange(moment(date).format('YYYY-MM-DD HH:mm:ss'));
              }
            }}
          />
        </div>
      </Fragment>
    </>
  );
};

SawinDatePicker.defaultProps = {
  placeholder: "Select",
  selected: "",
  isSearchable: false,
  key: new Date().getTime(),
};

export default SawinDatePicker;
