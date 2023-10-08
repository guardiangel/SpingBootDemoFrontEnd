import React from "react";
import { useSelector } from "react-redux";
import { LoginState } from "../reducers/LoginReducerSlice";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import TopBar from "./TopBar";
import Dashboard from "../pages/Dashboard";
import Users from "./users/Users";
import UserDetail from "./users/UserDetail";
import Teacher from "./teachers/Teacher";

const MainPage = () => {
  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );
  const [theme, colorMode] = useMode();

  return (
    <>
      {loginStateObject.loginState ? (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <div className="app">
                <SidebarMenu />
                <main className="content">
                  <TopBar />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/teachers" element={<Teacher />} />
                    <Route path="/userDetail/:id" element={<UserDetail />} />
                  </Routes>
                </main>
              </div>
            </CssBaseline>
          </ThemeProvider>
        </ColorModeContext.Provider>
      ) : (
        <Typography sx={{ textAlign: "center", paddingTop: "50px" }}>
          You haven't logged in, click <Link to="/">Here</Link> to login page.
        </Typography>
      )}
    </>
  );
};

export default MainPage;
