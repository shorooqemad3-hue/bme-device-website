/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.airtable.com",
      },
    ],
  },
};

module.exports = nextConfig;