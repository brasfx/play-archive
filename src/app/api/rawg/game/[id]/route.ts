import { NextRequest, NextResponse } from 'next/server';

const RAWG_API_KEY = process.env.RAWG_API_KEY || '';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'ID do jogo é obrigatório' },
      { status: 400 },
    );
  }

  const rawgUrl = `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`;
  const response = await fetch(rawgUrl);
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }

  return NextResponse.json(data);
}
