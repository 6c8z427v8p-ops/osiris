# OSIRIS on iPhone — deployment checklist

This fork retains the original OSIRIS application and data integrations.

## What has been added
- Updated `public/site.webmanifest` for Safari Add to Home Screen.
- `/api/pwa-version` exposes the deployed Vercel commit ID with no caching.
- `PwaUpdateWatcher` checks for new deployments every five minutes while visible and when connectivity returns. It **asks before reloading** to avoid losing the current map session.

## Deploy
1. Log in to Vercel after completing account verification.
2. Import `6c8z427v8p-ops/osiris` from GitHub.
3. Confirm Next.js is detected; use the repository root and standard build command (`npm run build`).
4. Configure any API keys required by the specific OSIRIS feeds you plan to use, following the upstream README.
5. Deploy, inspect build logs, and test the HTTPS deployment on Safari.
6. In Safari, choose Share → Add to Home Screen.

## Important limitations
- These GitHub edits have **not yet been tested with a production build**.
- The update watcher detects *application deployments*, not new earthquakes, flights, or news. Those continue to depend on upstream OSIRIS feed polling, API availability, and credentials.
- Background polling is restricted on iOS. True background push notifications require separate push-subscription and server-side event infrastructure.
- Do not force-cache dynamic map or API responses in a service worker.
- Preserve the upstream MIT license and copyright notice.

## Verify after deployment
- Open `/site.webmanifest` and confirm app name and icons.
- Open `/api/pwa-version` and confirm it returns a non-`local` version.
- Confirm map layers load and update from the original feeds.
- Check mobile safe-area, touch gestures, and install behavior on a physical iPhone.
