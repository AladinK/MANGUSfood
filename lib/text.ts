/**
 * Priprema tekst za pretragu: mala slova, bez dijakritika.
 * „Ćevapi“, „cevapi“ i „ĆEVAPI“ daju isti rezultat; „đ“ i „dj“ su izjednačeni.
 */
export const normalizeForSearch = (value: string): string =>
  value
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/dj/g, "d")
    .replace(/\s+/g, " ")
    .trim();
