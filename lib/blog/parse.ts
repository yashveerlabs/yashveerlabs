/**
 * Minimal YAML frontmatter parser, no deps.
 * Supports:
 *   - scalar strings (quoted or unquoted)
 *   - numbers and booleans
 *   - flow style arrays: ["a", "b"]
 *   - multi-line JSON values (arrays of objects) when the value
 *     starts with [ or { and is not balanced on the same line
 */

export type Frontmatter = Record<string, unknown>;

export function parseFrontmatter(source: string): {
  data: Frontmatter;
  content: string;
} {
  if (!source.startsWith("---")) {
    return { data: {}, content: source };
  }
  const end = source.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: source };
  }
  const yamlBlock = source.slice(3, end).trim();
  const rest = source.slice(end + 4).replace(/^\r?\n/, "");
  const data: Frontmatter = {};

  const lines = yamlBlock.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i] ?? "";
    const line = raw.trimEnd();
    if (!line || line.startsWith("#")) {
      i += 1;
      continue;
    }
    const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
    if (!m || !m[1]) {
      i += 1;
      continue;
    }
    const key = m[1];
    let value = (m[2] ?? "").trim();

    if (
      (value.startsWith("[") || value.startsWith("{")) &&
      !isJsonBalanced(value)
    ) {
      i += 1;
      while (i < lines.length && !isJsonBalanced(value)) {
        value += "\n" + (lines[i] ?? "");
        i += 1;
      }
    } else {
      i += 1;
    }

    data[key] = coerce(value);
  }

  return { data, content: rest };
}

function isJsonBalanced(s: string): boolean {
  let depth = 0;
  let inString = false;
  let escape = false;
  for (const c of s) {
    if (escape) {
      escape = false;
      continue;
    }
    if (c === "\\") {
      escape = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (c === "[" || c === "{") depth += 1;
    if (c === "]" || c === "}") depth -= 1;
  }
  return depth === 0;
}

function coerce(value: string): unknown {
  if (value === "") return "";
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;

  if (
    (value.startsWith("[") && value.endsWith("]")) ||
    (value.startsWith("{") && value.endsWith("}"))
  ) {
    try {
      return JSON.parse(value);
    } catch {
      // fall through
    }
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((p) => stripQuotes(p.trim()));
  }

  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return stripQuotes(value);
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}
