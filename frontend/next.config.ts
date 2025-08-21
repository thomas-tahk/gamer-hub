// @type {import('next').NextConfig}
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/apis/:path*',
                destination: `${process.env.REST_API_URL || process.env.PUBLIC_API_URL || 'http://localhost:8080'}/apis/:path*`
            }
        ]
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    //limit size for image upload
    experimental: {serverActions: {bodySizeLimit: '2mb'}},

};

export default nextConfig;

