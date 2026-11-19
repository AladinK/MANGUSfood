"use client";

import { useSyncExternalStore } from "react";

/**
 * Stanje uvoda: uvodna zavesa javlja kada počne da se diže, a početni ekran
 * tek tada pokreće svoje otkrivanje. Tako se naslov ne animira iza zavese.
 */
let ready = false;
const listeners = new Set<() => void>();

export const markIntroReady = (): void => {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** `true` od trenutka kada uvod preda scenu stranici */
export const useIntroReady = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );
