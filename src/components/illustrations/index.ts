/**
 * Each server's drawing, keyed by repo. A server without one here gets the
 * generic stack of tiles in its own colours, so adding a server to
 * src/servers.ts never needs a drawing first.
 */
import Generic from "./Generic.astro";
import bluelink from "./bluelink-mcp.astro";
import crunch from "./crunch-mcp.astro";
import hive from "./hive-mcp.astro";
import octopus from "./octopus-mcp.astro";
import proxmox from "./proxmox-mcp.astro";
import unifi from "./unifi-mcp.astro";

const byRepo: Record<string, typeof Generic> = {
  "proxmox-mcp": proxmox,
  "unifi-mcp": unifi,
  "crunch-mcp": crunch,
  "bluelink-mcp": bluelink,
  "octopus-mcp": octopus,
  "hive-mcp": hive,
};

export const illustration = (repo: string) => byRepo[repo] ?? Generic;
