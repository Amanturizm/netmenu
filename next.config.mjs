/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: 'localhost' }, { hostname: 'netmenu-bucket.s3.eu-north-1.amazonaws.com' }],
  },
};

export default nextConfig;
