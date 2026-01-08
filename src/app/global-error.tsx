'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Erro crítico</h1>
            <p className="text-gray-600">
              Ocorreu um erro inesperado na aplicação.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              onClick={() => reset()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Tentar novamente
            </Button>

            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-4 py-2 text-foreground transition bg-gray-200 hover:bg-gray-100"
            >
              Voltar para home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
