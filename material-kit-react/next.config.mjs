import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        pathname: '/*'
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/*'
      }
    ],
  },
};

export default config;
