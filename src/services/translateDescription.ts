import { getBaseUrl } from '@/utils/getBaseUrl';

export async function translateDescription(text: string, targetLang = 'pt') {
  //disable-translation for now
  // const res = await fetch(`${getBaseUrl()}/api/translate`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ text, targetLang }),
  // });

  // let data: any = null;

  // try {
  //   data = await res.json();
  // } catch {
  //   console.error('Translation error: resposta não é JSON');
  //   return text;
  // }

  // if (res.ok) {
  //   const translated =
  //     data?.data?.translations?.[0]?.translatedText ??
  //     data?.translations?.[0]?.translatedText;

  //   if (translated) return translated;
  // }

  // console.error('Translation error payload:', data);
  return text;
}
