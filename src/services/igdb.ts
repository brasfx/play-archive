import { getTwitchAccessToken } from './twitch-auth';
export async function getGames() {
  const clientId = process.env.IGDB_CLIENT_ID || '';
  const accessToken =
    process.env.IGDB_ACCESS_TOKEN || (await getTwitchAccessToken());

  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': clientId!,
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    body: `
      fields id, name, cover.image_id, summary, genres.name, total_rating;
      sort total_rating desc;
      limit 12;
    `,
  });

  if (!response.ok) throw new Error('Erro na busca da IGDB');
  return await response.json();
}
