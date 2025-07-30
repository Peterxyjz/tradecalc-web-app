import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.vietqr.io",
        pathname: "/**",
      },
      {
        hostname: "api.qrserver.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
