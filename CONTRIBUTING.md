# Contributing to mcp.mattoddie.dev

Thanks for wanting to help! This repository is the hub page for the MCP servers. Bugs or ideas for a particular server belong in that server's repository.

## Proposing a change

- **Small fixes** (typos, wording, a broken link) can go straight to a pull request.
- **Anything bigger**, such as a layout change or a new section, open an issue first so we can agree on the approach.
- **Adding a server:** follow [Adding a server](README.md#adding-a-server) in the README.

Fork the repository, create a branch from `main`, make your change and open a pull request against `main`. CI builds the site, and Cloudflare Pages posts a preview URL on the pull request.

## Running the site locally

You need **Node 24**.

```sh
npm ci
npm run dev     # http://localhost:4321
npm run build   # static site in dist/, as CI and Cloudflare Pages build it
```

The build fetches each server's logo, tool counts and changelog from GitHub, so it needs network access.

## Commit messages

Commits and pull request titles follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Pull requests are squash-merged, so the PR title becomes the commit on `main`, and a check fails the pull request if its title doesn't match.

- **Format:** `<type>(<optional scope>)<optional !>: <description>`, for example `feat: add hive-mcp to the hub`, `fix(diagram): keep the tiles inside the hero on phones` or `ci(deps): bump the actions group`.
- **Types:** `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build` (dependencies and toolchain), `ci` (workflows), `chore` (anything else), `revert` and `style`.
- **Description:** imperative mood, lower-case first word and no trailing full stop. Keep the whole subject to 72 characters or fewer.
- **Body:** explain **why** when it isn't obvious, and reference issues with `Fixes #123`.
