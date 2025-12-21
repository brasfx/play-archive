import { NextResponse } from 'next/server';

const RAWG_API_KEY = process.env.RAWG_API_KEY || '';

export async function GET() {
  const rawgUrl = `https://api.rawg.io/api/platforms?key=${RAWG_API_KEY}`;
  const response = await fetch(rawgUrl, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }

  return NextResponse.json(data);
}
