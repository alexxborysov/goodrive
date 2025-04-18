import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";

import { listener } from "./middleware";
import { reducer } from "./reducer";

export const createStore = () => {
  const _store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listener.middleware),
  });
  setupListeners(_store.dispatch);

  const extended = {
    store: _store,
    and: function (
      callback: (dispatch: typeof _store.dispatch) => Promise<void> | void,
    ) {
      callback(_store.dispatch);
      return this;
    },
  };

  return extended;
};

export const store = createStore().store;

export const dispatch = store.dispatch;
export const useAppDispatch = useDispatch<Dispatch>;
