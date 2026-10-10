#!/usr/bin/env bash
# Fails if any source HTML or Nunjucks file contains a claim that no longer matches
# the Upwork profile or the verifiable record.
#
# CSS is blanked before matching, both <style> blocks and style="" attributes,
# so "width:100%" does not count. Script text is still checked because some
# page copy lives in JavaScript. "5+" is not matched after a digit or a dot,
# so arithmetic such as "*.5+.5" does not count. "3–5 hours" also matches the
# &ndash; and &#8211; entity forms. Line numbers match the source.
# The _site build output is skipped.
set -u

cd "$(dirname "$0")/.." || exit 2

patterns=(
  "5+"
  "Years writing"
  "Series A"
  "Seed stage"
  "Jekyll"
  "LinkedIn · Verified"
  "3–5 hours"
  "douglasebhoman.github.io/site-docs"
  "Years building"
  "ownership failures they"
)

strip_css() {
  perl -0777 -pe '
    s{(<style\b[^>]*>)(.*?)(</style>)}{ my ($o,$b,$c)=($1,$2,$3); $b =~ s/[^\n]//g; "$o$b$c" }gsie;
    s{\sstyle\s*=\s*"[^"]*"}{}gi;
    s{\sstyle\s*=\s*\x27[^\x27]*\x27}{}gi;
  ' "$1"
}

found=0
while IFS= read -r -d '' file; do
  text=$(strip_css "$file")
  for p in "${patterns[@]}"; do
    if [ "$p" = "5+" ]; then
      hits=$(printf '%s\n' "$text" | grep -nE -- '(^|[^0-9.])5\+' || true)
    elif [ "$p" = "3–5 hours" ]; then
      hits=$(printf '%s\n' "$text" | grep -nE -- '3(–|&ndash;|&#8211;)5 hours' || true)
    else
      hits=$(printf '%s\n' "$text" | grep -nF -- "$p" || true)
    fi
    if [ -n "$hits" ]; then
      while IFS= read -r line; do
        printf '%s:%s\n' "${file#./}" "$line" | cut -c1-200
      done <<< "$hits"
      printf '  matched: "%s"\n' "$p"
      found=1
    fi
  done
done < <(find . \( -name .git -o -name _site -o -name node_modules \) -prune -o \( -name '*.html' -o -name '*.njk' \) -print0 | sort -z)

if [ "$found" -eq 1 ]; then
  echo "drift-check: failed"
  exit 1
fi

echo "drift-check: clean"
exit 0
