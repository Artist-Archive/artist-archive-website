# Archived brand assets

The pre-redesign logo and icons, kept rather than deleted. **Nothing here is
referenced by any page** — every file was replaced on 2026-09-08 when the site
took the app's new look and the new logo.

Recovered from commit `7819e73`, the last commit before the redesign, so these
are exactly what was live.

| File | Was | Replaced by |
|---|---|---|
| `logo.svg` | The old wordmark, in the Walnut palette. Loaded by every page's header. | `/logo.png` on the legal pages, and inline SVG + real text on the landing page. |
| `favicon.ico` | The old browser-tab icon, unchanged since 2026-08-02. | `favicon.svg`, `favicon-32.png`, `favicon-192.png`. |
| `apple-touch-icon.png` | The old home-screen icon. | The designer's 180px app icon. |

## Why they were kept

Deleting them would have made "what did it look like before" a git-history
question rather than a folder you can open. They cost 18KB.

## Two things worth knowing

⚠️ **This folder IS published.** The site has a `.nojekyll` file, so GitHub
Pages serves everything as-is rather than running Jekyll — which means a
`_`-prefixed name would not have hidden it either. These are old logos, not
secrets, so that is fine; just do not treat this folder as private.

⚠️ **`og-image.png` and `og-image.jpg` are NOT here, and they are still the OLD
branding.** They are live and still referenced by every page's `og:image` meta
tag, so social link previews continue to show the old logo. They are not
archived because they have not been replaced yet — a new 1200x630 image is
outstanding, and it is a design job rather than a code one.

## The launch-redesign branch is gone, and that is fine

**2026-09-08.** The branch was deleted. Everything that was on it is kept by
the tag `archive/launch-redesign-2026-09-08`, which points at the same commit
the branch tip did.

```
git checkout archive/launch-redesign-2026-09-08
```

It holds the founder photo, five screenshots of the pre-redesign app, and a
much longer landing page: feature sections, store badges and a founder story
block. **The copy in there is worth reading again when the real launch page is
built.**

⚠️ **Why a tag and not just deleting.** A deleted branch's commits stop being
reachable and GitHub can eventually collect them. A tag keeps them forever, so
this is reversible.

🚨 **Why the branch had to go.** It was 19 commits ahead of `main` but **13
behind**, and those 13 are the entire 2026-09-08 redesign. Merging it would
have put the old walnut branding back over the whole site. It also carried the
old Gmail address in three files. It could never publish anything on its own,
so its only remaining function was as a merge hazard.

✅ **The founder photo is on `main` as `founder.jpg`** rather than only in the
tag, because it is the one thing on that branch that is genuinely
irreplaceable and will certainly be used again. Nothing references it yet.
