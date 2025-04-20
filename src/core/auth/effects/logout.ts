import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { authModel } from '../model';
import { Result } from '~/shared/types/result';
import { toast } from 'sonner';
import { delay } from '~/shared/lib/delay';

export const logoutEffect = createAsyncThunk<Result<boolean, void>, void>(
  'logout-effect',
  async (_, { dispatch }) => {
    dispatch(authModel.actions.resetViewer());
    delay(2_000).then(() => toast.info('See you again soon!'));
    const query = await api.logout();
    return { success: !!query.success };
  }
);
