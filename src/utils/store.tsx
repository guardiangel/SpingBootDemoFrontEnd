import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../reducers/LoginReducerSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedLoginReducer = persistReducer(persistConfig, loginReducer);

export const store = configureStore({
  reducer: {
    loginStateObject: persistedLoginReducer,
    // menuDisplay: menuDisplayReducer,
    // leftMenuControl: leftMenuControlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
