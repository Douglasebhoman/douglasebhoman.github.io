# Share cards

Source files for the Open Graph share images. Each card is a standalone HTML
page sized at 1200 x 627 pixels. It uses the colour tokens from `styles.css`
and the site fonts from Google Fonts. Eleventy ignores this folder, so none of
these files are published.

| Source | Output | Used by |
| --- | --- | --- |
| `og-home.html` | `assets/images/og-home.png` | Homepage |
| `og-audit.html` | `assets/images/og-audit.png` | `/audit/` |
| `og-blog.html` | `assets/images/og-blog.png` | `/blog/` |

## Render a card

Run this from the repository root in Git Bash on Windows. Replace `home` with
`audit` or `blog` to render the other cards.

```bash
CARD=home
W=$(pwd -W)
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,627 \
  --virtual-time-budget=8000 \
  --screenshot="$W/assets/images/og-$CARD.png" \
  "file:///$W/scripts/og/og-$CARD.html"
```

The render needs a network connection. The cards load Fraunces, DM Sans and
DM Mono from Google Fonts, and without a connection Chrome falls back to
system fonts. Open the PNG afterwards and check that the title is set in
Fraunces before you commit it.

## Site documentation card screenshot

`assets/images/site-docs-card.png` is a screenshot of the live documentation
site, used on the Site Documentation card on the homepage and the work page.
It is not rendered from a file in this folder. Retake it whenever the docs
header, sidebar or Deployment page changes above the fold.

The capture is the top of the Deployment page at 135% scale in a window
1,920 pixels wide, cropped to 1731 x 909 pixels around the content grid.

Run this from the repository root in Git Bash on Windows, after the docs
change is live. The crop step needs Pillow (`python -m pip install pillow`).

```bash
W=$(pwd -W)
T=$(cygpath -m "$TEMP")
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1.35 --window-size=1422,674 \
  --virtual-time-budget=8000 \
  --screenshot="$T/site-docs-full.png" \
  "https://douglasebhoman.com/site-docs/deployment/"
python -c "from PIL import Image; Image.open('$T/site-docs-full.png').crop((96, 0, 1827, 909)).save('$W/assets/images/site-docs-card.png', optimize=True)"
```

The window size is in CSS pixels, so 1422 x 674 at 135% gives a 1920 x 910
screenshot. The crop keeps the header, both sidebars and the start of the
workflow table. Open the PNG afterwards and check that the sidebar title is
complete, with no ellipsis, before you commit it.
