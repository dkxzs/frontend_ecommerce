import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import { combineReducers } from "redux";

const userPersistConfig = {
  key: "user",
  storage,
};

const orderPersistConfig = {
  key: "order",
  storage,
};

// Tạo reducers có persist
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  order: persistReducer(orderPersistConfig, orderReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
