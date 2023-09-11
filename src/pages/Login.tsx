import { useState, useRef, useEffect, useMemo } from "react";
import "../App.css";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTheme } from "@mui/material";
import { colorTokens } from "../theme";
import { useDispatch } from "react-redux";
import { setLoginState } from "../reducers/LoginReducerSlice";
import { getImageCode, submitLogin } from "../apis/ApiInterfaces";

export default function Login() {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //uuid will be generated once when entering this page since we use useMemo here
  //Every the page is rendered, the uuid will change by default, that's why we use useMemo.
  //In the back end, the program will validate the uuid.
  const [uuid, setUuid] = useState<string>("");

  const [imageCode, setImageCode] = useState<string>("");

  useMemo(() => {
    setUuid(getUuid());
  }, []);

  console.log(uuid);
  //fix eslint problem when using useEffect.
  const fetchImageCode = useRef(() => {});
  //Get image Code for verification
  fetchImageCode.current = () => {
    getImageCode(uuid)
      .then((res) => {
        console.log(res.data);
        setImageCode(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Initialize the image code
  useEffect(() => {
    fetchImageCode.current();
  }, []);

  //Submit form
  const handleSubmit = (data: any) => {
    //put uuid into data
    data.uuid = uuid;
    console.log(data);
    submitLogin(data).then((res) => {
      if (res.status === 200) {
        alert("login success.");
        dispatch(
          setLoginState({
            loginState: true,
            token: res.data.accessToken,
            loginName: res.data.loginName,
            userId: res.data.userId,
          })
        );
        //sessionStorage.setItem("token", res.data.accessToken);
        //sessionStorage.setItem("loginName", res.data.loginName);
        //sessionStorage.setItem("userId", res.data.userId);
        navigate("/mainPage");
      } else {
        alert(res.data);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "200px" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h2">Sign in</Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(e) => handleSubmit(e)}
          validationSchema={userSchema}
        >
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "60%",
              padding: "20px",
            }}
          >
            <ErrorMessage
              name="loginName"
              component="span"
              className="loginErrorMessage"
            />

            <Field
              id="loginName"
              name="loginName"
              placeholder="loginName*"
              style={{
                margin: "0px 0px 20px 0px",
                height: "50px",
              }}
            />

            <ErrorMessage
              name="password"
              component="span"
              className="loginErrorMessage"
            />

            <Field
              id="password"
              name="password"
              placeholder="password*"
              style={{
                margin: "0px 0px 20px 0px",
                height: "50px",
              }}
            />

            <ErrorMessage
              name="imageCode"
              component="span"
              className="loginErrorMessage"
            />

            <Field
              id="imageCode"
              name="imageCode"
              placeholder="imageCode*"
              style={{
                margin: "0px 0px 20px 0px",
                height: "50px",
              }}
            />

            <img
              src={imageCode}
              alt="imageCode"
              onClick={() => {
                fetchImageCode.current();
              }}
            />

            <div>
              <button
                type="submit"
                style={{
                  width: "200px",
                  backgroundColor: colors.greenAccent[400],
                  height: "50px",
                  marginBottom: "20px",
                }}
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
        <Grid container>
          <Grid item>
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const getUuid = (): string => {
  let s: string[] = [];
  let hexDigits = "0123456789abcdefghi";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((Number(s[19]) & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  let uuid = s.join("");
  return uuid;
};

const initialValues = {
  loginName: "",
  password: "",
  imageCode: "",
};

const userSchema = yup.object().shape({
  loginName: yup.string().required("required loginName"),
  password: yup.string().min(3).max(25).required("required password"),
  imageCode: yup.string().required("required imageCode"),
});
