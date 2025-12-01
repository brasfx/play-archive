import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.TRANSLATE_API_KEY || '';

export async function POST(req: NextRequest) {
  const { text, targetLang } = await req.json();

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

  // Retorne para o client
  return NextResponse.json(data);
}
