import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONFIG } from '../config';

export const openSignInPageEffect = createAsyncThunk(
  'open-sign-in-page-effect',
  () => {
    window.location.assign(CONFIG.GOOGLE_SIGN_IN_PAGE_URL);
  }
);
