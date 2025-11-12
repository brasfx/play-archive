import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src'); // Substitua 'src' conforme sua estrutura
    return config;
  },
  // outras opções que você tenha
};

export default nextConfig;
