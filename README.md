# Artist Archive — marketing website

The public site at **www.artistarchiveapp.com** — a coming-soon / waitlist landing page plus the
Privacy Policy and Terms of Service. Static files, hosted **free on GitHub Pages**. Replaces the
paid Squarespace site.

## Files

```
index.html                  Landing page (waitlist)
privacypolicy/index.html    Privacy Policy   -> served at /privacypolicy
termsofservice/index.html   Terms of Service -> served at /termsofservice
CNAME                       Custom domain: www.artistarchiveapp.com
.nojekyll                   Tells GitHub Pages to serve the files as-is
```

⚠️ **The legal URLs must stay exactly `/privacypolicy` and `/termsofservice`** — the app links to
`https://www.artistarchiveapp.com/privacypolicy` and `/termsofservice` (see the app's
`src/config/legalUrls.ts`), and Apple requires the privacy URL. Don't rename those folders.

## Design

Matches the old Squarespace look: background Creamed Oat `#E8DCCA`, text/headings Walnut `#65523E`,
button Walnut on Linen `#F6F1EA` text, headings **Manrope**, body **Poppins** (Google Fonts).

## Waitlist form (TO FINISH)

The "Join the Waitlist" form in `index.html` is styled but **not yet wired up** — its `action=""` is a
placeholder. To collect emails for free: create a **Mailchimp** account + a signup form, then paste
Mailchimp's form **action URL** into the form's `action`. The email field is already named `EMAIL`,
which is what Mailchimp expects.

## Legal pages

These were generated from the **live (reworded, NZ-first) Squarespace pages** on 2026-07-26 — those,
not the app repo's `legal/*.md`, are the current wording. To change them, edit the HTML in
`privacypolicy/` and `termsofservice/` directly. (⚠️ The app repo's `legal/*.md` are the older draft
and are now out of date relative to these — worth reconciling later.)

## Deploy (GitHub Pages)

1. Create a **public** GitHub repo and push these files to its `main` branch.
2. Repo **Settings → Pages** → deploy from `main` / root.
3. Set the custom domain to `www.artistarchiveapp.com` (the `CNAME` file already does this).
4. At the domain registrar, point DNS to GitHub Pages, then **confirm the pages load** before
   cancelling Squarespace, so the app's legal links never break.
