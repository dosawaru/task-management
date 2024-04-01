/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow access to get organization Image Url from clerk 
    images:{
        remotePatterns: [{
            protocol: "https",
            hostname: "img.clerk.com",
            }   
        ]
    }
};

export default nextConfig;
