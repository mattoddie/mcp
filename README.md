<div align="center">

<img src="public/favicon.svg" alt="" width="96" height="96">

# mcp.mattoddie.dev

**The starting page for Matt Oddie's open-source MCP servers.**

**[mcp.mattoddie.dev](https://mcp.mattoddie.dev)**

</div>

---

| Server | Talk to your… |
|---|---|
| [proxmox-mcp](https://proxmox-mcp.mattoddie.dev) | Proxmox VE cluster |
| [unifi-mcp](https://unifi-mcp.mattoddie.dev) | Ubiquiti UniFi network |
| [crunch-mcp](https://crunch-mcp.mattoddie.dev) | Crunch Accounting books |
| [bluelink-mcp](https://bluelink-mcp.mattoddie.dev) | Hyundai or Kia, through Bluelink or Kia Connect |
| [octopus-mcp](https://octopus-mcp.mattoddie.dev) | Octopus Energy account and smart meter |
| [hive-mcp](https://hive-mcp.mattoddie.dev) | Hive heating and hot water |

## How it works

A single static page built with [Astro](https://astro.build) and hosted on Cloudflare Pages.

| Path | What it is |
|---|---|
| `src/servers.ts` | The list of servers and the words on each card |
| `src/lib/github.ts` | Fetches each server's logo, tool and prompt counts, and latest release from its repository at build time |
| `src/pages/index.astro` | The page (HTML, CSS and a little JS, no framework) |
| `public/og.png` | Social preview image, rendered from `scripts/og.html` |

Because the numbers come from the server repositories, they can't drift from the projects. If a fetch fails, the build fails, and Cloudflare Pages keeps serving the last good version.

```sh
npm ci
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

## Adding a server

1. Make sure the repository has `docs/assets/logo.svg`, a `docs/tools.md` that starts with "has **N tools**", and a [Keep a Changelog](https://keepachangelog.com) `CHANGELOG.md`. Every server built from the same template already does.
2. Add it to `src/servers.ts`, with colours taken from its logo.
3. Add its name to the footer disclaimer in `src/pages/index.astro` if it talks to a third-party product.
4. Update `scripts/og.html` and re-render `public/og.png` if the social preview should mention it:

   ```sh
   chromium --headless --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=10000 \
     --allow-file-access-from-files --screenshot="$PWD/public/og.png" "file://$PWD/scripts/og.html"
   ```

## Deployment

Cloudflare Pages builds the site on every push to `main`, and pull requests get a preview URL. The [Refresh workflow](.github/workflows/refresh.yml) also rebuilds it every morning through a deploy hook, so new releases appear without a commit here.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | `NODE_VERSION=24` |
| Custom domain | `mcp.mattoddie.dev` |
| Deploy hook | Stored in the `PAGES_DEPLOY_HOOK` repository secret |

## License

[MIT](LICENSE)
