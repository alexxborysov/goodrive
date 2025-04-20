import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EFFECT_META_INITIAL, EffectMeta } from '~/shared/types/effect-meta';
import { whoamiHandler } from './effects/whoami';
import type { Viewer } from '~/domain/viewer';
import type { Option } from '~/shared/types/option';

export type Model = {
  viewer: Option<Viewer>;
  effects: {
    whoami: EffectMeta;
  };
};

const initialState: Model = {
  viewer: null,
  effects: {
    whoami: EFFECT_META_INITIAL,
  },
};

export const authModel = createSlice({
  name: 'auth-model',
  initialState,
  reducers: {
    setViewer(state, action: PayloadAction<Viewer>) {
      state.viewer = action.payload;
    },
    resetViewer(state) {
      state.viewer = null;
    },
  },
  extraReducers: (builder) => {
    whoamiHandler(builder);
  },
});
