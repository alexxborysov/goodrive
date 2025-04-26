import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { viewerModel } from '../model';
import { Result } from '~/shared/types/result';
import { toast } from 'sonner';
import { error, success } from '~/shared/lib/result';

export const logoutEffect = createAsyncThunk<
  Result<{ loggedOut: true }, { __type: 'logout-from-service-failed' }>
>('logout-effect', async (_, { dispatch }) => {
  dispatch(viewerModel.actions.resetViewer());
  setTimeout(() => toast.info('See you again soon!'), 1_500);

  const query = await api.logout();
  if (query.success) return success({ loggedOut: true });
  return error({ __type: 'logout-from-service-failed' });
});
