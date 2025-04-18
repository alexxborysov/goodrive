import { combineReducers } from "@reduxjs/toolkit";
import { authModel } from "~/core/auth/model";

export const reducer = combineReducers({
  [authModel.name]: authModel.reducer,
});
