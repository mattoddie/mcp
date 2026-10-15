import type { Server } from "../servers";

/**
 * Facts about each server, read from its repository's main branch at build
 * time so the hub can't drift from the projects. A failed fetch fails the
 * build on purpose: Cloudflare Pages then keeps serving the last good
 * version instead of publishing a page with missing numbers.
 */
export interface Facts {
  logo: string; // data: URI, so each logo's SVG ids stay isolated
  tools: number;
  prompts: number;
  version: string | null; // latest released version, without the "v"
  released: string | null; // its date, YYYY-MM-DD
}

const OWNER = "mattoddie";

async function raw(repo: string, path: string): Promise<string> {
  const url = `https://raw.githubusercontent.com/${OWNER}/${repo}/main/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}

export async function facts(server: Server): Promise<Facts> {
  const [logo, tools, changelog] = await Promise.all([
    raw(server.repo, "docs/assets/logo.svg"),
    raw(server.repo, "docs/tools.md"),
    raw(server.repo, "CHANGELOG.md"),
  ]);
  const count = tools.match(/has \*\*(\d+) tools\*\*/);
  if (!count) throw new Error(`${server.repo}: docs/tools.md doesn't say "has **N tools**"`);
  const release = changelog.match(/^## \[(\d+\.\d+\.\d+[^\]]*)\](?: - (\d{4}-\d{2}-\d{2}))?/m);
  return {
    logo: `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`,
    tools: Number(count[1]),
    prompts: Number(tools.match(/\*\*(\d+) prompts\*\*/)?.[1] ?? 0),
    version: release?.[1] ?? null,
    released: release?.[2] ?? null,
  };
}

export const site = (s: Server) => `https://${s.repo}.mattoddie.dev`;
export const repoUrl = (s: Server) => `https://github.com/${OWNER}/${s.repo}`;
export const image = (s: Server) => `ghcr.io/${OWNER}/${s.repo}`;
