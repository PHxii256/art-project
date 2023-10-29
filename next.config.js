/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'i.pinimg.com',
              port: '',
              pathname: '/564x/**',
            },
          ],
    }
}

module.exports = nextConfig
