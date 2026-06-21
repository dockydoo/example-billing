import { InvoiceCalculator } from "./InvoiceCalculator";
import { ProrationPolicy } from "./ProrationPolicy";

export class CreditsService {
  constructor(
    private readonly calc: InvoiceCalculator,
    private readonly policy: ProrationPolicy,
  ) {}

  /**
   * @docky.capability Billing
   * @docky.description Apply a one-off account credit, sized using the same
   *   delta calculation as proration.
   * @docky.link InvoiceCalculator.computeDelta
   */
  applyCredit(subId: string, plan: string): number {
    // Reuses computeDelta. Because Proration also reuses it, DockyDoo surfaces
    // the blast radius: changing computeDelta affects Credits too.
    return this.calc.computeDelta(subId, plan, this.policy);
  }
}
