## Summary

<!-- Kurze Beschreibung der Änderungen -->

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] CI/Policy change

## Checklist

### PFLICHT (CI FAIL wenn nicht erfüllt)

- [ ] **PROJECT_BRIEF:** Link zum aktualisierten PROJECT_BRIEF.md (falls Capabilities geändert)
- [ ] **Capability Change:** Falls Capabilities geändert → `capabilities.yml` aktualisiert
- [ ] **Tests:** Neue/geänderte Capabilities haben entsprechende Tests
  - [ ] `unit:` Tests vorhanden
  - [ ] `http:` / `mcp:` Tests je nach Mode
  - [ ] `readback:` Tests falls `side_effect: true`
  - [ ] `integration:` Tests falls criticality HIGH/CRITICAL
  - [ ] `e2e:` Tests falls UI Consumer

### Zusätzlich

- [ ] Dokumentation aktualisiert
- [ ] Keine Secrets im Code
- [ ] `.env` Dateien in `.gitignore`

## Related Issues

<!-- Fixes #123, Relates to #456 -->

## Testing Done

<!-- Beschreibung der durchgeführten Tests -->

---

> **Hinweis:** PRs die CI-Checks nicht bestehen werden nicht gemerged.
> Required checks: `structure`, `brief`, `capabilities`, `testplan`
