// NOTE: this class is exported (public surface) but carries NO @docky
// annotation. DockyDoo lists it under "Not yet covered" as undocumented, and
// since no test declares `covers=ProrationPolicy`, also as untested.
export class ProrationPolicy {
  remainingFraction(_subId: string): number {
    return 0.5;
  }

  priceOf(plan: string): number {
    return plan === "pro" ? 3000 : 1000;
  }
}
