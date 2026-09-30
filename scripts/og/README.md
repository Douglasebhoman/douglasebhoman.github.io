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
