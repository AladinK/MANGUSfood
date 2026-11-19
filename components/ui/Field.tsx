import type { InputHTMLAttributes, ReactNode, Ref, TextareaHTMLAttributes } from "react";
import { AlertIcon, CheckIcon } from "./Icons";
import { inputBase, inputInvalid, inputOk } from "./styles";

/** Poruka o grešci. Prostor za nju je uvek rezervisan, pa forma ne „skače“. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p
      id={id}
      role={message ? "alert" : undefined}
      className="mb-2 mt-1 flex min-h-5 items-start gap-1.5 text-[0.82rem] font-medium leading-5 text-danger"
    >
      {message ? (
        <>
          <AlertIcon width={15} height={15} className="mt-[3px] shrink-0" />
          <span>{message}</span>
        </>
      ) : null}
    </p>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children}
      {optional ? <span className="font-normal text-muted"> ({optional})</span> : null}
    </label>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  wrapperClassName?: string;
  /** Polje je popunjeno ispravno: prikazuje se kvačica */
  confirmed?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}

export function TextField({
  id,
  label,
  error,
  optional,
  wrapperClassName,
  confirmed = false,
  inputRef,
  ...inputProps
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const showCheck = confirmed && !error;
  return (
    <div className={wrapperClassName}>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${inputBase} ${error ? inputInvalid : inputOk} ${showCheck ? "border-leaf-500 pr-10" : ""}`}
          {...inputProps}
        />
        <CheckIcon
          width={18}
          height={18}
          strokeWidth={2.4}
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-leaf-600 transition-[opacity,transform] duration-200 ${
            showCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  wrapperClassName?: string;
  /** Sadržaj između oznake i polja (npr. oznaka izabranog proizvoda) */
  before?: ReactNode;
}

export function TextAreaField({
  id,
  label,
  error,
  wrapperClassName,
  before,
  ...textareaProps
}: TextAreaFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={wrapperClassName}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {before}
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} min-h-32 resize-y ${error ? inputInvalid : inputOk}`}
        {...textareaProps}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
