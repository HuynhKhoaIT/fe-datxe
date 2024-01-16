const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        apiUser: 'https://v2.dlbd.vn/api/v2/app',
        apiGuest: 'https://v2.dlbd.vn/api/v3/guest',
        api: 'https://v2.dlbd.vn/api',
        apiUserV3: 'https://v2.dlbd.vn/api/v3/app',
        urlBase: 'https://oga.datxe.com/'
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

module.exports = withBundleAnalyzer(nextConfig)