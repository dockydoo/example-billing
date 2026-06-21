import { ProrationPolicy } from "./ProrationPolicy";
import { round } from "./Money";

export class InvoiceCalculator {
  /**
   * @docky.capability Billing
   * @docky.description Compute the prorated difference between the current plan
   *   and the new plan for the days left in the billing cycle.
   */
  computeDelta(subId: string, newPlan: string, policy: ProrationPolicy): number {
    const remaining = policy.remainingFraction(subId);
    // Reuses Money.round (banker's rounding). This is one of 14 call sites that
    // make round load-bearing across Billing, Credits, and Refunds.
    return round(policy.priceOf(newPlan) * remaining);
  }
}
