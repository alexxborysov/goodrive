import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { makeNameInitials, type Viewer } from '~/domain/viewer';
import type { Model } from '../model';
import type { Bucket } from '~/domain/bucket';
import type { Result } from '~/shared/types/result';
import type { Option } from '~/shared/types/option';
import { error, success } from '~/shared/lib/result';

export const whoamiEffect = createAsyncThunk<
  Result<
    { buckets: Option<Array<Bucket>>; viewer: Viewer },
    { __type: 'viewer-not-authorized' }
  >
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
  return error({ __type: 'viewer-not-authorized' });
});

export function trackWhoamiEffect(builder: ActionReducerMapBuilder<Model>) {
  builder.addCase(whoamiEffect.pending, (state, { meta }) => {
    state.effects.whoami.status = meta.requestStatus;
  });
  builder.addCase(whoamiEffect.fulfilled, (state, { meta }) => {
    state.effects.whoami.status = meta.requestStatus;
  });
}
