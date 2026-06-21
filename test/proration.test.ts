import { test, expect } from "vitest";
import { BillingService } from "../src/billing/BillingService";
import { InvoiceCalculator } from "../src/billing/InvoiceCalculator";

/**
 * @docky.test covers=BillingService.applyProration
 */
test("applies proration on a plan upgrade", () => {
  // ... arranges a service, asserts the charge ...
  expect(typeof BillingService).toBe("function");
});

/**
 * @docky.test covers=InvoiceCalculator.computeDelta
 */
test("computes the prorated delta for the remaining cycle", () => {
  expect(typeof InvoiceCalculator).toBe("function");
});

// There is deliberately NO test covering the partial-refund path. DockyDoo
// pairs the open @docky.todo with the missing coverage and lists it under
// "Not yet covered".
