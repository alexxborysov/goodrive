import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Bucket, BucketLinkedEmail } from '~/domain/bucket';
import { on } from '~/kernel/store/middleware';
import { whoamiEffect } from '../viewer/effects/whoami';
import { Option } from '~/shared/types/option';

export type Model = {
  buckets: Option<Array<Bucket>>;
};

const initialState: Model = {
  buckets: null,
};

export const bucketModel = createSlice({
  name: 'bucket-model',
  initialState,
  reducers: {
    setBuckets(state, { payload }: PayloadAction<Option<Array<Bucket>>>) {
      state.buckets = payload;
    },
    deleteBucketByLinkedEmail(
      state,
      { payload: linkedEmail }: PayloadAction<BucketLinkedEmail>
    ) {
      const idx = state.buckets?.findIndex(
        (bucket) => bucket.linkedEmail === linkedEmail
      );
      if (idx !== -1 && idx) {
        state.buckets?.splice(idx, 1);
      }
    },
  },
});

on({
  actionCreator: whoamiEffect.fulfilled,
  effect: ({ payload: result }, { dispatch }) => {
    const buckets = result.success?.buckets;
    dispatch(bucketModel.actions.setBuckets(buckets));
  },
});
