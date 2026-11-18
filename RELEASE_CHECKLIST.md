# First-deployment checklist — do not publish before approval

- [ ] Confirm this repo's `wrangler.jsonc` name is exactly `tellen-finance` (existing Worker).
- [ ] Confirm `tellenfinance.nl` remains mapped to the existing Worker.
- [ ] Confirm there is a restore point / prior deployment to roll back.
- [ ] Build succeeded: `node build.mjs`.
- [ ] Preview English homepage, Accounting, Pricing and Advisory desktop/mobile.
- [ ] Preview Dutch homepage, Boekhouding, Tarieven and Advies desktop/mobile.
- [ ] Test links and language switchers.
- [ ] Confirm ZZP €99, Holding €109, BV €199, Finance €110, €149 BV onboarding, free ZZP onboarding.
- [ ] Confirm site wording doesn't imply a live mailbox if `hello@tellenfinance.nl` is not active.
- [ ] Confirm privacy/legal/registration content before marketing or accepting engagements.
- [ ] Ask the owner to approve the **exact production deployment** to `tellenfinance.nl`.
- [ ] Connect repository to existing Cloudflare Worker Builds; do not create a duplicate Worker.
- [ ] Merge to production and verify live HTTPS and internal navigation.
