"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { UI, fill } from "@/data/dictionary";
import { CATEGORIES, COMPANY, type CategoryId } from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { submitInquiry } from "@/lib/submitInquiry";
import {
  EMPTY_CATALOG,
  getInvalidCatalogFields,
  isCatalogFieldValid,
  type BuyerType,
  type CatalogField,
  type CatalogValues,
} from "@/lib/validation";
import { Dialog } from "./ui/Dialog";
import { FieldError, FieldLabel, TextField } from "./ui/Field";
import { AlertIcon, CheckIcon, ChevronDownIcon, CloseIcon, Spinner } from "./ui/Icons";
import { EASE_OUT } from "./ui/motion";
import { buttonOutlineDark, buttonPrimary, inputBase, inputOk } from "./ui/styles";

interface CatalogModalProps {
  open: boolean;
  onClose: () => void;
  /** Zatvara dijalog i vodi na B2B formu */
  onGoToForm: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

const BUYER_TYPES: ReadonlyArray<BuyerType> = [
  "licno",
  "maloprodaja",
  "veleprodaja",
  "horeca",
  "distribucija",
];

export function CatalogModal({ open, onClose, onGoToForm }: CatalogModalProps) {
  const { t, lang } = useLang();
  const [values, setValues] = useState<CatalogValues>(EMPTY_CATALOG);
  const [touched, setTouched] = useState<Partial<Record<CatalogField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sentEmail, setSentEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Potvrda se montira tek kada forma završi izlaznu animaciju, pa fokus
  // postavljamo u trenutku montiranja, a ne pri promeni stanja.
  const focusOnMount = useCallback((node: HTMLParagraphElement | null) => {
    node?.focus({ preventScroll: true });
  }, []);

  // Posle uspešnog slanja, sledeće otvaranje počinje od prazne forme.
  useEffect(() => {
    if (open && status === "success") {
      setValues(EMPTY_CATALOG);
      setTouched({});
      setAttempted(false);
      setStatus("idle");
    }
    // Reagujemo samo na otvaranje dijaloga.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const touch = (field: CatalogField) =>
    setTouched((current) => (current[field] ? current : { ...current, [field]: true }));

  const errorFor = (field: CatalogField): string | undefined =>
    (touched[field] || attempted) && !isCatalogFieldValid(field, values)
      ? t(UI.b2b.form.errors[field])
      : undefined;

  const toggleLine = (line: CategoryId) => {
    setValues((current) => ({
      ...current,
      lines: current.lines.includes(line)
        ? current.lines.filter((item) => item !== line)
        : [...current.lines, line],
    }));
    touch("lines");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setAttempted(true);
    const invalid = getInvalidCatalogFields(values);
    if (invalid.length > 0) {
      const first = invalid[0];
      const targetId = first === "lines" ? `katalog-linija-${CATEGORIES[0].id}` : `katalog-${first}`;
      document.getElementById(targetId)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submitInquiry({ kind: "catalog", lang, values, website });
      setSentEmail(values.email.trim());
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const submitting = status === "submitting";
  const linesError = errorFor("lines");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy="katalog-naslov"
      describedBy="katalog-opis"
      panelClassName="sm:max-w-xl"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="katalog-naslov" className="font-display text-[2.1rem] text-coal-900 sm:text-[2.4rem]">
            {status === "success" ? t(UI.catalogModal.successTitle) : t(UI.catalogModal.title)}
          </h2>
          <button
            type="button"
            aria-label={t(UI.common.close)}
            onClick={onClose}
            className="-mr-2 -mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-paper-200"
          >
            <CloseIcon />
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="success"
              role="status"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.08 }}
                className="mt-5 grid h-14 w-14 place-items-center rounded-full bg-coal-800 text-paper-50"
              >
                <CheckIcon width={28} height={28} strokeWidth={2.2} />
              </motion.span>
              <p
                id="katalog-opis"
                ref={focusOnMount}
                tabIndex={-1}
                className="mt-4 text-[1.05rem] leading-relaxed text-ink outline-none"
              >
                {fill(t(UI.catalogModal.successBody), { email: sentEmail })}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={onClose} className={buttonPrimary}>
                  {t(UI.common.close)}
                </button>
                <button type="button" onClick={onGoToForm} className={buttonOutlineDark}>
                  {t(UI.common.b2bInquiry)}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              noValidate
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p id="katalog-opis" className="mt-2 leading-relaxed text-muted">
                {t(UI.catalogModal.body)}
              </p>

              <div className="mt-6 grid gap-x-4 sm:grid-cols-2">
                <TextField
                  id="katalog-name"
                  name="name"
                  label={t(UI.catalogModal.name)}
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                  onBlur={() => touch("name")}
                  error={errorFor("name")}
                  confirmed={Boolean(touched.name) && isCatalogFieldValid("name", values)}
                />
                <TextField
                  id="katalog-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  label={t(UI.catalogModal.email)}
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={values.email}
                  onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                  onBlur={() => touch("email")}
                  error={errorFor("email")}
                  confirmed={Boolean(touched.email) && isCatalogFieldValid("email", values)}
                />
              </div>

              <div className="grid gap-x-4 sm:grid-cols-2">
                <TextField
                  id="katalog-company"
                  name="company"
                  label={t(UI.catalogModal.company)}
                  optional={t(UI.common.optional)}
                  autoComplete="organization"
                  value={values.company}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, company: event.target.value }))
                  }
                />
                <div>
                  <FieldLabel htmlFor="katalog-buyer">{t(UI.catalogModal.buyer)}</FieldLabel>
                  <div className="relative">
                    <select
                      id="katalog-buyer"
                      name="buyer"
                      value={values.buyer}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          buyer: event.target.value as BuyerType,
                        }))
                      }
                      className={`${inputBase} ${inputOk} appearance-none pr-10`}
                    >
                      {BUYER_TYPES.map((buyer) => (
                        <option key={buyer} value={buyer}>
                          {t(UI.catalogModal.buyerTypes[buyer])}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                  </div>
                  <div className="mb-2 mt-1 min-h-5" />
                </div>
              </div>

              <fieldset aria-describedby={linesError ? "katalog-lines-error" : undefined}>
                <legend className="mb-1.5 block text-sm font-semibold text-ink">
                  {t(UI.catalogModal.lines)}
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CATEGORIES.map((category) => {
                    const checked = values.lines.includes(category.id);
                    return (
                      <label key={category.id} className="cursor-pointer">
                        <input
                          type="checkbox"
                          id={`katalog-linija-${category.id}`}
                          name="lines"
                          value={category.id}
                          checked={checked}
                          onChange={() => toggleLine(category.id)}
                          className="peer sr-only"
                        />
                        <span className="flex min-h-12 items-center gap-3 rounded-lg border border-paper-300 bg-surface px-3.5 py-2 text-[0.95rem] font-medium text-ink transition-colors duration-150 hover:border-coal-700/40 peer-checked:border-coal-800 peer-checked:bg-paper-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-magnus-500">
                          <span
                            aria-hidden="true"
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded border transition-colors duration-150 ${
                              checked
                                ? "border-coal-800 bg-coal-800 text-paper-50"
                                : "border-paper-300 bg-surface text-transparent"
                            }`}
                          >
                            <CheckIcon width={14} height={14} strokeWidth={3} />
                          </span>
                          {t(category.name)}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <FieldError id="katalog-lines-error" message={linesError} />
              </fieldset>

              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="katalog-website">Website</label>
                <input
                  id="katalog-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              {status === "error" ? (
                <div
                  role="alert"
                  className="mb-4 flex gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-[0.94rem]"
                >
                  <AlertIcon className="mt-0.5 shrink-0 text-danger" />
                  <div>
                    <p className="font-bold text-danger">{t(UI.catalogModal.errorTitle)}</p>
                    <p className="mt-1 leading-relaxed text-ink">
                      {fill(t(UI.catalogModal.errorBody), { email: COMPANY.email })}
                    </p>
                    <a
                      href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Katalog i cenovnik")}`}
                      className="mt-2 inline-flex min-h-10 items-center font-semibold text-coal-700 underline underline-offset-4 hover:text-coal-900"
                    >
                      {t(UI.b2b.form.sendEmail)}
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className={`${buttonPrimary} min-w-[12.5rem] px-7`}
                >
                  {submitting ? (
                    <>
                      <Spinner />
                      {t(UI.catalogModal.submitting)}
                    </>
                  ) : (
                    t(UI.catalogModal.submit)
                  )}
                </button>
                <button
                  type="button"
                  onClick={onGoToForm}
                  className="inline-flex min-h-11 items-center text-left text-[0.92rem] font-semibold text-coal-700 underline decoration-leaf-300 underline-offset-4 hover:text-coal-900"
                >
                  {t(UI.catalogModal.toForm)}
                </button>
              </div>
              <p className="mt-4 text-[0.85rem] text-muted">{t(UI.b2b.form.privacy)}</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
