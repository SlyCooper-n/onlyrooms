/** @type {import('next').NextConfig} */

// PWA configuration
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
});
