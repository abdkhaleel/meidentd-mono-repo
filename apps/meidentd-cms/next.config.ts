import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['khaleel-editor'],

  typescript: {
    ignoreBuildErrors: true,
  },
  
  
  devIndicators: false, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', 
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
      }
    ],
  },
};

export default nextConfig;