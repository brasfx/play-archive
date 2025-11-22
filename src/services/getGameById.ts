import { getTwitchAccessToken } from './twitch-auth';

export async function getGameById(id: string) {
  const clientId =
    process.env.IGDB_CLIENT_ID || 'lnwncxzakaoklc54df9wpgpy5qj64r';
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
        fields *;
        where id = ${id};
      `,
  });
  const [game] = await response.json();
  return game;
}
