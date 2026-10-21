"use client";

import { useState, type FormEvent } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";
import { CONTACT } from "@/content/site";

const SERVICES = [
  "Private Pilates",
  "Private GYROTONIC®",
  "Private Duet",
  "Group Reformer",
  "Jumpstart 1:1",
  "Post-Rehab",
  "Post-Natal",
  "Rolfing®",
  "Online / House Calls",
];

const field =
  "mt-1 min-h-12 w-full border-0 border-b border-brown/25 bg-transparent px-0 py-3 text-lg text-brown outline-none transition-colors placeholder:text-muted/70 focus:border-brown";

type Field = "name" | "email" | "message";
const MESSAGES: Record<Field, string> = {
  name: "Please tell us your name.",
  email: "Please enter a valid email so we can reply.",
  message: "Please add a short message.",
};

/** Error text under a field, linked with aria-describedby. */
function FieldError({ id, text }: { id: string; text?: string }) {
  return text ? (
    <span id={id} className="mt-2 block text-sm text-orange-deep">
      {text}
    </span>
  ) : null;
}

/** No backend: composes the enquiry into a WhatsApp message or an email draft. */
export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const invalid = (k: Field) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `err-${k}` } : {});

  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    const services = d.getAll("services").join(", ");
    const lines = [
      `Name: ${d.get("name")}`,
      `Email: ${d.get("email")}`,
      d.get("phone") && `WhatsApp: ${d.get("phone")}`,
      services && `Interested in: ${services}`,
      d.get("experience") && `Pilates experience: ${d.get("experience")}`,
      d.get("injuries") && `Injuries: ${d.get("injuries")}`,
      d.get("when") && `Preferred date/time: ${d.get("when")}`,
      "",
      String(d.get("message") ?? ""),
    ].filter((l): l is string => typeof l === "string");
    return lines.join("\n");
  }

  function submit(e: FormEvent<HTMLFormElement>, via: "whatsapp" | "email") {
    e.preventDefault();
    const form = e.currentTarget;
    const found: Partial<Record<Field, string>> = {};
    for (const k of Object.keys(MESSAGES) as Field[]) {
      const el = form.elements.namedItem(k) as HTMLInputElement | HTMLTextAreaElement;
      if (!el.validity.valid) found[k] = MESSAGES[k];
    }
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement).focus();
      return;
    }
    const body = compose(form);
    const url =
      via === "whatsapp"
        ? `${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`
        : `mailto:${CONTACT.emails.general}?subject=${encodeURIComponent("Enquiry from website")}&body=${encodeURIComponent(body)}`;
    window.open(url, via === "whatsapp" ? "_blank" : "_self");
  }

  return (
    <form
      noValidate
      onSubmit={(e) => submit(e, ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "email" ? "email" : "whatsapp")}
      className="grid gap-7"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="meta">Name *</span>
          <input name="name" required autoComplete="name" className={field} {...invalid("name")} />
          <FieldError id="err-name" text={errors.name} />
        </label>
        <label className="block">
          <span className="meta">Email *</span>
          <input name="email" type="email" required autoComplete="email" className={field} {...invalid("email")} />
          <FieldError id="err-email" text={errors.email} />
        </label>
        <label className="block">
          <span className="meta">WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block">
          <span className="meta">Preferred date & time</span>
          <input name="when" className={field} aria-describedby="hint-when" />
          <span id="hint-when" className="mt-2 block text-sm text-muted">
            For example: Tuesday mornings, or 3 Nov after 2pm
          </span>
        </label>
      </div>

      <fieldset>
        <legend className="meta">I&apos;m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="checkbox" name="services" value={s} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center border border-line px-4 transition-colors hover:border-brown peer-checked:border-brown peer-checked:bg-brown peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-brown">
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="meta">Pilates experience</span>
          <span className="relative block">
          <select name="experience" className={`${field} cursor-pointer appearance-none pr-8`} defaultValue="">
            <option value="">Select…</option>
            <option>None</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <CaretDown aria-hidden weight="bold" className="pointer-events-none absolute right-1 top-1/2 size-4 -translate-y-1/2 text-brown-soft" />
          </span>
        </label>
        <label className="block">
          <span className="meta">Current injuries (optional)</span>
          <input name="injuries" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="meta">Message *</span>
        <textarea name="message" required rows={4} className={`${field} resize-y`} {...invalid("message")} />
        <FieldError id="err-message" text={errors.message} />
      </label>

      <p role="status" className="sr-only">
        {Object.keys(errors).length ? `${Object.keys(errors).length} field${Object.keys(errors).length > 1 ? "s need" : " needs"} attention` : ""}
      </p>

      <div className="flex flex-wrap gap-3">
        <button type="submit" value="whatsapp" className="min-h-12 cursor-pointer rounded-[4px] bg-brown px-7 text-lg text-white transition-[background-color,transform] hover:bg-[#3e230a] active:scale-[0.98]">
          Send via WhatsApp
        </button>
        <button type="submit" value="email" className="min-h-12 cursor-pointer rounded-[4px] border border-brown/25 px-7 text-lg transition-[border-color,transform] hover:border-brown active:scale-[0.98]">
          Send via Email
        </button>
      </div>
      <p className="text-sm text-muted">We reply within 24 hours. If you don&apos;t hear from us, check your spam folder.</p>
    </form>
  );
}
