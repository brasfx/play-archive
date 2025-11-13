import type { NextConfig } from 'next';
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src'); // Substitua 'src' conforme sua estrutura
    return config;
  },
  // outras opções que você tenha
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
