/**
 * Zajedničke klase za dugmad i kontrole. Jedna definicija, isti izgled svuda.
 */

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-6 text-[0.95rem] font-semibold leading-tight tracking-normal " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out-expo active:scale-[0.98] " +
  "disabled:cursor-not-allowed disabled:opacity-60";

/** Glavna akcija: jedino mesto gde stoji zelena iz logoa */
export const buttonPrimary = `${buttonBase} bg-magnus-500 text-ink hover:bg-magnus-400`;

/** Sekundarna akcija na svetloj podlozi */
export const buttonDark = `${buttonBase} bg-coal-800 text-paper-50 hover:bg-coal-700`;

/** Sekundarna akcija na tamnoj podlozi */
export const buttonOutlineLight = `${buttonBase} border border-paper-50/30 text-paper-50 hover:border-paper-50/60 hover:bg-paper-50/8`;

/** Tiha akcija na svetloj podlozi */
export const buttonOutlineDark = `${buttonBase} border border-coal-800/20 bg-surface text-coal-800 hover:border-coal-800/45 hover:bg-paper-100`;

export const buttonSmall = "min-h-10 px-4 text-sm";

export const inputBase =
  "block w-full rounded-[10px] border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 " +
  "transition-[border-color,box-shadow] duration-150 focus-visible:outline-offset-0";

export const inputOk = "border-paper-300 hover:border-coal-700/40 focus-visible:border-coal-700";
export const inputInvalid = "border-danger";
