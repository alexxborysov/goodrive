export const CONFIG = {
  get GOOGLE_SIGN_IN_PAGE_URL() {
    const ON_SUCCESS_SIGN_IN_URL = `${window.location.origin}/dashboard`;

    return (
      process.env.NEXT_PUBLIC_BACKEND_API_URI +
      "/auth/google-email?" +
      "success_url=" +
      ON_SUCCESS_SIGN_IN_URL
    );
  },
};
