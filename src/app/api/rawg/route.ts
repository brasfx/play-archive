import { NextRequest, NextResponse } from 'next/server';

const RAWG_API_KEY = process.env.RAWG_API_KEY || '';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const params = url.searchParams;

  const rawgParams = new URLSearchParams();
  for (const [name, value] of params) {
    if (name !== 'key') rawgParams.append(name, value);
  }
  rawgParams.append('key', RAWG_API_KEY);

  const rawgUrl = `https://api.rawg.io/api/games?${rawgParams.toString()}`;

  const response = await fetch(rawgUrl);

  const data = await response.json();

  return NextResponse.json({ results: data?.results });
}
