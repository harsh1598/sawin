import { useEffect, useState, useRef } from "react";
import { Button } from "../../components/Button/Button";
import "./StandardDescriptionModel";
import { useSelector } from "react-redux";
import { RootState } from "../../config/Store";
import { APIState } from "../../reducer/CommonReducer";
import Grid, {
  GridColumn,
  GridHeader,
  GridRow,
} from "../../components/Grid/Grid";
import deleteicon from "../../assets/images/delete-icon.svg";
import editicon from "../../assets/images/edit.svg";
import WebService from "../../utility/WebService";
import { Check2, X } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

interface PropData {
  isShow: boolean;
  title: any;
  data: any;
  close: any;
  isClose: any;
  selectedData: any;
}

const headers: GridHeader[] = [
  {
    title: "Select",
    isSorting: false,
  },
  {
    title: "Code",
  },
  {
    title: "Description",
  },
  {
    title: "Action",
    isSorting: false,
  },
];

const StandardDescriptionModel = (props: PropData) => {
  const [isLoading, setLoading] = useState(false);
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
  let data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
  const [rows, setRows] = useState<GridRow[]>([]);
  let rowCompute = useRef<GridRow[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<any[]>([]);

  let isNew: boolean;
  let code: string;
  let description: string;

  useEffect(() => {
    getServiceDescription();
  }, []);

  const getServiceDescription = () => {
    setLoading(true)
    WebService.getAPI({
      action:
        "StandardDescription/GetAll/" +
        user_info["AccountId"] +
        "/" +
        user_info["CompanyId"] +
        "/Problem",
      body: null,
    })
      .then((res: any) => {
        rowCompute.current = [];
        for (let i in res) {
          let columns: GridColumn[] = [];
          columns.push({ value: checkBox(res[i], Number(i)) });
          columns.push({ value: res[i].Code });
          columns.push({ value: res[i].Description });
          columns.push({ value: actionList(Number(i), "ACTION", res[i]) });
          rowCompute.current.push({ data: columns });
        }

        setRows(rowCompute.current);
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      });
  };
  const onCancel = () => {
    props.close();
  };

  const checkBox = (value: any, index: number) => {
    return (
      <div>
        <input onClick={() => click(index, value)} type="checkbox" />
      </div>
    );
  };

  const addInput = () => {
    return (
      <div>
        <input
          type="text"
          className="form-control"
          onChange={(e) => (code = e.target.value)}
        />
      </div>
    );
  };

  const addTextArea = (value?: any) => {
    return (
      <div>
        <textarea
          className="form-control"
          defaultValue={value}
          onChange={(e) => (description = e.target.value)}
        />
      </div>
    );
  };


  const click = (index: number, data: any) => {
    let hasData: boolean = false;

    for (var i in selectedDescription) {
      if (selectedDescription[i].Code == data.Code) {
        hasData = true;
      }
    }
    if (hasData) {
      selectedDescription.splice(index, 1);
    } else {
      selectedDescription.push(data);
    }
    setSelectedDescription([...selectedDescription]);
  };

  const onAdd = () => {
    var array = [];
    for (var i in selectedDescription) {
      array.push(selectedDescription[i].Description);
    }
    var string = array.toString().replaceAll(",", " ");

    props.close("ON_SAVE", string);
  };

  const actionList = (value: number, type: string, data: object) => {
    return (
      <div>
        {type === "ACTION" ? (
          <div>
            <a
              onClick={() => onEdit(value, data)}
              className="text-dark ms-2 font-18 cursor-pointer"
            >
              <img src={editicon} height={25} />
            </a>
            <a
              onClick={() => onDelete(data)}
              className="text-dark ms-2 font-18 cursor-pointer"
            >
              <img src={deleteicon} height={25} />
            </a>
          </div>
        ) : (
          <div>
            <a
              onClick={() => onSave()}
              className="text-dark ms-2 font-18 cursor-pointer"
            >
              <Check2 size={20} />
            </a>
            <a
              onClick={() => onRemove()}
              className="text-dark ms-2 font-18 cursor-pointer"
            >
              <X size={20} />
            </a>
          </div>
        )}
      </div>
    );
  };

  const onAddStandardDescription = () => {
    let columns: GridColumn[] = [];
    {
      columns.push({ value: checkBox(0, Number(0)) });
      columns.push({ value: addInput() });
      columns.push({ value: addTextArea("") });
      columns.push({ value: actionList(0, "ADD", {}) });
    }
    setRows([{ data: columns }, ...rowCompute.current]);
    isNew = true;
  };

  const onRemove = () => {
    setRows(rowCompute.current);
  };

  const onSave = () => {
    if (code && description) {
      data = {
        Code: code,
        Description: description,
        EntityType: "Problem",
        AccountId: user_info["AccountId"],
        CompanyId: user_info["CompanyId"],
      };

      if (isNew) {
        setLoading(true)
        WebService.postAPI({
          action: `StandardDescription/`,
          body: data,
        })
          .then((res) => {
            getServiceDescription();
          })
          .catch((e) => {
            setLoading(false)
          });
      } else {
        setLoading(true)
        WebService.putAPI({
          action: `StandardDescription/`,
          body: data,
        })
          .then((res) => {
            getServiceDescription();
          })
          .catch((e) => {
            setLoading(false)
          });
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const onEdit = (index: number, data: any) => {
    isNew = false;
    let columns: GridColumn[] = [];
    {
      columns.push({
        value: checkBox(rowCompute.current[index], Number(index)),
      });
      columns.push({ value: rowCompute.current[index].data[1].value });
      columns.push({
        value: addTextArea(rowCompute.current[index].data[2].value),
      });
      columns.push({ value: actionList(0, "UPDATE", data) });
    }

    code = data.Code;
    description = data.Description;
    setRows(
      rowCompute.current.map((option: GridRow, i: number) => {
        return i === index ? { data: columns } : option;
      })
    );
  };

  const onDelete = (data: any) => {
    setLoading(true)
    WebService.deleteAPI({
      action: `StandardDescription/${user_info["AccountId"]}/${user_info["CompanyId"]}/${data['Code']}/Problem`,
      body: null,
    })
      .then((res) => {
        getServiceDescription();
      })
      .catch((e) => {
        setLoading(false)
      });
  }

  return (
    <>
      <Loader show={isLoading} />
      <div>
        <div className="col-12 mt-4 row ">
          <div className="col-6"></div>
          <div className="col-6 d-flex justify-content-end">
            <div className="col-5 text-end" style={{ marginRight: "8px" }}>
              <Button
                size="large"
                label="+ Add Standard Description"
                b_type="SAVE"
                onClick={() => onAddStandardDescription()}
              />
            </div>
          </div>
          <div>
            <Grid headers={headers} rows={rows} />
          </div>
          <div className="col-12 mt-4 d-flex justify-content-end row mb-3">
            <div className="col-2 text-end">
              <Button
                size="large"
                label="Add Description"
                b_type="SAVE"
                onClick={() => onAdd()}
                b_disabled={selectedDescription.length === 0 ? true : false}
              />
            </div>
            <div className="col-1 text-end">
              <Button
                size="large"
                onClick={() => onCancel()}
                label="Cancel"
                b_type="CANCEL"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandardDescriptionModel;
