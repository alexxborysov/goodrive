import { combineReducers } from '@reduxjs/toolkit';
import { viewerModel } from '~/core/viewer/model';
import { bucketModel } from '~/core/bucket/model';

export const reducer = combineReducers({
  [viewerModel.name]: viewerModel.reducer,
  [bucketModel.name]: bucketModel.reducer,
});
