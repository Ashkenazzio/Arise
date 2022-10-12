/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // redirects: async () => {
  //   if (localStorage.anonymous === true || localStorage.auth === true) {
  //     return [
  //       {
  //         source: '/',
  //         destination: '/start',
  //         permanent: true,
  //       },
  //     ];
  //   }
  //   return [
  //     {
  //       source: '/',
  //       destination: '/login',
  //       permanent: true,
  //     },
  //   ];
  // },
  swcMinify: true,
};

module.exports = nextConfig;
