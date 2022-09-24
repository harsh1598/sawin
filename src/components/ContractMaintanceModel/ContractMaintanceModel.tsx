import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import "./ContractMaintanceModel";
import { useSelector } from "react-redux";
import { RootState } from "../../config/Store";
import { APIState } from "../../reducer/CommonReducer";
import Grid, { GridColumn, GridHeader, GridRow } from "../../components/Grid/Grid";
import "./ContractMaintanceModel.scss";
interface PropData {
    isShow: boolean;
    title: any;
    data: any;
    close: any;
    isClose: any;
}

const headers: GridHeader[] = [
    {
        title: "Interval",
    },
    {
        title: "Task Description",
    },
    {
        title: "Shedule Date",
    },
    {
        title: "Maitenance Description",
    },
];

const ContractMaintanceModel = (props: PropData) => {
    const [ShowLoader, setShowLoader] = useState(false);
    const [isShow, setShow] = useState(true);
    const user_info = JSON.parse(localStorage.getItem("user_detail") || "");
    const data: any = useSelector<RootState, APIState>((state) => state.sdMaster);
    const [rows, setRows] = useState<GridRow[]>([]);

    useEffect(() => {
        let rows: GridRow[] = [];
        if (props.data) {
            for (var i in props.data) {
                let columns: GridColumn[] = [];
                columns.push({
                    value: `${props.data[i].Interval} ${props.data[i].WeeklyOrMonthly}`,
                });
                columns.push({ value: props.data[i].TaskCodeDescription });
                columns.push({ value: props.data[i].ScheduleDate });
                columns.push({ value: props.data[i].MaintenanceDescription });
                rows.push({ data: columns });
            }
        }
        setRows(rows);
    }, [props.data]);

    const onCancel = () => {
        props.close();
    };

    return (
        <>
            <div>
                <div className="col-12 mt-4">
                    <div className="contractgrid">
                        <Grid headers={headers} rows={rows} ShowLoader={ShowLoader} />
                    </div>
                    <hr />
                </div>
                <div className="col-12 mt-4 d-flex justify-content-end row mb-3">
                    <div className="col-2">
                        <Button size="large" label="Select" b_type="SAVE" />
                    </div>
                    <div className="col-2">
                        <Button
                            size="large"
                            onClick={() => onCancel()}
                            label="Cancel"
                            b_type="CANCEL"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContractMaintanceModel;
