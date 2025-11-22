export async function getTwitchAccessToken() {
  const client_id = process.env.IGDB_CLIENT_ID || '';
  const client_secret = process.env.IGDB_CLIENT_SECRET || '';

  const params = new URLSearchParams({
    client_id,
    client_secret,
    grant_type: 'client_credentials',
  });

  const response = await fetch('https://id.twitch.tv/oauth2/token?' + params, {
    method: 'POST',
  });

  if (!response.ok) throw new Error('Erro ao obter access_token Twitch');

  const data = await response.json();
  // data.access_token é o que você precisa!
  return data.access_token;
}
