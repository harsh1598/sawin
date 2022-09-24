import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import "./Login.scss";
import { Label } from "../../../components/Label/Label";
import Loader from "../../../components/Loader/Loader";
import { RootState } from "../../../config/Store";
import { UserState } from "../../../reducer/AuthReducer";
import AuthHeader from "../../../components/AuthHeader/AuthHeader";
import DraggableModal from "../../../components/DraggableModal/DraggableModal";
import WebService from "../../../utility/WebService";
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from "../../../action/Types";
import { ActivePage } from "../../../action/CommonAction";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState(false);

  const onSubmit = async (data: any) => {
    data.grant_type = "password";

    WebService.getAccesstoken({
      action: "Token",
      body: data,
    })
      .then((res: any) => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: { access_token: res.access_token },
        });
        localStorage.setItem("user_detail", JSON.stringify(res));
        dispatch(ActivePage("Dashboard"));
        history("/dashboard");
      })
      .catch((e) => {
        dispatch({ type: USER_LOGIN_FAIL, payload: { error: e } });
      });
  };

  return (
    <>
      <Loader
        show={userLogin.loading === undefined ? false : userLogin.loading}
      />
      <AuthHeader />
      <DraggableModal
        isOpen={forgotModal}
        onClose={() => setForgotModal(false)}
        title="Forgot Password"
        type="FORGOT_PASSWORD"
        width={600}
        data={null}
      />
      <div className="col-12 d-flex justify-content-center row">
        <div className="main">
          <span className="heading">Secure Login</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="loginContainer form-style">
              <Label title="Email Address" />
              <input
                className="form-control"
                {...register("username", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                placeholder={"Email Address"}
              />
              {errors.username && (
                <Label
                  title={"Please enter valid username."}
                  modeError={true}
                />
              )}
              <Label title="Password" />
              <input
                className="form-control"
                type={"password"}
                {...register("password", { required: true })}
                placeholder={"***********"}
              />
              {errors.password && (
                <Label title={"Please enter password."} modeError={true} />
              )}
              <div className="col-12 d-flex justify-content-between mt-3">
                <div>
                  <input type="checkbox" />
                  <span className="staticText">Remember Me</span>
                </div>
                <div>
                  <span
                    className="signUpText"
                    onClick={() => setForgotModal(!forgotModal)}
                  >
                    Reset Password
                  </span>
                </div>
              </div>
              <div className="mt-3 row col-12">
                <div className="col-5">
                  <Button size={"large"} label="Login" b_type="LOGIN" />
                </div>
                <div className="col-6 align-self-center">
                  <button
                    className="b1-login"
                    onClick={() => history(`/signup`)}
                  >
                    <span className="createAccount">Create Account</span>
                  </button>
                </div>
              </div>
              <div className="mt-3 mb-3">
                <span>
                  <img
                    src={require("../../../assets/images/lock.png")}
                    alt="lock"
                  />
                  <span className="account">
                    Your information is protected with 128-bit SSL encryption
                  </span>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
