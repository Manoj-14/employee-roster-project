import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "./slices/userSlice";
import rosterSliceReducer from "./slices/rosterSlice";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

const userPersistentConfig = {
  key: "user",
  storage,
};
const rosterPersistentConfig = {
  key: "roster",
  storage,
};

const userPersistedReducer = persistReducer(
  userPersistentConfig,
  userSliceReducer
);
const rosterPersistedReducer = persistReducer(
  rosterPersistentConfig,
  rosterSliceReducer
);

export const store = configureStore({
  reducer: { user: userPersistedReducer, roster: rosterPersistedReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export const persistor = persistStore(store);
