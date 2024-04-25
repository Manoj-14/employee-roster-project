import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

const userPersistentConfig = {
  key: "user",
  storage,
};

const userPersistedReducer = persistReducer(
  userPersistentConfig,
  userSliceReducer
);

export const store = configureStore({
  reducer: { user: userPersistedReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export const persistor = persistStore(store);
