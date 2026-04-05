/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.brandfetch.io", pathname: "/**" },
      { protocol: "https", hostname: "cdn-public.softwarereviews.com", pathname: "/**" },
      { protocol: "https", hostname: "images.seeklogo.com", pathname: "/**" },
      { protocol: "https", hostname: "media.licdn.com", pathname: "/**" },
      { protocol: "https", hostname: "himalayas.app", pathname: "/**" },
      { protocol: "https", hostname: "play-lh.googleusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "www.mmbb.org", pathname: "/**" },
      { protocol: "https", hostname: "cdn-1.webcatalog.io", pathname: "/**" },
      { protocol: "https", hostname: "images.credly.com", pathname: "/**" },
      { protocol: "https", hostname: "www.yunius.mx", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "yt3.googleusercontent.com", pathname: "/**" },
    ],
  },
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
};

export default nextConfig;
