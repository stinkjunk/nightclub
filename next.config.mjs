/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/file-bucket/**",
      },
    ],
    unoptimized: true, // next won't allow loading from localhost if images are optimized - incredibly annoying
    //LET ME SCAN THE USERS LOCAL PORTS THROUGH THE SERVER SIDE IMAGE OPTIMIZATION! I CAN BE TRUSTED WITH THEIR
    //DATA! 
  },
};

export default nextConfig;
