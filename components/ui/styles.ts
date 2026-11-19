/**
 * Zajedničke klase za dugmad i kontrole. Jedna definicija, isti izgled svuda.
 */

const buttonBase =
  "relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-lg px-5 text-[0.95rem] font-semibold leading-tight tracking-normal " +
  "transition-[border-color,color,transform] duration-300 ease-out-expo active:translate-y-px " +
  "disabled:cursor-not-allowed disabled:opacity-60 " +
  // Ispuna koja na hover ulazi sleva i izlazi udesno (samo uređaji sa mišem)
  "before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-out-expo before:content-[''] " +
  "hover:before:origin-left hover:before:scale-x-100 disabled:before:hidden";

/** Glavna akcija: žar na svetloj ili tamnoj podlozi */
export const buttonPrimary = `${buttonBase} bg-magnus-500 text-ink before:bg-magnus-400`;

/** Sekundarna akcija na svetloj podlozi */
export const buttonDark = `${buttonBase} bg-coal-800 text-paper-50 before:bg-leaf-600`;

/** Sekundarna akcija na tamnoj podlozi */
export const buttonOutlineLight = `${buttonBase} border border-paper-50/40 text-paper-50 before:bg-paper-50 hover:border-paper-50 hover:text-ink`;

/** Tiha akcija na svetloj podlozi */
export const buttonOutlineDark = `${buttonBase} border border-coal-800/30 text-coal-800 before:bg-coal-800 hover:border-coal-800 hover:text-paper-50`;

export const buttonSmall = "min-h-10 px-4 text-sm";

export const inputBase =
  "block w-full rounded-lg border bg-surface px-3.5 py-3 text-base text-ink placeholder:text-muted/70 " +
  "transition-[border-color,box-shadow] duration-150 focus-visible:outline-offset-0";

export const inputOk = "border-paper-300 hover:border-leaf-500 focus-visible:border-coal-700";
export const inputInvalid = "border-danger";
