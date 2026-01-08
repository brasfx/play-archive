'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Algo deu errado
          </h2>
          <p className="text-muted-foreground">
            Não foi possível carregar esta página.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Tentar novamente
          </button>

          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 dark:text-background transition dark:bg-gray-300 hover:bg-gray-100"
          >
            Voltar para home
          </Link>
        </div>
      </div>
    </div>
  );
}
