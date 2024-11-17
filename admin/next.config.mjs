/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/gfpycoip3/ecommerce/**',
      },
    ],
  },
};

export default nextConfig;
