import type { APIRoute } from "astro";
import { servers } from "../servers";
import { facts, repoUrl, site } from "../lib/github";
import { description, title } from "../lib/site";

/**
 * /llms.txt (https://llmstxt.org): the hub's summary and every server, with the
 * same live tool counts as the page. Each server's site has its own /llms.txt.
 */
export const GET: APIRoute = async () => {
  const lines = await Promise.all(
    servers.map(async (s) => {
      const { tools, prompts, version } = await facts(s);
      const counts = [`${tools} tools`, prompts ? `${prompts} prompts` : "", version ? `latest release ${version}` : ""].filter(Boolean).join(", ");
      return `- [${s.repo}](${site(s)}/): talk to your ${s.subject} (${s.product}). ${s.summary} ${counts}. Details: [llms.txt](${site(s)}/llms.txt), source: ${repoUrl(s)}`;
    }),
  );

  const text = [
    `# ${title}`,
    `> ${description}`,
    "Every server is MIT licensed, starts read-only with changes behind separate switches, ships as one Docker image for amd64 and arm64, and serves Streamable HTTP with a bearer token or stdio. They work with Claude Code, Claude Desktop, VS Code, Cursor, Codex and any other MCP client.",
    "## Servers",
    lines.join("\n"),
    "## Optional",
    ["- [Apps by Matt Oddie](https://apps.mattoddie.dev/): iPhone, iPad and Mac apps for Proxmox VE, Cloudflare, Xcode Cloud and Azure DevOps", "- [Matt Oddie's blog](https://mattoddie.dev/)", "- [GitHub](https://github.com/mattoddie)"].join("\n"),
  ].join("\n\n");

  return new Response(text + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
