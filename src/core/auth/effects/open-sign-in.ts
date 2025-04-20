import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONFIG } from '../config';

export const openSignInEffect = createAsyncThunk('open-sign-in-effect', () => {
  window.location.assign(CONFIG.GOOGLE_SIGN_IN_PAGE_URL);
});
