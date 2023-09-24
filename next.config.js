/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        apiUser: 'https://v2.dlbd.vn/api/v2/app',
        apiGuest: 'https://v2.dlbd.vn/api/v2/guest',
        api: 'https://v2.dlbd.vn/api',
    },
};

module.exports = nextConfig;
