import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

import { listener } from './middleware';
import { reducer } from './reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

setupListeners(store.dispatch);

export const dispatch = store.dispatch;
export const useAppDispatch = useDispatch<Dispatch>;
