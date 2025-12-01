export function getBaseUrl() {
  // Se você quiser um override manual de dev
  if (process.env.LOCALHOST) {
    return process.env.LOCALHOST;
  }

  // Server-side (Next rodando na Vercel ou local)
  if (typeof window === 'undefined') {
    // Em produção, usa URL pública vinda da env
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }

    // fallback para dev local
    return 'http://localhost:3000';
  }

  // Client-side
  return window.location.origin;
}
