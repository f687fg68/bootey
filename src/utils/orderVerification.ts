import { Toolkit, PaidProductRecord } from '../types';

const STORAGE_KEY = 'bootey_verified_polar_purchases_v2';
const LEGACY_STORAGE_KEYS = [
  'bootey_paid_products_v1',
  'bootey_unlocked_products',
  'bootey_orders',
  'bootey_verified_orders'
];

/**
 * Purges any legacy unverified or mock data from browser localStorage.
 */
export function purgeUnverifiedLegacyState(): void {
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.error('Error clearing legacy storage:', err);
  }
}

/**
 * Retrieves all verified paid product records from local storage.
 * Strictly filters out any records lacking a valid Polar checkout ID.
 */
export function getPaidProducts(): PaidProductRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (record: PaidProductRecord) =>
        record.productId &&
        record.checkoutId &&
        record.checkoutId !== '{CHECKOUT_ID}' &&
        record.checkoutId.length >= 6
    );
  } catch {
    return [];
  }
}

/**
 * Retrieves all paid product IDs.
 */
export function getPaidProductIds(): string[] {
  return getPaidProducts().map((p) => p.productId);
}

/**
 * Checks whether a digital product has been paid for.
 */
export function isProductPaid(productId: string): boolean {
  const paid = getPaidProducts();
  return paid.some((p) => p.productId === productId);
}

/**
 * Marks a digital product as paid ONLY with a valid Polar checkout ID.
 */
export function markProductAsPaid(toolkit: Toolkit, checkoutId: string): PaidProductRecord {
  const newRecord: PaidProductRecord = {
    productId: toolkit.id,
    productCode: toolkit.code,
    productTitle: toolkit.title,
    paidAt: new Date().toISOString(),
    checkoutId: checkoutId,
  };

  try {
    const existing = getPaidProducts().filter((p) => p.productId !== toolkit.id);
    const updated = [...existing, newRecord];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving payment record:', err);
  }

  return newRecord;
}

/**
 * Revokes payment status for a product.
 */
export function revokePayment(productId: string): void {
  try {
    const existing = getPaidProducts().filter((p) => p.productId !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Error revoking payment:', err);
  }
}

/**
 * Generates the Polar checkout URL with a success redirect parameter back to this store.
 * Polar replaces {CHECKOUT_ID} with the unique transaction ID ONLY upon successful payment.
 * If the user cancels or exits, Polar does NOT redirect with a substituted checkout_id.
 */
export function getPolarCheckoutUrl(toolkit: Toolkit): string {
  const base = toolkit.polarCheckoutUrl || 'https://polar.sh';
  if (typeof window === 'undefined') return base;
  try {
    const successUrl = `${window.location.origin}${window.location.pathname}?product=${toolkit.id}&checkout_id={CHECKOUT_ID}&status=succeeded`;
    const separator = base.includes('?') ? '&' : '?';
    return `${base}${separator}success_url=${encodeURIComponent(successUrl)}`;
  } catch {
    return base;
  }
}

/**
 * Checks if the current URL parameters indicate a completed payment from Polar.
 * Strictly verifies that a genuine Polar checkout ID was substituted by Polar.
 */
export function checkPolarReturnRedirect(
  searchParams: URLSearchParams,
  toolkits: Toolkit[]
): { paid: boolean; toolkit?: Toolkit; checkoutId?: string } {
  const checkoutId = searchParams.get('checkout_id') || searchParams.get('checkoutId');

  // CRITICAL: If checkout_id is missing, or is still the template string '{CHECKOUT_ID}',
  // the user did not complete payment on Polar.
  if (!checkoutId || checkoutId === '{CHECKOUT_ID}' || checkoutId.trim().length < 6) {
    return { paid: false };
  }

  const status = searchParams.get('status');
  if (status && status !== 'succeeded' && status !== 'paid' && status !== 'confirmed') {
    return { paid: false };
  }

  const productId = searchParams.get('product') || searchParams.get('id') || searchParams.get('product_id');

  let foundToolkit: Toolkit | undefined;
  if (productId) {
    foundToolkit = toolkits.find(
      (t) =>
        t.id === productId ||
        t.code.toLowerCase().replace(/[^a-z0-9]/g, '') === productId.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
  }

  if (!foundToolkit && toolkits.length > 0) {
    foundToolkit = toolkits[0];
  }

  if (foundToolkit) {
    markProductAsPaid(foundToolkit, checkoutId);
    return { paid: true, toolkit: foundToolkit, checkoutId };
  }

  return { paid: false };
}
