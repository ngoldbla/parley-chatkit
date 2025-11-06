import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.platform.openai.com https://cdn.openai.com https://chatgpt.com https://sentinel.openai.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https: http: data:",
              "connect-src 'self' https://chatgpt.com https://sentinel.openai.com https://*.oaiusercontent.com https://api.openai.com https://cdn.openai.com https://cdn.platform.openai.com https://browser-intake-datadoghq.com https://api-js.mixpanel.com",
              "frame-src 'self' https://chatgpt.com https://sentinel.openai.com https://cdn.platform.openai.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
            ].join("; "),
          },
          {
            key: "Permissions-Policy",
            value: 'fullscreen=(self "https://sentinel.openai.com" "https://chatgpt.com")',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
