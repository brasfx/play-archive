import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const apiKey = process.env.TRANSLATE_API_KEY || '';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  const { text, targetLang } = await req.json();

  if (!text) {
    return Response.json({ error: 'text é obrigatório' }, { status: 400 });
  }

  const cacheKey = `translate:${targetLang}:${text}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    const json = typeof cached === 'string' ? JSON.parse(cached) : cached;
    return Response.json(json);
  }

  const translateUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(translateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLang,
      source: 'en',
      format: 'text',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json(
      { error: errorData.error.message },
      { status: 500 },
    );
  }

  const data = await response.json();

  await redis.set(cacheKey, JSON.stringify(data), { ex: 21600 });

  return NextResponse.json(data);
}
