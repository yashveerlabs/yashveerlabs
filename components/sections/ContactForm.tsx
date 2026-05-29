"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GoldButton } from "@/components/ui/GoldButton";

type Status = "idle" | "opening" | "sent" | "error";

const WHATSAPP_NUMBER = "918700535147";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("opening");

    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    if (data.website && data.website.trim().length > 0) {
      // Honeypot trip. Pretend we succeeded.
      setStatus("sent");
      form.reset();
      return;
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const company = (data.company || "").trim();
    const message = (data.message || "").trim();

    if (name.length < 2 || message.length < 10) {
      setError("Name and message are required.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }

    const lines = [
      "Hello Yashveer,",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "N/A"}`,
      "",
      message,
      "",
      "Sent via yashveerlabs.vercel.app",
    ];
    const encoded = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-8"
    >
      <Field label="Name" name="name" placeholder="Your name" required minLength={2} />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@domain.com"
        required
      />
      <Field
        label="Company"
        name="company"
        placeholder="Optional"
      />
      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={6}
        placeholder="Say what you mean. Keep it specific."
        required
        minLength={10}
      />

      {/* Honeypot, hidden from real users. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <GoldButton type="submit" disabled={status === "opening"}>
          {status === "opening" ? "Opening WhatsApp..." : "Send via WhatsApp"}
        </GoldButton>
        <StatusLine status={status} error={error} />
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  rows,
  placeholder,
  required,
  minLength,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}) {
  const base =
    "block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--border-gold)]";
  return (
    <label className="block">
      <span className="mb-2 block label-eyebrow text-[10px]">
        {label}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className={cn(base, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className={base}
        />
      )}
    </label>
  );
}

function StatusLine({ status, error }: { status: Status; error: string | null }) {
  if (status === "sent") {
    return (
      <span className="label-eyebrow text-[11px]">
        Opening WhatsApp...
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="label-eyebrow text-[11px] text-red-400" style={{ color: "#f87171" }}>
        {error}
      </span>
    );
  }
  return null;
}
