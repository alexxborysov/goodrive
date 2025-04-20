import { makeNameInitials, type Viewer } from '~/domain/viewer';
import type { Option } from '~/shared/types/option';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Model } from '../model';
import { Bucket } from '~/domain/bucket';
import { Result } from '~/shared/types/result';
import { error, success } from '~/shared/lib/result';

export const whoamiEffect = createAsyncThunk<
  Result<{ buckets: Option<Array<Bucket>>; viewer: Viewer }, null>
>('whoami-effect', async () => {
  const query = await api.whoami();
  if (query.success) {
    const { buckets, viewerEmail, viewerName } = query.success;
    return success({
      viewer: {
        email: viewerEmail,
        name: viewerName,
        nameInitials: makeNameInitials(viewerName),
      } as Viewer,
      buckets,
    });
  }
  return error(null);
});

export function whoamiHandler(builder: ActionReducerMapBuilder<Model>) {
  builder.addCase(whoamiEffect.pending, (state, { meta }) => {
    state.effects.whoami.status = meta.requestStatus;
  });
  builder.addCase(whoamiEffect.fulfilled, (state, { meta, payload }) => {
    state.effects.whoami.status = meta.requestStatus;
    state.viewer = payload.success?.viewer;
  });
}
