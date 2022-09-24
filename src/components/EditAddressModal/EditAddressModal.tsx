import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { useForm, Controller } from "react-hook-form";
import "./EditAddressModal.scss";
import WebService from "../../utility/WebService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../config/Store";
import { APIState, SearchState } from "../../reducer/CommonReducer";
import Loader from "../../components/Loader/Loader";
import { Dispatch } from "redux";
import SawinSelect from "../../components/Select/SawinSelect";

interface PropData {
  close: any;
  data: any;
  updateData: any;
}

const EditAddressModal = (props: PropData) => {
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, watch, reset, control } = useForm({
    defaultValues: props.data,
  });
  const value: any = useSelector<RootState, APIState>(
    (state) => state.sdMaster
  );
  const user_info = JSON.parse(localStorage.getItem("user_detail") || "{}");
  const [zipCodeList, setZipCodeList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);

  useEffect(() => {
    getZipCode();
    getState();
  }, []);

  const onSubmit = (data: any) => {
    setLoading(true);
    if (window.location.pathname === "/new-service-master") {
      var requestData = { ARCustomerMaster: data };
      props.close("ON_SAVE", requestData);
    } else {
      data.AccountId = user_info.AccountId;
      data.CompanyId = user_info.CompanyId;
      data.Id = value.sd_master.Id;
      if (
        value.sd_master &&
        value.sd_master.SDEquipmentMasters &&
        value.sd_master.SDEquipmentMasters.length > 0
      ) {
        data.SDServiceMasterId =
          value.sd_master.SDEquipmentMasters[0].SDServiceMasterId;
        data.ARCustomerMasterId =
          value.sd_master.SDEquipmentMasters[0].ARCustomerMasterId;
      }
      data.LocationMasterId = props.data.LocationMasterId;
      data.IsActive = true;
      data.CompanyName = value.sd_master.CompanyName;
      props.close("ON_SAVE", data);
    }
    reset();
    setLoading(false);
  };

  const onCancel = () => {
    props.close();
  };

  const getZipCode = () => {
    WebService.getAPI({
      action: `SetupSDZipCode/${user_info["AccountId"]}/${user_info["CompanyId"]}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].ZipCode, value: res[i].ZipCode });
        }
        setZipCodeList(array);
      })
      .catch((e) => {});
  };

  const getState = () => {
    WebService.getAPI({
      action: `SaiSetupState/GetAll/${"en-US"}`,
      body: null,
    })
      .then((res: any) => {
        var array = [];
        for (var i in res) {
          array.push({ id: res[i].Code, value: res[i].Name });
        }
        setStateList(array);
      })
      .catch((e) => {});
  };

  return (
    <>
      <Loader show={isLoading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-address-modal form-style">
          <Label title="Address" />
          <input
            className="form-control"
            placeholder="Address"
            type="text"
            {...register("Address1", { required: true })}
          />
          <Label title="Apartment, suite, unit, etc. (optional)" />
          <input
            className="form-control"
            placeholder="Apartment, suite, unit, etc. (optional)"
            type="text"
            {...register("Address2")}
          />
          <div className="col-12 d-flex row">
            <div className="col-4">
              <Label title="Zip Code" />
              <Controller
                control={control}
                name="ZipCode"
                render={({ field }) => (
                  <SawinSelect
                    options={zipCodeList}
                    selected={value?.sd_master?.ZipCode}
                    disValue="BreakName"
                    value="BreakCode"
                    onChange={(data: any) => field.onChange(data.id)}
                  />
                )}
              />
            </div>
            <div className="col-4">
              <Label title="City" />
              <input
                className="form-control"
                placeholder="City"
                type="text"
                {...register("City", { required: true })}
              />
            </div>
            <div className="col-4">
              <Label title="State" />
              <Controller
                control={control}
                name="State"
                render={({ field }) => (
                  <SawinSelect
                    options={stateList}
                    selected={value?.sd_master?.State}
                    disValue="BreakName"
                    value="BreakCode"
                    onChange={(data: any) => field.onChange(data.id)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-12 d-flex row justify-content-center mt-5 mb-4">
            <div className="col-3 text-end">
              <Button
                size="large"
                label="Cancel"
                b_type="CANCEL"
                onClick={() => onCancel()}
              />
            </div>
            <div className="col-3">
              <Button size="large" label="Save" b_type="SAVE" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAddressModal;
