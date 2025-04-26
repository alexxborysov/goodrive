import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EFFECT_META_INITIAL, EffectMeta } from '~/shared/types/effect-meta';
import { trackWhoamiEffect, whoamiEffect } from './effects/whoami';
import type { Viewer } from '~/domain/viewer';
import type { Option } from '~/shared/types/option';
import { on } from '~/kernel/store/middleware';

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

export const viewerModel = createSlice({
  name: 'viewer-model',
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
    trackWhoamiEffect(builder);
  },
});

on({
  actionCreator: whoamiEffect.fulfilled,
  effect: ({ payload: result }, { dispatch }) => {
    if (result.success) {
      const viewer = result.success.viewer;
      dispatch(viewerModel.actions.setViewer(viewer));
    }
  },
});
