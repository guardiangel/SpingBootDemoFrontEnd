import React, { useState } from "react";
import { UserMode } from "../interfaces/commonInterfaces";
import { useEffect } from "react";
import { getUserById } from "../apis/ApiInterfaces";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginState } from "../reducers/LoginReducerSlice";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material";
import { colorTokens } from "../theme";
import Moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type formData = {
  id?: string;
  userName: string;
  phonenumber: string;
  //sex: string;
};
const phoneRegExp = /^(\d{3})(\d{3})(\d{4})$/;

const userSchema = yup.object().shape({
  //sex: yup.string().required("required"),
  userName: yup.string().required("required"),
  //email: yup.string().email("email is not valid").required("required"),
  phonenumber: yup
    .string()
    .matches(phoneRegExp, "phoneNumber is not valid")
    .required("required"),
});

const UserDetail = () => {
  Moment.locale("en");

  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );
  const { id } = useParams();
  const [user, setUser] = useState<UserMode>();

  //get user data
  useEffect(() => {
    getUserById(loginStateObject.token, id).then((res) => {
      setUser(res.data?.data);
    });
  }, [loginStateObject.token, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data: formData) => {
    data.id = id;
    console.log(data);
  };

  return (
    <div
      style={{
        backgroundColor: colors.primary[900],
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ color: colors.greenAccent[300] }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            paddingTop: "20vh",
            paddingLeft: "20vw",
            alignItems: "center",
            textAlign: "left",
            gap: "30px",
          }}
        >
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="loginName">Login Name:</label>
            <input
              type="text"
              placeholder="LoginName"
              value={user?.loginName}
              disabled
            />
          </div>
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="loginName">User Name:</label>
            <input
              type="text"
              placeholder="userName"
              defaultValue={user?.userName}
              {...register("userName", { required: true, maxLength: 100 })}
            />
            <span style={{ color: colors.redAccent[400] }}>
              {errors?.userName?.message}
            </span>
          </div>
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="loginName">Email:</label>
            <input
              type="text"
              placeholder="Email"
              value={user?.email}
              disabled
            />
          </div>
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="loginName">Phone Number:</label>
            <input
              type="text"
              defaultValue={user?.phonenumber}
              placeholder="Phone Number"
            />
            <span style={{ color: colors.redAccent[400] }}>
              {errors?.phonenumber?.message}
            </span>
          </div>
          <div style={{ gridColumn: "span 1" }}>
            {/*  <label htmlFor="sex">Gender:</label>
            <select {...register("sex")}>
              <option value=""></option>
              <option value="2">Female</option>
              <option value="1">Male</option>
              <option value="3">Unknow</option>
            </select> */}
          </div>
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="loginDate">Login Date:</label>
            <input
              type="text"
              disabled
              value={Moment(user?.loginDate).format("YYYY-MM-DD HH:mm:ss")}
              placeholder="Login Date"
            />
          </div>

          <div style={{ alignItems: "center" }}>
            <input type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
