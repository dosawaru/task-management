/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow access to get images from clerk and unsplash
    images:{
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ]
    }
};

export default nextConfig;
