import { useEffect, useState } from "react";
import "./AdditionalInformationModal.scss";
import Grid, {
  GridColumn,
  GridHeader,
  GridRow,
} from "../../components/Grid/Grid";
import addicon from "../../assets/images/add-icon.svg";
import deleteicon from "../../assets/images/delete-icon.svg";
import { Label } from "../../components/Label/Label";
import TextEditor from "../TextEditor/TextEditor";
import { getEquipments, getPriceSheet } from "../../utility/CommonApiCall";
import { useSelector } from "react-redux";
import { RootState } from "../../config/Store";
import { APIState } from "../../reducer/CommonReducer";
import SawinSelect from "../Select/SawinSelect";
import HelperService from "../../utility/HelperService";
import { Controller, useForm } from "react-hook-form";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { AdditionalInfo } from "../../action/CommonAction";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

interface PropData {
  isShow: boolean;
  title: any;
  isClose: any;
}

const headers: GridHeader[] = [
  {
    title: "Select",
  },
  {
    title: "",
  },
  {
    title: "Manufacturer",
    isSorting: false,
  },
  {
    title: "Model",
  },
  {
    title: "Description",
  },
  {
    title: "Actions",
  },
];

const rows: GridRow[] = [];
const AdditionalInformationModal = (props: PropData) => {
  const onCloseModal = () => {
    props.isClose(!props.isShow);
  };
  const dispatch: Dispatch<any> = useDispatch();
  const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const [notification, setNotification] = useState<any[]>([]);
  const [previousData, setpreviousData] = useState("");
  const [selectedEquipment, setselectedEquipment] = useState<any[]>([]);
  const [PS, setPS] = useState<any[]>([]);
  const [rows, setRows] = useState<GridRow[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    notification.push({ name: "", email: "", contact_number: "" });
    getPSValues();
  }, []);

  useEffect(() => {
    if (data.sd_master.Id) {
      getEquipment();
    }
  }, [data.sd_master]);

  const select = (value: any) => {
    return (
      <div>
        <input type="checkbox" />
      </div>
    );
  };

  const box = (index: any, covered: any) => {
    return (
      <div
        className={
          "box-size " +
          (covered === "Yes" ? "box-background-color" : "box-color")
        }
      >
        {" "}
      </div>
    );
  };

  const getEquipment = () => {
    getEquipments({ user_info, data })
      .then((res: any) => {
        let rows: GridRow[] = [];
        for (var i in res) {
          let columns: GridColumn[] = [];
          columns.push({ value: checkBox(res[i], Number(i)) });
          columns.push({ value: box(i, res[i].Covered) });
          columns.push({ value: res[i].EqpManufacturer });
          columns.push({ value: res[i].EqpModel });
          columns.push({ value: res[i].Description });
          rows.push({ data: columns });
        }

        setRows(rows);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  const checkBox = (value: any, index: number) => {
    return (
      <div>
        <input onClick={() => click(index, value)} type="checkbox" />
      </div>
    );
  };
  const click = (index: number, data: any) => {
    let hasData: boolean = false;
    for (var i in selectedEquipment) {
      if (selectedEquipment[i].Id == data.Id) {
        hasData = true;
      }
    }
    if (hasData) {
      selectedEquipment.splice(index, 1);

    } else {
      selectedEquipment.push(data)
    }
    setselectedEquipment([...selectedEquipment])
  };
  const getPSValues = () => {
    getPriceSheet({ data, user_info })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].PriceCode, value: res[i].PriceCodesDesc });
        }
        setPS(array);
      })
      .catch(() => { });
  };
  const currentValue = (value: any) => {
    setpreviousData(value);
  };
  const addObj = () => {
    notification.push({ name: "", email: "", contact_number: "" });
    setNotification([...notification]);
  };
  const removeObj = (index: any) => {
    notification.splice(index, 1);
    setNotification([...notification]);
  };
  const onSubmit = (requestBody: any) => {
    requestBody.notification = notification;
    requestBody.selectedEquipment = selectedEquipment;
    requestBody.ProblemDescription = previousData;
    props.isClose(!props.isShow, "ON_SAVE");
    dispatch(AdditionalInfo(requestBody));
  };
  const openEquipment = () => {
    props.isClose(!props.isShow, "OPEN_EQUIPMENT");
  };
  return (
    <Offcanvas
      show={props.isShow}
      onHide={onCloseModal}
      placement={"end"}
      className="offcanvas-large"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Additional Info</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="border-bottom px-0 information-main-view">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row px-4">
            <Label title="Special Instructions" type="BOLD" />
            <TextEditor data={null} editedData={currentValue} />
          </div>
          <div className="row px-4 mt-1">
            <Label title="Customer PO#" type="Normal" />
            <input
              className="form-control input"
              type="text"
              {...register("CustomerPONum", { required: false })}
            ></input>
          </div>

          <div className=" row px-4">
            <Label title="Notifications" type="BOLD" />
            {notification.map((res, i) => {
              return (
                <div key={"notification_" + i} className="col-12 row">
                  <div className="col-10 row">
                    <div className="col-4 ">
                      <Label title="Name" />
                      <input
                        className="form-control input"
                        value={res.name}
                        onChange={(e) => {
                          notification[i].name = e.target.value;
                          setNotification([...notification]);
                        }}
                        type="text"
                      ></input>
                    </div>
                    <div className="col-4">
                      <Label title="Email" />
                      <input
                        className="form-control input"
                        value={res.email}
                        onChange={(e) => {
                          notification[i].email = e.target.value;
                          setNotification([...notification]);
                        }}
                        type="text"
                      ></input>
                    </div>
                    <div className="col-4">
                      <Label title="Contact Number" />
                      <input
                        className="form-control input"
                        onKeyPress={(e) =>
                          HelperService.allowOnlyNumericValue(e)
                        }
                        onKeyUp={(e) => HelperService.contactFormatter(e)}
                        value={res.contact_number}
                        onChange={(e) => {
                          notification[i].contact_number = e.target.value;
                          setNotification([...notification]);
                        }}
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="col-2 row icons-view">
                    <div className="col-3">
                      {notification.length > 1 && (
                        <img
                          src={deleteicon}
                          onClick={() => removeObj(i)}
                          id="img_downarrow"
                          height={25}
                          className="deleteicon"
                          alt="downarrow"
                        />
                      )}
                    </div>
                    <div className="col-3">
                      <img
                        src={addicon}
                        onClick={() => addObj()}
                        id="img_downarrow"
                        height={25}
                        className="addicon"
                        alt="downarrow"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row px-4">
            <Label title="Price Sheet" type="BOLD" />
            <div className="col-4">
              <Label title="Labor Price Sheet" />
              <Controller
                control={control}
                name="PriceCodeLab"
                render={({ field }) => (
                  <SawinSelect
                    options={PS}
                    disValue="BreakName"
                    value="BreakCode"
                    onChange={(data: any) => field.onChange(data.id)}
                  />
                )}
              />
            </div>
            <div className="col-4">
              <Label title="Material Price Sheet" />
              <Controller
                control={control}
                name="PriceCodeMat"
                render={({ field }) => (
                  <SawinSelect
                    options={PS}
                    disValue="BreakName"
                    value="BreakCode"
                    onChange={(data: any) => field.onChange(data.id)}
                  />
                )}
              />
            </div>
            <div className="col-4">
              <Label title="Other Price Sheet" />
              <Controller
                control={control}
                name="PriceCodeOther"
                render={({ field }) => (
                  <SawinSelect
                    options={PS}
                    disValue="BreakName"
                    value="BreakCode"
                    onChange={(data: any) => field.onChange(data.id)}
                  />
                )}
              />
            </div>
          </div>

          <div className="row px-4">
            <div className="col-6 mt-1">
              <Label title="Label 1" />
              <input
                className="form-control input"
                type="text"
                {...register(`CustomFields[field1]`)}
                placeholder="Label 1"
              ></input>
            </div>
            <div className="col-6 mt-1">
              <Label title="Label 2" />
              <input
                className="form-control input"
                {...register(`CustomFields[field2]`)}
                type="text"
                placeholder="Label 2"
              ></input>
            </div>
            <div className="col-6">
              <Label title="Label 3" />
              <input
                {...register(`CustomFields[field3]`)}
                className="form-control input"
                type="text"
                placeholder="Label 3"
              ></input>
            </div>
            <div className="col-6">
              <Label title="Label 4" />
              <input
                className="form-control input"
                {...register(`CustomFields[field4]`)}
                type="text"
                placeholder="Label 4"
              ></input>
            </div>
          </div>

          <div className="row px-4 mt-1 d-flex justify-content-end mt-3">
            <div
              className="col-6 new-add-button d-flex"
              onClick={() => openEquipment()}
            >
              + Add Equipment
            </div>
          </div>

          <div
            className="row px-4 mt-4 text-editor-margin "
            style={{ overflow: "scroll", width: 800 }}
          >
            <Grid headers={headers} rows={rows} />
          </div>

          <div className="offcanvas-footer mt-4">
            <Button
              variant="primary"
              className="btn-brand-solid me-3"
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="primary"
              className="btn-brand-outline"
              type="button"
              onClick={onCloseModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AdditionalInformationModal;
