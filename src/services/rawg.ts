import { Filters } from '@/stores/useAppStore';
import { getBaseUrl } from '@/utils/getBaseUrl';

export async function getRawGames(filters: Filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/rawg?${params.toString()}`;

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) throw new Error('Erro na busca da RAWG');

  const data = await response.json();
  return data.results;
}

export async function getGameById(id: string) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/rawg/game/${id}`;

  const response = await fetch(url, { cache: 'no-store' });

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {}

  if (!response.ok) {
    console.error('Erro RAWG rota interna', {
      status: response.status,
      statusText: response.statusText,
      body,
    });
    throw new Error('Erro na busca da RAWG');
  }

  return body;
}

export async function getGameScreenshots(id: string) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/rawg/screenshots/${id}`;

  const response = await fetch(url, { cache: 'no-store' });

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {}

  if (!response.ok) {
    console.error('Erro RAWG rota interna', {
      status: response.status,
      statusText: response.statusText,
      body,
    });
    throw new Error('Erro na busca da RAWG');
  }

  return body;
}
