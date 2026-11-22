/**
 * Zajedničke klase za dugmad i kontrole. Jedna definicija, isti izgled svuda.
 */

const buttonBase =
  "relative inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-[0.95rem] font-semibold leading-tight tracking-normal " +
  // Hover menja samo boju; pritisak malo umanji dugme
  "transition-[background-color,border-color,color,transform] duration-150 ease-out-expo active:scale-[0.98] " +
  "disabled:cursor-not-allowed disabled:opacity-60";

/** Glavna akcija: zelena iz logoa, na svetloj i tamnoj podlozi */
export const buttonPrimary = `${buttonBase} bg-magnus-500 text-ink hover:bg-magnus-400`;

/** Sekundarna akcija na svetloj podlozi */
export const buttonDark = `${buttonBase} bg-coal-800 text-paper-50 hover:bg-coal-700`;

/** Sekundarna akcija na tamnoj podlozi */
export const buttonOutlineLight = `${buttonBase} border border-paper-50/40 text-paper-50 hover:border-paper-50 hover:bg-paper-50/10`;

/** Tiha akcija na svetloj podlozi */
export const buttonOutlineDark = `${buttonBase} border border-coal-800/30 text-coal-800 hover:border-coal-800 hover:bg-coal-800/5`;

export const buttonSmall = "min-h-10 px-4 text-sm";

export const inputBase =
  "block w-full rounded-lg border bg-surface px-3.5 py-3 text-base text-ink placeholder:text-muted/70 " +
  "transition-[border-color,box-shadow] duration-150 focus-visible:outline-offset-0";

export const inputOk = "border-paper-300 hover:border-leaf-500 focus-visible:border-coal-700";
export const inputInvalid = "border-danger";
