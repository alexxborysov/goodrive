import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  experimental: {
    reactCompiler: true,
  },
  allowedDevOrigins: ['stage.goodrive.services'],
};

export default nextConfig;
