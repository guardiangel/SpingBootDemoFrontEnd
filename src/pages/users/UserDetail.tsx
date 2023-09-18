import React, { useState } from "react";
import { UserMode } from "../../interfaces/commonInterfaces";
import { useEffect } from "react";
import { getUserById, updateUserInfo } from "../../apis/ApiInterfaces";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginState } from "../../reducers/LoginReducerSlice";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material";
import { colorTokens } from "../../theme";
import Moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type formData = {
  id?: number | undefined;
  userName: string;
  phonenumber: string;
  sex: string;
};

/**
 * +919367788755
8989829304
+16308520397
786-307-3615
(786) 307-3615
 */
const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const userSchema = yup.object().shape({
  id: yup.number().min(1).required("required"),
  sex: yup.string().required("You can't select unknown for one's gender."),
  userName: yup.string().required("required"),
  //email: yup.string().email("email is not valid").required("required"),
  phonenumber: yup
    .string()
    .matches(phoneRegExp, "phoneNumber is not valid")
    .required("required"),
});

const UserDetail = () => {
  const navigate = useNavigate();

  //handle time format
  Moment.locale("en");

  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );

  // const { id } = useParams<{ id: number }>();
  const { id } = useParams() as any;
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

  //handle submit
  const onSubmit = (data: formData) => {
    console.log(data);
    updateUserInfo(loginStateObject.token, data).then((res) => {
      if (res.data?.code === "0000") {
        alert("Update user successfully.");
        setUser(res.data?.data);
      } else {
        alert(res.data);
      }
    });
  };

  const returnToList = (e: any) => {
    e.stopPropagation();
    navigate("/mainPage/users");
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
          {/**hidden id */}
          <div style={{ gridColumn: "span 2" }}>
            <input {...register("id", { value: id })} type="hidden" />
          </div>

          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="loginName">Login Name:</label>
            <input
              type="text"
              placeholder="LoginName"
              defaultValue={user?.loginName}
              disabled
            />
          </div>
          {/**user name */}
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              placeholder="userName"
              defaultValue={user?.userName}
              {...register("userName", { onChange: (e) => console.log(e) })}
            />
            <span style={{ color: colors.redAccent[400] }}>
              {errors?.userName?.message}
            </span>
          </div>
          {/**email */}
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="Email"
              defaultValue={user?.email}
              disabled
            />
          </div>
          {/**phone number */}
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="text"
              defaultValue={user?.phonenumber}
              placeholder="Phone Number"
              {...register("phonenumber")}
            />
            <span style={{ color: colors.redAccent[400] }}>
              {errors?.phonenumber?.message}
            </span>
          </div>
          {/**gender */}
          <div style={{ gridColumn: "span 1" }}>
            <label>Gender:</label>
            <select defaultValue={user?.sex} {...register("sex")}>
              <option value="" selected={user?.sex === ""}>
                Unknown
              </option>
              <option value="2" selected={user?.sex === "2"}>
                Female
              </option>
              <option value="1" selected={user?.sex === "1"}>
                Male
              </option>
              <option value="3" selected={user?.sex === "3"}>
                Other
              </option>
            </select>
            <span style={{ color: colors.redAccent[400] }}>
              {errors?.sex?.message}
            </span>
          </div>
          <div style={{ gridColumn: "span 1" }}>
            <label htmlFor="loginDate">Login Date:</label>
            <input
              type="text"
              disabled
              defaultValue={Moment(user?.loginDate).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
              placeholder="Login Date"
            />
          </div>

          <div style={{ alignItems: "center" }}>
            <input type="submit" />
          </div>
          <div style={{ alignItems: "center" }}>
            {/*  <Link to="/mainPage/users">Return</Link> */}
            <button onClick={(e) => returnToList(e)}>Return</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
