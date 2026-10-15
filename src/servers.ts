/**
 * The MCP servers shown on the hub. Add a new server here; its logo, tool
 * count, prompt count and latest version are fetched from its repository at
 * build time (see src/lib/github.ts), so only the words live in this file.
 *
 * Each repo must have docs/assets/logo.svg, docs/tools.md (whose first lines say
 * "has **N tools**") and a Keep a Changelog CHANGELOG.md.
 */
export interface Server {
  /** Repository name under github.com/mattoddie, also the site's subdomain. */
  repo: string;
  /** What it talks to, as in "Talk to your …". */
  subject: string;
  /** The product it connects to. */
  product: string;
  /** Short label for the kind of thing it manages. */
  category: string;
  /** One or two sentences for the card. */
  summary: string;
  /** A question you might ask, shown as a quote. */
  question: string;
  /** Brand gradient from the server's logo: start, middle, end. */
  colors: [string, string, string];
}

export const servers: Server[] = [
  {
    repo: "proxmox-mcp",
    subject: "Proxmox cluster",
    product: "Proxmox VE",
    category: "Home lab",
    summary: "Monitor and manage nodes, VMs, containers, storage, backups, firewall, Ceph and HA.",
    question: "Why is the database VM so slow today?",
    colors: ["#f97316", "#e11d48", "#c026d3"],
  },
  {
    repo: "unifi-mcp",
    subject: "UniFi network",
    product: "Ubiquiti UniFi Network",
    category: "Network",
    summary: "Monitor and manage sites, devices, clients, WiFi, firewall, VPN and guest vouchers.",
    question: "Why is the lounge TV buffering?",
    colors: ["#4f46e5", "#3b82f6", "#06b6d4"],
  },
  {
    repo: "crunch-mcp",
    subject: "books",
    product: "Crunch Accounting",
    category: "Business",
    summary: "Read and update expenses, receipts, invoices, clients, suppliers and bank accounts.",
    question: "How's the business looking this month?",
    colors: ["#84cc16", "#10b981", "#0f766e"],
  },
  {
    repo: "bluelink-mcp",
    subject: "Hyundai",
    product: "Hyundai Bluelink",
    category: "Car",
    summary: "Check charge, range, locks and location, and pre-heat the cabin or start charging.",
    question: "Is the car charged, and is it locked?",
    colors: ["#1d4ed8", "#0ea5e9", "#10b981"],
  },
];
