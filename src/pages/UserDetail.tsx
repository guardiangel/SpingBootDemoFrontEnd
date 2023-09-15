import React, { useState } from "react";
import { UserMode } from "../interfaces/commonInterfaces";
import { useEffect } from "react";
import { getUserById } from "../apis/ApiInterfaces";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginState } from "../reducers/LoginReducerSlice";

const UserDetail = () => {
  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );
  const { id } = useParams();
  const [user, setUser] = useState<UserMode>();

  useEffect(() => {
    getUserById(loginStateObject.token, id).then((res) => {
      console.log(res.data);
      setUser(res.data?.data);
    });
  }, [loginStateObject.token, id]);

  return <div>userDetails,{id}</div>;
};

export default UserDetail;
