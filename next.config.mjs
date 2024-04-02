/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['https://6bsnpnbx-3000.brs.devtunnels.ms', 'localhost:3000']
    }
  }
};

export default nextConfig;
