# Example: the source that compiles to the Proration page

This is a tiny annotated TypeScript project. Run through the DockyDoo extractor
(`docky build`), it produces exactly the `Billing / Proration` capability page in
the docs space - including the gaps. It is the input; the page is the output.

It lives outside the pnpm/turbo workspace on purpose (it is sample source, not a
package).

## What `docky build` does with it

1. Parse every `src/**/*.ts` with tree-sitter; read the `@docky.*` tags from each
   symbol's doc-comment; build the import/call graph; read `coverage/lcov.info`.
2. Group symbols by `@docky.capability` and the call graph into the capability
   page.
3. Emit the page (the same `DocPage` the docs space renders).

## How the annotations map to the page

| In the code | On the page |
| --- | --- |
| `BillingService.applyProration` with `@docky.description` + `@docky.capability Billing` | the page title, the "What it does" prose |
| `@docky.link` to computeDelta / RefundService.issue / tax-service.priceWithTax, plus the actual calls | the "Built from" rows and the "Reuses" line |
| `CreditsService.applyCredit` also calls `computeDelta` | "Reused by CreditsService" + the blast-radius note |
| `@docky.debt impact=high ... ticket=BIL-412` | the "important" shortcut, counted in confidence (1 important) |
| `@docky.todo "partial refunds..."` + no covering test | a "Not yet covered" item (untested path) |
| `@docky.test covers=...` + lcov | the coverage numbers in "Built from" |
| `ProrationPolicy` exported with NO `@docky` block | "Not yet covered": undocumented + untested |
| `priceWithTax` imported from `@acme/tax-service` (another repo) | the external / unknown row (gray, not a red gap) |
| `dunningDays` changed 11 -> 25 with no `@docky.decision` | "Not yet covered": the change has no linked why |

## What is NOT documented

Nothing here is hand-written as docs. Whatever is not annotated (or not reachable
from an annotated symbol) simply does not appear. The power is that DockyDoo also
lists those holes under "Not yet covered" instead of pretending they do not
exist.

## Commands

```
docky build      # compile annotations + code -> the docs + confidence
docky review     # graph-aware, zero-token review of a change (--fail-on for CI)
docky ask "..."  # deterministic answers over the cached graph (e.g. "is billing good?")
docky suggest    # advisory semantic suggestions (offline lexical / NER-lite)
```

Verification is a human sign-off in the dashboard (Verify), not a CLI command;
there is no `docky check`, `docky verify`, or `docky annotate`.
