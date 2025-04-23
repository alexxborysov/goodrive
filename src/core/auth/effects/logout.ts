import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { authModel } from '../model';
import { Result } from '~/shared/types/result';
import { toast } from 'sonner';

export const logoutEffect = createAsyncThunk<Result<boolean, void>, void>(
  'logout-effect',
  async (_, { dispatch }) => {
    dispatch(authModel.actions.resetViewer());
    setTimeout(() => toast.info('See you again soon!'), 1_500);

    const query = await api.logout();
    return { success: !!query.success };
  }
);
