import { configureStore } from "@reduxjs/toolkit";
import methodReducer from "./method/methodSlice";
import variableReducer from "./variable/variableSlice";
import contractReducer from "./contract/contractSlice";
import controlBoardReducer from "./controlBoard/controlBoardSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  blocklist: ["controlBoard"],
};
const methodPersistConfig = {
  key: "method",
  storage,
  // safelist: ["methodItem", "methodDisplayData"],
};

const contractPersistConfig = {
  key: "contract",
  storage,
  safelist: ["currentContract"],
};

const rootReducer = combineReducers({
  contract: persistReducer(contractPersistConfig, contractReducer),
  method: persistReducer(methodPersistConfig, methodReducer),
  variable: variableReducer,
  controlBoard: controlBoardReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
