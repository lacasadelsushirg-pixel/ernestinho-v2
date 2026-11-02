#!/usr/bin/env bash
# Reviewed 2026-11-02 release. Execute on Hostinger account only.
set -euo pipefail
MODE="${1:-audit}"
LIVE=/home/u319776719/domains/ernestinhocarioca.com.br/public_html
STAGE="$LIVE/ec-translation-stage-20261102"
BACKUP=/home/u319776719/ec-translation-backup-20261102
FILES="$STAGE/release-filelist.txt"
test -s "$FILES" || { echo "ERROR: stage manifest missing"; exit 1; }
declare -a paths=()
while IFS= read -r f; do
  [[ "$f" == pt/*/index.html || "$f" == en/*/index.html ]] || { echo "ERROR invalid path"; exit 1; }
  [[ "$f" != *..* ]] || exit 1
  paths+=("$f")
done < "$FILES"
[[ "${#paths[@]}" == 118 ]] || { echo "ERROR expected 118, got ${#paths[@]}"; exit 1; }
for f in "${paths[@]}"; do
  test -s "$STAGE/$f" || { echo "ERROR staged file absent: $f"; exit 1; }
  test -s "$LIVE/$f" || { echo "ERROR live file absent: $f"; exit 1; }
done
echo "Validated 118 candidate HTML and 118 existing live files"
case "$MODE" in
  audit)
    echo "Five shared JavaScript assets (DO NOT overwrite before reconciliation):"
    for f in assets/js/site.js assets/js/translations/chunks/rio-residual-gastronomia-01.js assets/js/translations/chunks/rio-residual-compras-01.js assets/js/buzios-food-places.js assets/js/buzios-restaurant-profile-view.js; do
      if [[ -f "$LIVE/$f" ]]; then
        echo "LIVE $f $(sha256sum "$LIVE/$f" | cut -d' ' -f1)"
      else echo "LIVE $f ABSENT"; fi
      echo "STAGE $f $(sha256sum "$STAGE/$f" | cut -d' ' -f1)"
    done
    echo "SAFE AUDIT COMPLETED, NOTHING MODIFIED"
    ;;
  apply-html)
    if [[ -e "$STAGE/.ec-release-done" ]]; then echo "Previously published, no action"; exit 0; fi
    if [[ -e "$STAGE/.ec-release-started" ]]; then echo "Previous attempt interrupted: investigate backup"; exit 2; fi
    touch "$STAGE/.ec-release-started"
    mkdir -p "$BACKUP"
    for f in "${paths[@]}"; do
      mkdir -p "$BACKUP/$(dirname "$f")"
      cp -p "$LIVE/$f" "$BACKUP/$f"
      cmp -s "$BACKUP/$f" "$LIVE/$f" || { echo "Backup verification FAILED $f"; exit 1; }
    done
    echo "Original 118 HTML safely backed up"
    failed=0
    for f in "${paths[@]}"; do
      cp -p "$STAGE/$f" "$LIVE/$f" || { failed=1; break; }
      cmp -s "$STAGE/$f" "$LIVE/$f" || { failed=1; break; }
    done
    if [[ "$failed" == 1 ]]; then
      echo "Publish failed, restoring originals"
      for f in "${paths[@]}"; do cp -p "$BACKUP/$f" "$LIVE/$f"; done
      exit 1
    fi
    touch "$STAGE/.ec-release-done"
    echo "SUCCESS: Published 118 reviewed PT+EN HTML. No sitemap, ES or shared JS modified."
    ;;
  *) echo "Usage: $0 audit|apply-html"; exit 2 ;;
esac
