/**
 * @docky.capability Billing
 * @docky.description Round a cent amount to a whole cent.
 * @docky.invariant Uses banker's rounding. The mode must not change without a
 *   linked decision; it shifts credited amounts at scale.
 * @docky.decision RFC-0042 "banker's rounding chosen for fairness across credits"
 * @docky.decision RFC-0099 supersedes=RFC-0042 "switch to round-half-up after the 2026 pricing review"
 */
export function round(cents: number): number {
  // banker's rounding (round-half-to-even)
  const floor = Math.floor(cents);
  const diff = cents - floor;
  if (diff < 0.5) return floor;
  if (diff > 0.5) return floor + 1;
  return floor % 2 === 0 ? floor : floor + 1;
}
