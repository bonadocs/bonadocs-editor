import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import listReducer from "./list/listSlice";
import methodReducer from "./method/methodSlice";
import variableReducer from "./variable/variableSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    list: listReducer,
    method: methodReducer,
    variable: variableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
