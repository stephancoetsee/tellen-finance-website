# Tellen Finance — Browser-editable website

This is the approved **Tellen Finance v3 service-refresh** website, converted for structured browser editing. The visual design and bilingual pages are preserved. It is not yet connected to any GitHub or Cloudflare account.

## What you can edit

- Use [Pages CMS](https://app.pagescms.org/) after repository connection.
- Select **Shared prices - all pages** to change ZZP, Holding BV, Business BV, Finance Support and the one-off BV onboarding fee. The site rebuild updates each price wherever it appears.
- Select **Home - English**, **Home - Dutch**, **Pricing - English**, **Pricing - Dutch**, **Accounting**, or **Advisory** to edit headlines, service descriptions, bullet points, calls to action and illustrated dashboard labels.
- Select **Branding and images** to change the favicon. The media library accepts additional images; the existing logo and reporting graphic are HTML/CSS rather than image files and therefore require a code/design change to replace.
- Edit both English and Dutch text where appropriate; this CMS does not automatically translate.

The file-based CMS stores edits in `content/*.json`. `build.mjs` injects the text into the existing HTML templates at build time. This means the site is still static and inexpensive to host, but the content editor doesn't need to work directly with HTML code.

## Check before connecting the live site

1. Keep a known-good Cloudflare deployment version for rollback.
2. Confirm that the existing Cloudflare Worker is named **`tellen-finance`**, and that `tellenfinance.nl` is a custom domain of that Worker.
3. Confirm this project is the website revision you wish to publish. Creating a Git integration does not automatically copy the previous deployed source into GitHub.
4. Do **not** commit secrets, client data, API tokens or passwords to the GitHub repository. Private repositories still require access controls.
5. The current contact form references `hello@tellenfinance.nl`; it is not yet confirmed active. Registration details, the privacy notice, and client compliance documents require review before the business publicly accepts engagements.

## One-time setup in the browser

### 1. GitHub

1. Create a **private** GitHub repository called `tellen-finance-site` (name is optional). Use the account that will manage Tellen Finance. Keep an initial backup of the project.
2. Upload the *contents of this project folder* to the repository root, including the normally hidden `.pages.yml` file. Don't upload a ZIP as a single file; GitHub needs actual source files.
3. Verify `content/pricing.json`, `templates/index.html`, `.pages.yml`, `package.json` and `wrangler.jsonc` are visible in the repository.

### 2. Cloudflare Workers Builds — connect the EXISTING Worker

1. In Cloudflare select **Workers & Pages → tellen-finance → Settings → Builds → Connect**.
2. Authorize GitHub access to **only the new Tellen Finance repository**, if that scope is available.
3. Select the repository and production branch `main`.
4. Set **Build command:** `npm run build`.
5. Set **Deploy command:** `npx wrangler deploy`.
6. Set **Root directory:** `/` (repository root, not `/templates` or `/dist`).
7. `wrangler.jsonc` deliberately uses the existing Worker name `tellen-finance` and retains the `tellenfinance.nl` custom domain. Do not create a second Worker or replace DNS settings.
8. For the first update, **review the site using a preview branch/build and approve before merging to `main`**. A commit to the production branch normally deploys live automatically.
9. Verify both `https://tellenfinance.nl` and your existing `workers.dev` URL after deployment.

Cloudflare documentation: <https://developers.cloudflare.com/workers/ci-cd/builds/>

### 3. Pages CMS — browser editing

1. Visit <https://app.pagescms.org/> and sign in with GitHub.
2. Install or authorize the Pages CMS GitHub App for **this repository only**.
3. Select `tellen-finance-site`. Pages CMS reads `.pages.yml` in the repository root.
4. Open **Shared prices - all pages** or a content page and change a field, save it and inspect the commit.
5. For production edits, the change to the configured production branch triggers Cloudflare Workers Builds. You don't need to download or re-upload a ZIP.
6. For changes requiring review, edit a non-production branch and merge the pull request after checking the preview, where that branch workflow is configured.

Pages CMS documentation: <https://pagescms.org/docs/quick-start/>

## Local tests (optional)

Requires Node.js 20 or newer. Run:

```sh
node build.mjs
```

Open `dist/index.html` with a simple local web server. Source copy and prices are in `content/`; HTML layout and CSS live in `templates/`. Cloudflare serves the generated `dist/` directory.

## Pricing and service boundaries

- ZZP: from **€99/month**, **free onboarding**.
- Holding BV: from **€109/month**, **€149 one-off onboarding**.
- Business BV: from **€199/month**, **€149 one-off onboarding**.
- Finance Support: **€110/hour**, with monthly retainers or scoped projects available.
- Technical Accounting: separate service, **custom quote**.
- Prices exclude VAT. Detailed exclusions are governed by the service schedule and engagement letter, not public website cards.

**Important:** Pages CMS saves content to GitHub; it does not itself host the website. The configured Cloudflare Worker remains the hosting/deployment platform. GitHub and Cloudflare account connections and a first approved production deployment are still required before this is live.

Initial live website deployment
