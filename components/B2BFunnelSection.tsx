"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { UI, fill } from "@/data/dictionary";
import {
  B2B_BENEFITS,
  B2B_SEGMENTS,
  COMPANY,
  COOPERATION_TYPES,
  LINKS,
  SECTION_MEDIA,
  getProduct,
  navLabel,
  type SegmentIcon,
} from "@/data/magnusData";
import { useLang } from "@/lib/i18n";
import { submitInquiry } from "@/lib/submitInquiry";
import {
  EMPTY_INQUIRY,
  getInvalidInquiryFields,
  isInquiryFieldValid,
  type InquiryField,
  type InquiryValues,
} from "@/lib/validation";
import { ExternalLink } from "./ui/ExternalLink";
import { FieldError, TextAreaField, TextField } from "./ui/Field";
import {
  AlertIcon,
  CheckIcon,
  CloseIcon,
  ExternalIcon,
  GlobeIcon,
  InstagramIcon,
  Spinner,
} from "./ui/Icons";
import { EASE_OUT, VIEWPORT, riseItem, staggerParent } from "./ui/motion";
import { Photo } from "./ui/Photo";
import { ProductGlyph } from "./ui/ProductGlyph";
import { RevealText } from "./ui/RevealText";
import { SectionLabel } from "./ui/SectionLabel";
import { buttonOutlineDark, buttonPrimary } from "./ui/styles";

export interface InquiryPrefill {
  productId: string;
  /** Menja se pri svakom kliku, da isti proizvod može ponovo da popuni formu */
  nonce: number;
}

interface B2BFunnelSectionProps {
  prefill: InquiryPrefill | null;
  onClearPrefill: () => void;
}

/* ------------------------------------------------------------------ */
/* Ikone segmenata                                                     */
/* ------------------------------------------------------------------ */

const SEGMENT_PATHS: Record<SegmentIcon, string> = {
  retail: "M5 9h22l-2.5 12h-17L5 9zm0 0L4 5H1.5M11 26.5a1.5 1.5 0 1 0 .01 0M22 26.5a1.5 1.5 0 1 0 .01 0M11 14v3M16 14v3M21 14v3",
  wholesale: "M4 27h24M6 27V17h9v10M17 27V17h9v10M11.5 17V8h9v9M9 21h3M20 21h3M14.5 12h3",
  horeca: "M4 24h24M6.5 24a9.5 9.5 0 0 1 19 0M16 14.5V12M14 11h4M2.5 27.5h27",
  export: "M2 9h16v13H2zM18 13h6l5 5v4H18M7.5 25.5a2.5 2.5 0 1 0 .01 0M23 25.5a2.5 2.5 0 1 0 .01 0M5 13h6M5 17h4",
};

function SegmentGlyph({ icon }: { icon: SegmentIcon }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="34"
      height="34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="text-leaf-600"
    >
      <path d={SEGMENT_PATHS[icon]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Forma                                                               */
/* ------------------------------------------------------------------ */

type Status = "idle" | "submitting" | "success" | "error";

interface SentInquiry {
  values: InquiryValues;
  productId: string | null;
}

function InquiryForm({ prefill, onClearPrefill }: B2BFunnelSectionProps) {
  const { t, lang } = useLang();
  const [values, setValues] = useState<InquiryValues>(EMPTY_INQUIRY);
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState<SentInquiry | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [website, setWebsite] = useState("");

  const autoMessage = useRef("");
  const focusNameNext = useRef(false);

  // Potvrda se montira tek kada forma završi izlaznu animaciju. Tada na nju
  // prebacujemo fokus i, ako je ostala iznad vidljivog dela, vraćamo je u prikaz.
  const focusSuccess = useCallback((node: HTMLHeadingElement | null) => {
    if (!node) return;
    node.focus({ preventScroll: true });
    const card = document.getElementById("b2b-forma");
    if (card && card.getBoundingClientRect().top < 72) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }, []);

  // Isto važi za povratak na formu: prvo polje dobija fokus kada se forma montira.
  const focusNameOnMount = useCallback((node: HTMLInputElement | null) => {
    if (node && focusNameNext.current) {
      focusNameNext.current = false;
      node.focus();
    }
  }, []);

  const product = productId ? getProduct(productId) : undefined;

  // „Zatraži ponudu za ovaj proizvod“ popunjava poruku i označava proizvod.
  // Poruku koju je posetilac sam napisao ne diramo.
  useEffect(() => {
    if (!prefill) return;
    const selected = getProduct(prefill.productId);
    if (!selected) return;

    const message = fill(t(UI.b2b.form.prefillMessage), { product: t(selected.name) });
    setProductId(selected.id);
    setStatus((current) => (current === "success" ? "idle" : current));
    setValues((current) =>
      current.message.trim() === "" || current.message === autoMessage.current
        ? { ...current, message }
        : current,
    );
    autoMessage.current = message;
    // Jezik ne treba da ponovo popuni poruku; reagujemo samo na novi klik.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  const setField = <K extends InquiryField>(field: K, value: InquiryValues[K]) =>
    setValues((current) => ({ ...current, [field]: value }));

  const touch = (field: InquiryField) =>
    setTouched((current) => (current[field] ? current : { ...current, [field]: true }));

  const errorFor = (field: InquiryField): string | undefined =>
    (touched[field] || attempted) && !isInquiryFieldValid(field, values)
      ? t(UI.b2b.form.errors[field])
      : undefined;

  const isConfirmed = (field: InquiryField): boolean =>
    Boolean(touched[field]) && isInquiryFieldValid(field, values);

  const removeProduct = () => {
    setProductId(null);
    onClearPrefill();
    if (values.message === autoMessage.current) setField("message", "");
    autoMessage.current = "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setAttempted(true);
    const invalid = getInvalidInquiryFields(values);
    if (invalid.length > 0) {
      const first = invalid[0];
      const targetId = first === "type" ? `b2b-type-${COOPERATION_TYPES[0].id}` : `b2b-${first}`;
      document.getElementById(targetId)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submitInquiry({ kind: "b2b", lang, values, productId, website });
      setSent({ values, productId });
      setValues(EMPTY_INQUIRY);
      setTouched({});
      setAttempted(false);
      setProductId(null);
      autoMessage.current = "";
      onClearPrefill();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const startOver = () => {
    focusNameNext.current = true;
    setSent(null);
    setStatus("idle");
  };

  const submitting = status === "submitting";
  const hasErrors = attempted && getInvalidInquiryFields(values).length > 0;
  const typeError = errorFor("type");
  const sentProduct = sent?.productId ? getProduct(sent.productId) : undefined;
  const sentType = sent
    ? COOPERATION_TYPES.find((option) => option.id === sent.values.type)
    : undefined;

  return (
    <div
      id="b2b-forma"
      className="scroll-mt-4 rounded-3xl border border-paper-200 bg-surface p-5 shadow-lift sm:p-8"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" && sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            role="status"
          >
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
              className="grid h-14 w-14 place-items-center rounded-full bg-coal-800 text-paper-50"
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT }}
                />
              </svg>
            </motion.span>
            <h3
              ref={focusSuccess}
              tabIndex={-1}
              className="font-display mt-5 text-[2.2rem] text-coal-900 outline-none"
            >
              {t(UI.b2b.form.successTitle)}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">
              {fill(t(UI.b2b.form.successBody), {
                name: sent.values.name,
                email: sent.values.email,
              })}
            </p>

            <div className="mt-6 rounded-xl border border-paper-200 bg-paper-50 p-4 sm:p-5">
              <h4 className="font-condensed text-[1.02rem] font-bold text-coal-900">
                {t(UI.b2b.form.summaryTitle)}
              </h4>
              <dl className="mt-2 text-[0.94rem]">
                {[
                  [t(UI.b2b.form.name), sent.values.name],
                  [t(UI.b2b.form.company), sent.values.company],
                  [t(UI.b2b.form.email), sent.values.email],
                  [t(UI.b2b.form.phone), sent.values.phone],
                  [t(UI.b2b.form.type), sentType ? t(sentType.label) : ""],
                  ...(sentProduct ? [[t(UI.b2b.form.productTag), t(sentProduct.name)]] : []),
                  [t(UI.b2b.form.message), sent.values.message],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.05, ease: EASE_OUT }}
                    className="grid gap-x-4 border-b border-paper-200 py-2 last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)]"
                  >
                    <dt className="text-muted">{label}</dt>
                    <dd className="break-words font-medium text-ink">{value}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>

            <button type="button" onClick={startOver} className={`${buttonOutlineDark} mt-6`}>
              {t(UI.b2b.form.again)}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="b2b-forma-naslov"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <h3 id="b2b-forma-naslov" className="font-display text-[2rem] text-coal-900">
              {t(UI.b2b.form.title)}
            </h3>
            <p className="mt-1.5 text-[0.95rem] text-muted">{t(UI.b2b.form.lead)}</p>

            <div className="mt-6 grid gap-x-4 sm:grid-cols-2">
              <TextField
                id="b2b-name"
                inputRef={focusNameOnMount}
                name="name"
                label={t(UI.b2b.form.name)}
                autoComplete="name"
                required
                value={values.name}
                onChange={(event) => setField("name", event.target.value)}
                onBlur={() => touch("name")}
                error={errorFor("name")}
                confirmed={isConfirmed("name")}
              />
              <TextField
                id="b2b-company"
                name="company"
                label={t(UI.b2b.form.company)}
                autoComplete="organization"
                required
                value={values.company}
                onChange={(event) => setField("company", event.target.value)}
                onBlur={() => touch("company")}
                error={errorFor("company")}
                confirmed={isConfirmed("company")}
              />
              <TextField
                id="b2b-email"
                name="email"
                type="email"
                inputMode="email"
                label={t(UI.b2b.form.email)}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                value={values.email}
                onChange={(event) => setField("email", event.target.value)}
                onBlur={() => touch("email")}
                error={errorFor("email")}
                confirmed={isConfirmed("email")}
              />
              <TextField
                id="b2b-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                label={t(UI.b2b.form.phone)}
                autoComplete="tel"
                placeholder="+381 6x xxx xxxx"
                required
                value={values.phone}
                onChange={(event) => setField("phone", event.target.value)}
                onBlur={() => touch("phone")}
                error={errorFor("phone")}
                confirmed={isConfirmed("phone")}
              />
            </div>

            <fieldset aria-describedby={typeError ? "b2b-type-error" : undefined}>
              <legend className="mb-1.5 block text-sm font-semibold text-ink">
                {t(UI.b2b.form.type)}
              </legend>
              <div className="flex flex-wrap gap-2">
                {COOPERATION_TYPES.map((option) => (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      id={`b2b-type-${option.id}`}
                      value={option.id}
                      checked={values.type === option.id}
                      onChange={() => {
                        setField("type", option.id);
                        touch("type");
                      }}
                      required
                      className="peer sr-only"
                    />
                    <span className="inline-flex min-h-11 items-center rounded-full border border-paper-300 bg-surface px-4 text-[0.92rem] font-medium text-ink transition-colors duration-150 hover:border-leaf-500 peer-checked:border-coal-800 peer-checked:bg-coal-800 peer-checked:text-paper-50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-magnus-500">
                      {t(option.label)}
                    </span>
                  </label>
                ))}
              </div>
              <FieldError id="b2b-type-error" message={typeError} />
            </fieldset>

            <TextAreaField
              id="b2b-message"
              name="message"
              label={t(UI.b2b.form.message)}
              placeholder={t(UI.b2b.form.messagePlaceholder)}
              required
              rows={5}
              value={values.message}
              onChange={(event) => setField("message", event.target.value)}
              onBlur={() => touch("message")}
              error={errorFor("message")}
              before={
                <AnimatePresence initial={false}>
                  {product ? (
                    <motion.p
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className="mb-2 inline-flex max-w-full items-center gap-1 rounded-full bg-leaf-100 py-1 pl-3 pr-1 text-[0.86rem] text-coal-800"
                    >
                      <span className="truncate">
                        {t(UI.b2b.form.productTag)}: <strong>{t(product.name)}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={removeProduct}
                        aria-label={t(UI.b2b.form.removeProduct)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-leaf-200"
                      >
                        <CloseIcon width={15} height={15} />
                      </button>
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              }
            />

            {/* Polje-zamka za botove: ljudi ga ne vide i ne mogu da ga fokusiraju */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="b2b-website">Website</label>
              <input
                id="b2b-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <AnimatePresence initial={false}>
              {status === "error" ? (
                <motion.div
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="mb-4 flex gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-[0.94rem]">
                    <AlertIcon className="mt-0.5 shrink-0 text-danger" />
                    <div>
                      <p className="font-bold text-danger">{t(UI.b2b.form.errorTitle)}</p>
                      <p className="mt-1 leading-relaxed text-ink">
                        {fill(t(UI.b2b.form.errorBody), { email: COMPANY.email })}
                      </p>
                      <a
                        href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("B2B upit")}&body=${encodeURIComponent(values.message)}`}
                        className="mt-2 inline-flex min-h-10 items-center font-semibold text-coal-700 underline underline-offset-4 hover:text-coal-900"
                      >
                        {t(UI.b2b.form.sendEmail)}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className={`${buttonPrimary} min-w-[12.5rem] px-7`}
              >
                {submitting ? (
                  <>
                    <Spinner />
                    {t(UI.b2b.form.submitting)}
                  </>
                ) : (
                  t(UI.b2b.form.submit)
                )}
              </button>
              <p
                className={`text-[0.85rem] leading-snug ${hasErrors ? "font-medium text-danger" : "text-muted"}`}
                aria-live="polite"
              >
                {hasErrors ? t(UI.b2b.form.fixErrors) : t(UI.b2b.form.privacy)}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sekcija                                                             */
/* ------------------------------------------------------------------ */

export function B2BFunnelSection({ prefill, onClearPrefill }: B2BFunnelSectionProps) {
  const { t } = useLang();

  return (
    <section
      id="b2b"
      aria-labelledby="b2b-naslov"
      className="sheet-top bg-paper-100 pb-[calc(var(--space-2xl)+var(--sheet-radius))] pt-[var(--space-2xl)]"
    >
      <div className="container-page grid gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={staggerParent}>
            <motion.div variants={riseItem}>
              <SectionLabel>{t(navLabel("b2b"))}</SectionLabel>
            </motion.div>
            <h2
              id="b2b-naslov"
              className="font-display mt-4 text-[clamp(2.4rem,6vw,4.5rem)] text-coal-900"
            >
              <RevealText text={t(UI.b2b.title)} />
            </h2>
            <motion.p
              variants={riseItem}
              className="mt-5 max-w-[36rem] text-[1.06rem] leading-relaxed text-muted"
            >
              {t(UI.b2b.intro)}
            </motion.p>
          </motion.div>

          {/* HoReCa: originalna fotografija i naslov sa početne stranice */}
          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative mt-8 overflow-hidden rounded-3xl text-paper-50"
          >
            <Photo
              src={SECTION_MEDIA.horeca}
              alt={t(UI.b2b.horecaAlt)}
              sizes="(min-width: 1024px) 46vw, 92vw"
              reveal
              parallax={7}
              className="aspect-[4/3] bg-coal-800 sm:aspect-[16/9]"
            >
              <ProductGlyph
                kind="horeca"
                accent="#c9b58e"
                className="mx-auto mt-[3%] h-[62%] w-[62%] opacity-80"
              />
            </Photo>
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(18_18_17/0.94)_25%,rgb(18_18_17/0.6)_66%,transparent)] p-5 pt-16 sm:p-6 sm:pt-20">
              <p className="font-display max-w-[27rem] text-[clamp(1.4rem,3.6vw,1.95rem)]">
                {t(UI.b2b.horecaCaption)}
              </p>
            </figcaption>
          </motion.figure>

          <ul
            aria-label={t(UI.b2b.segmentsLabel)}
            className="mt-10 grid overflow-hidden rounded-3xl border border-paper-300 bg-surface sm:grid-cols-2"
          >
            {B2B_SEGMENTS.map((segment, index) => (
              <motion.li
                key={segment.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: EASE_OUT }}
                className={`border-paper-300 p-5 sm:p-6 ${index > 0 ? "border-t" : ""} ${
                  index === 1 ? "sm:border-t-0" : ""
                } ${index % 2 === 1 ? "sm:border-l" : ""}`}
              >
                <SegmentGlyph icon={segment.icon} />
                <h3 className="font-display mt-3 text-[1.55rem] text-coal-900">
                  {segment.id === "horeca" ? (
                    // Zvanični znak „Magnus HoReCa“
                    <Image
                      src={SECTION_MEDIA.logoHoreca}
                      alt="Magnus HoReCa"
                      width={131}
                      height={15}
                      unoptimized
                      className="h-[1.15rem] w-auto"
                    />
                  ) : (
                    t(segment.title)
                  )}
                </h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{t(segment.body)}</p>
              </motion.li>
            ))}
          </ul>

          <h3 className="font-condensed mt-10 text-[1.15rem] font-bold text-coal-900">
            {t(UI.b2b.benefitsTitle)}
          </h3>
          <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {B2B_BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: EASE_OUT }}
                className="flex gap-3"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coal-800 text-paper-50">
                  <CheckIcon width={14} height={14} strokeWidth={2.6} />
                </span>
                <div>
                  <dt className="font-semibold text-ink">{t(benefit.title)}</dt>
                  <dd className="mt-0.5 text-[0.95rem] leading-relaxed text-muted">
                    {t(benefit.body)}
                  </dd>
                </div>
              </motion.div>
            ))}
          </dl>

          <div className="mt-10 border-t border-paper-300 pt-6">
            <Image
              src={SECTION_MEDIA.logoCompany}
              alt="Magnus Food Industry"
              width={510}
              height={122}
              unoptimized
              className="mb-5 h-11 w-auto"
            />
            <p className="text-[0.95rem] text-muted">{t(UI.b2b.channelsNote)}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              <li>
                <ExternalLink
                  href={LINKS.site}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-coal-800/25 bg-surface py-1.5 pl-3.5 pr-4 text-[0.92rem] font-semibold text-coal-800 transition-colors hover:border-coal-800/60"
                >
                  <GlobeIcon width={18} height={18} />
                  {LINKS.siteLabel}
                  <ExternalIcon width={15} height={15} className="opacity-60" />
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={LINKS.instagram}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-coal-800/25 bg-surface py-1.5 pl-3.5 pr-4 text-[0.92rem] font-semibold text-coal-800 transition-colors hover:border-coal-800/60"
                >
                  <InstagramIcon width={18} height={18} />
                  {LINKS.instagramHandle}
                  <ExternalIcon width={15} height={15} className="opacity-60" />
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-24">
            <InquiryForm prefill={prefill} onClearPrefill={onClearPrefill} />
          </div>
        </div>
      </div>
    </section>
  );
}
