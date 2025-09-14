/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // 👈 allow Cloudinary
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
