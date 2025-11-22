export function getBaseUrl() {
  // Local development override
  if (process.env.LOCALHOST) {
    return process.env.LOCALHOST;
  }

  // Server-side
  if (typeof window === 'undefined') {
    return 'http://localhost:3000';
  }

  // Client-side
  return window.location.origin;
}
