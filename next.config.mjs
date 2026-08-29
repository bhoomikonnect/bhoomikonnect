const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;

function getDirectusRemotePattern() {
  if (!directusUrl) {
    return [];
  }

  try {
    const url = new URL(directusUrl);

    return [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: "/assets/**"
      }
    ];
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: getDirectusRemotePattern()
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
        ]
      }
    ];
  }
};

export default nextConfig;
