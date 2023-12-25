/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        apiUser: 'https://v2.dlbd.vn/api/v2/app',
        apiGuest: 'https://v2.dlbd.vn/api/v3/guest',
        api: 'https://v2.dlbd.vn/api',
        apiUserV3: 'https://v2.dlbd.vn/api/v3/app',
    },
};

module.exports = nextConfig;
