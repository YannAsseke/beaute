/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // API_PROD_URL: "http://127.0.0.1:8000/api/",
    API_PROD_URL: "https://api.instant-beaute.shop/api/",
    PAYMENT_RETURN_URL: "http://localhost:3000",
    PAYMENT_CANCEL_URL: "http://localhost:3000/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.instant-beaute.shop",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
