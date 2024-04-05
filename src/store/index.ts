import { configureStore } from "@reduxjs/toolkit";
import methodReducer from "./method/methodSlice";
import variableReducer from "./variable/variableSlice";
import contractReducer from "./contract/contractSlice";
import controlBoardReducer from "./controlBoard/controlBoardSlice";
export const store = configureStore({
  reducer: {
    method: methodReducer,
    variable: variableReducer,
    contract: contractReducer,
    controlBoard: controlBoardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
