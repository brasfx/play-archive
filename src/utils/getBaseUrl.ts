export function getBaseUrl() {
  if (process.env.LOCALHOST) {
    return process.env.LOCALHOST;
  }

  if (typeof window === 'undefined') {
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }

    return 'http://localhost:3000';
  }

  return window.location.origin;
}
