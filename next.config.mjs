/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol:'https',
            hostname:'www.dominos.co.in',
         
        }]
    }
};

export default nextConfig;
