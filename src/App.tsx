import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/store";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
