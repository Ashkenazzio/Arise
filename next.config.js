/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/start',
        permanent: true,
      },
    ];
  },
  swcMinify: true,
};

module.exports = nextConfig;
