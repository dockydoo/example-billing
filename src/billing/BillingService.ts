import { InvoiceCalculator } from "./InvoiceCalculator";
import { RefundService } from "./RefundService";
import { ProrationPolicy } from "./ProrationPolicy";
// External: owned by the tax team, in another repo. DockyDoo can see the call
// but not the source, so it renders as external / unknown.
import { priceWithTax } from "@acme/tax-service";

export class BillingService {
  constructor(
    private readonly calc: InvoiceCalculator,
    private readonly refunds: RefundService,
    private readonly policy: ProrationPolicy,
  ) {}

  /**
   * @docky.capability Billing
   * @docky.description When a plan changes mid-cycle, charge or credit the
   *   difference. Computes the invoice delta, issues a credit, and applies tax
   *   per region.
   * @docky.link InvoiceCalculator.computeDelta
   * @docky.link RefundService.issue
   * @docky.link tax-service.priceWithTax
   * @docky.debt impact=high likelihood=med reason="hard-coded tax rate, should use TaxService" ticket=BIL-412
   * @docky.todo priority=high "partial refunds are not handled"
   */
  applyProration(subId: string, newPlan: string, region: string): number {
    const delta = this.calc.computeDelta(subId, newPlan, this.policy);
    // External call: DockyDoo records the edge, marks the target unknown.
    const taxed = priceWithTax(delta, region);
    if (taxed < 0) this.refunds.issue(subId, -taxed);
    return taxed;
  }

  // The dunning window was changed from 11 to 25 days. There is no
  // @docky.decision linked to this change, so DockyDoo flags a missing "why".
  private readonly dunningDays = 25;
}
