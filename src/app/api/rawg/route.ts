import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const RAWG_API_KEY = process.env.RAWG_API_KEY || '';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const params = url.searchParams;

  const hasSearch = Boolean(params.get('search')?.trim());
  const ttlSeconds = hasSearch ? 120 : 3600;

  const rawgParams = new URLSearchParams();
  for (const [name, value] of params) {
    if (name !== 'key') rawgParams.append(name, value);
  }
  rawgParams.append('key', RAWG_API_KEY);
  const cacheKey = `rawg:search:${rawgParams.toString()}`;

  const cached = await redis.get<string>(cacheKey);
  if (cached) {
    const json = typeof cached === 'string' ? JSON.parse(cached) : cached;
    return NextResponse.json(json);
  }

  const rawgUrl = `https://api.rawg.io/api/games?${rawgParams.toString()}`;

  const response = await fetch(rawgUrl, { cache: 'no-store' });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }

  const payload = { results: data?.results };
  await redis.set(cacheKey, JSON.stringify(payload), {
    ex: ttlSeconds,
  });

  return NextResponse.json({ results: data?.results });
}
