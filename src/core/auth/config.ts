export const CONFIG = {
  get GOOGLE_SIGN_IN_PAGE_URL() {
    const ROUTE_TO_BE_REDIRECTED_ON_SIGN_IN = `/dashboard`;
    return (
      process.env.NEXT_PUBLIC_BACKEND_API_URI +
      '/auth/google-email?' +
      'success_url=' +
      ROUTE_TO_BE_REDIRECTED_ON_SIGN_IN
    );
  },
};
