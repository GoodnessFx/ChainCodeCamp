import { Fragment, isValidElement, cloneElement } from "react";
import type { ReactNode } from "react";
import ToolTag from "@/components/tools/ToolTag";
import { ALL_ALIASES } from "@/lib/tools";

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ALIAS_RE = new RegExp(
  `\\b(${ALL_ALIASES.map((a) => escapeRe(a.alias)).join("|")})\\b`,
  "g"
);

function splitByAliases(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  const seen = new Set<string>();
  ALIAS_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ALIAS_RE.exec(text)) !== null) {
    const alias = m[1];
    const entry = ALL_ALIASES.find((a) => a.alias === alias);
    if (!entry || seen.has(entry.id)) continue;
    seen.add(entry.id);
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <ToolTag key={`${entry.id}-${m.index}`} id={entry.id}>
        {alias}
      </ToolTag>
    );
    last = m.index + alias.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length > 0 ? out : [text];
}

/**
 * Walks MDX children and turns the first mention of each known tool into a
 * ToolTag (quick-install tooltip + drawer). Skips code, links and anything
 * marked cccSkip so terminal output and inline code stay untouched.
 *
 * Lives outside the "use client" module so the server renderer can call it:
 * named exports of client modules are not callable from server components.
 */
export function linkifyTools(nodes: ReactNode): ReactNode {
  if (nodes == null || typeof nodes === "number" || typeof nodes === "boolean") return nodes;
  if (typeof nodes === "string") return splitByAliases(nodes);
  if (Array.isArray(nodes)) {
    return (
      <Fragment>
        {nodes.map((n, i) => (
          <Fragment key={i}>{linkifyTools(n)}</Fragment>
        ))}
      </Fragment>
    );
  }
  if (isValidElement(nodes)) {
    const type = nodes.type as unknown as Record<string, unknown> | string;
    const name = typeof type === "string" ? type : ((type?.name as string) ?? "");
    const skip = typeof type !== "string" && Boolean(type?.cccSkip);
    if (skip || ["code", "pre", "a", "inlineCode"].includes(name)) return nodes;
    const children = (nodes.props as { children?: ReactNode })?.children;
    if (children !== undefined) {
      return cloneElement(nodes as React.ReactElement<unknown>, {
        children: linkifyTools(children),
      } as never);
    }
    return nodes;
  }
  return nodes;
}
