import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any, { isServer }: any) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
