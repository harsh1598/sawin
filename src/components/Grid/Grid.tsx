import "./Grid.scss";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import useClickOutside from "../../hooks/useClickOutside";
import SawinSelect from "../Select/SawinSelect";
import { Button } from "../Button/Button";
import loader from "../../assets/images/loader.gif";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { X } from "react-bootstrap-icons";
import ButtonLight from "react-bootstrap/Button";
import iconCalendar from "../../assets/images/calander-icon.svg";
import iconFilter from "../../assets/images/filter-icon.svg";
import iconCols from "../../assets/images/col-icon.svg";
import {
  ArrowUp,
  ArrowDown,
  ListCheck,
  FunnelFill,
  CaretRightFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";

export interface GridColumn {
  value: any;
  type?: string;
  classname?: string;
  isEditable?: boolean;
}

export interface GridData {
  headers: GridHeader[];
  rows: GridRow[];
  ShowLoader?: boolean;
  errorMessage?: string;
}

export interface GridHeader {
  title: string;
  isSorting?: boolean;
  isAsc?: boolean;
  isDesc?: boolean;
  style?: string;
  isFilter?: boolean;
  isShow?: boolean;
}

export interface GridRow {
  data: GridColumn[];
  style?: string;
}

const Grid = (props: GridData) => {
  const [headers, setHeaders] = useState(
    props.headers.map((option: GridHeader) => {
      if (option.isShow === undefined) {
        option.isShow = true;
      }

      return { ...option };
    })
  );

  useEffect(() => {
    setRows(props.rows);
    setData(props.rows.slice(currentPage - 1, perPageItem));
  }, [props.rows]);

  const [isFilter, setIsFilter] = useState(false);
  const [isShowColumns, setIsShowColumns] = useState(false);

  const [rows, setRows] = useState([...props.rows]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageItem, setPerPageItem] = useState(5);
  const [data, setData] = useState<GridRow[]>([]);

  let domNode = useClickOutside(() => {
    setHeaders(
      headers.map((option: GridHeader) => {
        return { ...option, isFilter: false };
      })
    );
  }, this);

  const filterOptions = [
    {
      id: "1",
      value: "Is equal to",
    },
    {
      id: "2",
      value: "Is not equal to",
    },
    {
      id: "3",
      value: "Starts with",
    },
    {
      id: "4",
      value: "Contains",
    },
    {
      id: "5",
      value: "Does not contains",
    },
    {
      id: "6",
      value: "Ends with",
    },
    {
      id: "7",
      value: "Is not null",
    },
    {
      id: "8",
      value: "Is empty",
    },
    {
      id: "9",
      value: "Is not empty",
    },
    {
      id: "10",
      value: "Has value",
    },
    {
      id: "11",
      value: "Has no value",
    },
  ];

  const pageOption = [
    { id: 5, value: "5" },
    { id: 10, value: "10" },
    { id: 20, value: "20" },
    { id: 50, value: "50" },
    { id: 100, value: "100" },
    { id: 1000, value: "All" },
  ];

  let sortingList = (
    <ul ref={domNode} className="sorting-option">
      <li className="cursor-pointer" onClick={() => storing("A")}>
        <div className="row">
          <div className="col-2">
            <ArrowUp />
          </div>
          <span className="col-10 text-start"> Sort Ascending</span>
        </div>
      </li>
      <li className="cursor-pointer" onClick={() => storing("D")}>
        <div className="row">
          <div className="col-2">
            <ArrowDown />
          </div>
          <span className="col-10 text-start"> Sort Descending</span>
        </div>
      </li>
    </ul>
  );

  const updateValue = (index: number) => {
    setHeaders(
      headers.map((option: GridHeader, i: number) => {
        return i === index ? { ...option, isShow: !option.isShow } : option;
      })
    );
  };

  const storing = (type: string) => {
    setIsFilter(false);
    setIsShowColumns(false);
    setHeaders(
      headers.map((option: GridHeader) =>
        option.isFilter === true
          ? type === "D"
            ? {
                ...option,
                isFilter: !option.isFilter,
                isAsc: !option.isAsc,
                isDesc: false,
              }
            : {
                ...option,
                isFilter: !option.isFilter,
                isDesc: !option.isDesc,
                isAsc: false,
              }
          : {
              ...option,
              isAsc: false,
              isDesc: false,
            }
      )
    );
  };

  const updateisFilter = (header: GridHeader) => {
    setIsFilter(false);
    setIsShowColumns(false);
    setHeaders(
      headers.map((option: GridHeader) =>
        option.title === header.title
          ? { ...option, isFilter: !option.isFilter }
          : { ...option, isFilter: false }
      )
    );
  };

  const onPageCountSelect = (data: any) => {
    if (data.value === "All") {
      setPerPageItem(rows.length);
      setData(rows.slice(currentPage - 1, rows.length));
    } else {
      setPerPageItem(data.id);
      setData(rows.slice(currentPage - 1, data.id));
    }
  };

  return (
    <div className="grid-div" data-testid="comp-sawin-table">
      <Row className="align-items-center mx-0">
        <Col md={6}>
          <label className="font-medium font-14 font-w-medium d-inline me-3">
            Active Filters
          </label>
          <div className="applied-filter d-inline-block ">
            <span className="filter-name">
              Status <X size={20} />
            </span>
            <span className="filter-name">
              Location <X size={20} />
            </span>
            <span className="filter-name">
              Outcome <X size={20} />
            </span>
            <a
              href="javascript:void(0)"
              className="font-w-medium font-14 text-nowrap"
            >
              Clear Filter
            </a>
          </div>
        </Col>
        <Col md={6} className="text-end">
          <ButtonLight variant="light" className="btn-brand-light">
            {" "}
            <img
              src={iconCalendar}
              height={16}
              width={16}
              className="icon"
            />{" "}
            Date Range
          </ButtonLight>
          <ButtonLight variant="light" className="btn-brand-light">
            {" "}
            <img
              src={iconFilter}
              height={16}
              width={16}
              className="icon"
            />{" "}
            Filter
          </ButtonLight>
          <ButtonLight
            variant="light"
            className="btn-brand-light"
            onClick={() => {
              setIsShowColumns(!isShowColumns);
              setIsFilter(false);
            }}
          >
            {" "}
            <img src={iconCols} height={16} width={16} className="icon" />{" "}
            Column
          </ButtonLight>

          {isShowColumns ? (
            <ul className="submenu">
              {headers.map((header: GridHeader, j) => (
                <li key={"columns_" + j} className="row">
                  <input
                    type="checkbox"
                    checked={header.isShow}
                    onClick={() => updateValue(j)}
                    className="sawin-checkbox col-1 mt-1"
                  />
                  <label className="col-10 mt-1">{header.title}</label>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <div className={props.ShowLoader === false ? "table-scroll" : ""}>
        <table className="grid-table">
          <thead>
            <tr>
              {headers.map((header: GridHeader, i) =>
                header.isShow === false ? (
                  ""
                ) : (
                  <th key={i.toString()}>
                    {header.title}
                    <span className="sorting">
                      {header.isDesc ? <ArrowUp /> : null}
                      {header.isAsc ? <ArrowDown /> : null}
                    </span>
                    {header.isSorting === false ? (
                      ""
                    ) : (
                      <span className="filterIcon">
                        <ThreeDotsVertical
                          className="cursor-pointer"
                          onClick={() => {
                            updateisFilter(header);
                          }}
                        />
                        {header.isFilter ? sortingList : ""}
                      </span>
                    )}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {props.ShowLoader === true || data.length == 0 ? (
              <></>
            ) : (
              data.map((row: GridRow, i) => (
                <tr key={"body_data_" + i.toString()}>
                  {headers.map((header: GridHeader, j) =>
                    header.isShow === false ? (
                      ""
                    ) : (
                      <td key={"row_" + i + "_" + j}>
                        {row.data[j] ? (
                          row.data[j].type === "HTML" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: row.data[j].value,
                              }}
                            />
                          ) : (
                            row.data[j].value
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {rows.length == 0 && props.ShowLoader === false ? (
          <div>
            <div className="error-message">{props.errorMessage}</div>
          </div>
        ) : null}
      </div>
      {props.ShowLoader === true ? (
        <div className="">
          <div></div>
          <div style={{ textAlign: "center", marginTop: "10%" }}>
            <img
              style={{ position: "relative" }}
              src={loader}
              alt="No loader found"
            />
            <div style={{ position: "relative", color: "white" }}>
              Loading...
            </div>
          </div>
        </div>
      ) : null}

      {rows.length > 0 ? (
        <div className="d-flex flex-row justify-content-between mb-3">
          <div className="d-flex row col-6 ">
            <div className="showing-text ps-3 col-6 mt-3">
              {currentPage} - {(currentPage - 1) * perPageItem + perPageItem} of{" "}
              {rows.length} items
            </div>
            <div className="col-3">
              <SawinSelect
                options={pageOption}
                value="pageCount"
                selected={5}
                onChange={(data: any) => onPageCountSelect(data)}
              />
            </div>
          </div>
          <Pagination
            totalItems={rows.length}
            itemsCountPerPage={perPageItem}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Grid;
