/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  async headers() {
    return [
      {
        source: "/_next/*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ]
  },
}

module.exports = nextConfig
