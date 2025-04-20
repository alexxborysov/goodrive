declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BACKEND_API_URI: string;
    NEXT_PUBLIC_MOCK: string;
    NEXT_PUBLIC_ENV: 'staging' | 'production';
  }
}
