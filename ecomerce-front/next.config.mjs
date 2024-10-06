import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com'
      }
    ]
  }
};

export default nextConfig;
