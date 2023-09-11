import React, { useEffect, useState } from "react";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/store";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import axios from "axios";
import { error } from "console";

function App() {
  const [theme, colorMode] = useMode();
  const [imageCode, setImageCode] = useState();

  const uuid = getUuid();

  useEffect(() => {
    axios
      .get(`http://localhost:8020/login/getLoginImgCode/${uuid}`, {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uuid]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/mainPage" element={<MainPage />} />
              </Routes>
            </CssBaseline>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </PersistGate>
    </Provider>
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

export default App;
