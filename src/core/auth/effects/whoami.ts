import { makeNameInitials, type Viewer } from "~/domain/viewer";
import type { Option } from "~/shared/types/option";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { Model } from "../model";

export const whoamiEffect = createAsyncThunk<Option<Viewer>, void>(
  "whoami-effect",
  async () => {
    const { success: viewer } = await api.whoami();
    if (viewer) {
      return {
        ...viewer,
        nameInitials: makeNameInitials(viewer.name),
      };
    }
  },
);

export function whoamiHandler(builder: ActionReducerMapBuilder<Model>) {
  builder.addCase(whoamiEffect.pending, (state, { meta }) => {
    state.effects.whoami.status = meta.requestStatus;
  });
  builder.addCase(whoamiEffect.fulfilled, (state, { meta, payload }) => {
    state.effects.whoami.status = meta.requestStatus;
    state.viewer = payload;
  });
}
