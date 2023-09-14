import "./App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/store";
import { PersistGate } from "redux-persist/integration/react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainPage/*" element={<MainPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
