import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../theme";
import { LoginState } from "../reducers/LoginReducerSlice";
import { useSelector } from "react-redux";
const PageNotFound = () => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );
  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        height: "100vh",
        width: "100vw",
      }}
    >
      {loginStateObject.loginState ? (
        <Typography sx={{ textAlign: "center", paddingTop: "50px" }}>
          Page not found, click <Link to="/mainPage">Here</Link> to return main
          page.
        </Typography>
      ) : (
        <Typography sx={{ textAlign: "center", paddingTop: "50px" }}>
          You haven't logged in, click <Link to="/">Here</Link> to login page.
        </Typography>
      )}
    </Box>
  );
};

export default PageNotFound;
