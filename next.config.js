/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wingstop-cms-uploads-595319277806.s3.us-east-1.amazonaws.com',
      },
    ],
  },
  i18n: {
    locales: ['en-QA', 'ar-QA'],
    defaultLocale: 'en-QA',
  },
}

module.exports = nextConfig
