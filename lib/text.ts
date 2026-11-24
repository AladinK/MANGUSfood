/**
 * Priprema tekst za pretragu: mala slova, bez dijakritika.
 * „Ćevapi“, „cevapi“ i „ĆEVAPI“ daju isti rezultat; „đ“ i „dj“ su izjednačeni,
 * kao i nemačko „ß“ i „ss“ („Käse“ se nalazi i kao „kase“).
 */
export const normalizeForSearch = (value: string): string =>
  value
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/dj/g, "d")
    .replace(/\s+/g, " ")
    .trim();
