import Link from "next/link";
import { Fragment } from "react";

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "table"; headers: string[]; rows: string[][] };

function isBlockStart(line: string) {
  return (
    line.startsWith("## ") ||
    line.startsWith("### ") ||
    line.startsWith("> ") ||
    /^(-|\*) /.test(line) ||
    /^\d+\.\s/.test(line) ||
    line.startsWith("|")
  );
}

function parseTableRow(line: string): string[] {
  const trimmed = line.trim();
  const inner = trimmed.startsWith("|") ? trimmed.slice(1) : trimmed;
  const final = inner.endsWith("|") ? inner.slice(0, -1) : inner;
  return final.split("|").map((c) => c.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?[-:|\s]+\|?\s*$/.test(line) && line.includes("-");
}

function parseMarkdown(source: string): Block[] {
  const lines = source.split(/\r?\n/);
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i] ?? "";
    if (!raw.trim()) {
      i += 1;
      continue;
    }
    if (raw.startsWith("## ")) {
      blocks.push({ kind: "h2", text: raw.slice(3).trim() });
      i += 1;
      continue;
    }
    if (raw.startsWith("### ")) {
      blocks.push({ kind: "h3", text: raw.slice(4).trim() });
      i += 1;
      continue;
    }
    if (raw.startsWith("> ")) {
      blocks.push({ kind: "quote", text: raw.slice(2).trim() });
      i += 1;
      continue;
    }
    if (/^(-|\*) /.test(raw)) {
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i] ?? "";
        if (!/^(-|\*) /.test(cur)) break;
        items.push(cur.replace(/^(-|\*) /, "").trim());
        i += 1;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }
    if (/^\d+\.\s/.test(raw)) {
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i] ?? "";
        if (!/^\d+\.\s/.test(cur)) break;
        items.push(cur.replace(/^\d+\.\s/, "").trim());
        i += 1;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }
    if (raw.startsWith("|")) {
      const headerLine = raw;
      const nextLine = lines[i + 1] ?? "";
      if (isTableSeparator(nextLine)) {
        const headers = parseTableRow(headerLine);
        const rows: string[][] = [];
        i += 2;
        while (i < lines.length) {
          const cur = lines[i] ?? "";
          if (!cur.startsWith("|")) break;
          rows.push(parseTableRow(cur));
          i += 1;
        }
        blocks.push({ kind: "table", headers, rows });
        continue;
      }
    }
    const paragraph: string[] = [raw];
    i += 1;
    while (i < lines.length) {
      const cur = lines[i] ?? "";
      if (!cur.trim() || isBlockStart(cur)) break;
      paragraph.push(cur);
      i += 1;
    }
    blocks.push({ kind: "p", text: paragraph.join(" ").trim() });
  }
  return blocks;
}

function renderInline(text: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let n = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[1] && match[2] !== undefined) {
      nodes.push(
        <strong
          key={`${keyPrefix}-b-${n}`}
          className="text-[var(--text-primary)]"
        >
          {match[2]}
        </strong>
      );
    } else if (match[3] && match[4] !== undefined) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${n}`}
          className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[0.9em] text-[var(--accent-gold)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {match[4]}
        </code>
      );
    } else if (match[5] && match[6] !== undefined && match[7] !== undefined) {
      const href = match[7];
      const label = match[6];
      const external = /^https?:\/\//.test(href);
      if (external) {
        nodes.push(
          <a
            key={`${keyPrefix}-l-${n}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-gold)] underline-offset-4 hover:underline"
          >
            {label}
          </a>
        );
      } else {
        nodes.push(
          <Link
            key={`${keyPrefix}-l-${n}`}
            href={href}
            className="text-[var(--accent-gold)] underline-offset-4 hover:underline"
          >
            {label}
          </Link>
        );
      }
    }
    last = match.index + match[0].length;
    n += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function PostBody({ source }: { source: string }) {
  const blocks = parseMarkdown(source);
  return (
    <div className="space-y-6 text-[16px] leading-[1.75] text-[var(--text-secondary)] md:space-y-7 md:text-[17px]">
      {blocks.map((block, i) => {
        const key = `b-${i}`;
        if (block.kind === "h2") {
          return (
            <h2
              key={key}
              className="mt-10 font-display text-[clamp(1.5rem,4.5vw,2rem)] leading-[1.1] text-[var(--text-primary)] md:mt-12"
            >
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h3") {
          return (
            <h3
              key={key}
              className="mt-8 font-display text-[1.25rem] leading-[1.2] text-[var(--text-primary)] md:text-[1.4rem]"
            >
              {block.text}
            </h3>
          );
        }
        if (block.kind === "quote") {
          return (
            <blockquote
              key={key}
              className="border-l-2 border-[var(--accent-gold)] pl-5 font-display text-[1.2rem] leading-[1.3] text-[var(--text-primary)] md:pl-6 md:text-[1.4rem]"
            >
              {renderInline(block.text, key)}
            </blockquote>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={key} className="ml-5 list-disc space-y-2">
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`}>
                  <Fragment>{renderInline(item, `${key}-${j}`)}</Fragment>
                </li>
              ))}
            </ul>
          );
        }
        if (block.kind === "ol") {
          return (
            <ol key={key} className="ml-5 list-decimal space-y-2">
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`}>
                  <Fragment>{renderInline(item, `${key}-${j}`)}</Fragment>
                </li>
              ))}
            </ol>
          );
        }
        if (block.kind === "table") {
          return (
            <figure
              key={key}
              className="my-4 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {block.headers.map((h, j) => (
                        <th key={j} className="px-5 py-4 font-medium">
                          {renderInline(h, `${key}-h-${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b border-[var(--border-subtle)] last:border-0 align-top"
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={[
                              "px-5 py-4",
                              ci === 0
                                ? "font-display text-[15px] text-[var(--text-primary)]"
                                : "text-[var(--text-secondary)]",
                            ].join(" ")}
                          >
                            {renderInline(cell, `${key}-c-${ri}-${ci}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </figure>
          );
        }
        return (
          <p key={key}>
            <Fragment>{renderInline(block.text, key)}</Fragment>
          </p>
        );
      })}
    </div>
  );
}
