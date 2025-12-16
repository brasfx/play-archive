export default function getLabelByPlatform(platform: string) {
  switch (platform) {
    case 'pc':
      return 'PC';
    case 'ps':
      return 'PlayStation';
    case 'xbox':
      return 'Xbox';
    case 'switch':
      return 'Nintendo Switch';
    case 'mobile':
      return 'Mobile';
    default:
      return platform;
  }
}
