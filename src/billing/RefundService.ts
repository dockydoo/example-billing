import { round } from "./Money";

export class RefundService {
  /**
   * @docky.capability Billing
   * @docky.description Issue a credit back to a subscription's balance.
   */
  issue(subId: string, amount: number): void {
    const credited = round(amount); // reuses the load-bearing Money.round
    void subId;
    void credited;
  }
}
