import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {},
});

const makeStore = () => {
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
