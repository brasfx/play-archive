import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const RAWG_API_KEY = process.env.RAWG_API_KEY || '';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  if (!id) {
    return NextResponse.json(
      { error: 'ID do jogo é obrigatório' },
      { status: 400 },
    );
  }

  const cacheKey = `rawg:game:${id}`;

  const cached = await redis.get<string>(cacheKey);
  if (cached) {
    const json = typeof cached === 'string' ? JSON.parse(cached) : cached;
    return NextResponse.json(json);
  }

  const rawgUrl = `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`;
  const response = await fetch(rawgUrl, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }

  await redis.set(cacheKey, JSON.stringify(data), { ex: 21600 });

  return NextResponse.json(data);
}
