import React from "react";
import { useSelector } from "react-redux";
import { LoginState } from "../reducers/LoginReducerSlice";
const MainPage = () => {
  const loginState = useSelector(
    (state: LoginState) => state.loginStateObject.loginState
  );
  return <div>{loginState && "mainpage"}</div>;
};

export default MainPage;
