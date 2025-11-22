import { getBaseUrl } from '@/utils/getBaseUrl';

export async function translateDescription(text: string, targetLang = 'pt') {
  const res = await fetch(`${getBaseUrl()}/api/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang }),
  });

  const { data } = await res.json();

  if (res.ok) return data.translations[0].translatedText;

  console.error('Translation error:', data.error);
  return text; // fallback para texto original
}
