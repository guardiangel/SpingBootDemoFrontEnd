import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useTheme } from "@mui/material";
import { colorTokens } from "../theme";
import { useDispatch } from "react-redux";
import { setLoginState } from "../reducers/LoginReducerSlice";

export default function Login() {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (data: any) => {
    console.log(data);
    axios
      .post("http://localhost:3001/user/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("login success.");
          dispatch(setLoginState({ loginState: true }));

          sessionStorage.setItem("accessToken", res.data.accessToken);
          sessionStorage.setItem("userName", res.data.userName);
          sessionStorage.setItem("userId", res.data.userId);
          navigate("/home");
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
            <ErrorMessage name="username" component="span" />

            <Field
              id="username"
              name="username"
              placeholder="username...."
              style={{
                margin: "0px 0px 20px 0px",
                height: "50px",
              }}
            />

            <ErrorMessage name="password" component="span" />

            <Field
              id="password"
              name="password"
              placeholder="password...."
              style={{
                margin: "0px 0px 20px 0px",
                height: "50px",
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

const initialValues = {
  username: "",
  password: "",
};

const userSchema = yup.object().shape({
  username: yup.string().required("required username"),
  password: yup.string().min(3).max(25).required("required password"),
});
