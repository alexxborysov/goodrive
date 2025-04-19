import { combineReducers } from "@reduxjs/toolkit";
import { authModel } from "~/core/auth/model";
import { bucketModel } from "~/core/bucket/model";

export const reducer = combineReducers({
  [authModel.name]: authModel.reducer,
  [bucketModel.name]: bucketModel.reducer,
});
