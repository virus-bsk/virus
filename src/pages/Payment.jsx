import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  asDate,
  setDocument,
  subscribeDocument,
} from "../utils/firestore";
import { db } from "../firebase";
import useMembership from "../hooks/useMembership";
import { userPath } from "../utils/userProfile";
import {
  cashfreeConfigured,
  cashfreeMode,
  createCashfreeOrder,
  fetchCashfreeOrderStatus,
  newOrderId,
  openCashfreeCheckout,
} from "../utils/cashfree";

// The fee lives in Firestore, not in the code: create the document
// pricing/maang_kit with { label, amount, currency } in the Firebase console
// and this page shows it. A missing document renders a configuration hint
// instead of a hardcoded price.
const PRICING_PATH = "pricing/maang_kit";

// The order id is stored before checkout opens so verification still runs even
// if Cashfree's return_url redirect drops the query param or never fires.
const PENDING_ORDER_KEY = "bskcoding.pendingCashfreeOrder";
const VERIFY_ATTEMPTS = 6;
const VERIFY_INTERVAL_MS = 3000;

function formatFee(pricing) {
  if (
    pricing?.amount === null ||
    pricing?.amount === undefined ||
    pricing?.amount === ""
  ) {
    return null;
  }
  const amount =
    typeof pricing.amount === "number"
      ? pricing.amount
      : Number(pricing.amount);
  if (!Number.isFinite(amount)) return null;

  const currency = typeof pricing.currency === "string" ? pricing.currency : "";
  try {
    return new Intl.NumberFormat(undefined, {
      style: currency ? "currency" : "decimal",
      currency: currency || undefined,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`.trim();
  }
}

function Payment() {
  const { user, authReady, path, loading, error, doc, isPaid, orderId } =
    useMembership();
  const [pricing, setPricing] = useState({
    loaded: false,
    doc: null,
    error: null,
  });
  const [payState, setPayState] = useState({
    busy: false,
    error: null,
    verifying: false,
  });
  // The last order id we created for this account, so a user who already paid
  // can re-check without paying again.
  const [hasPendingOrder, setHasPendingOrder] = useState(() => {
    try {
      return Boolean(window.localStorage.getItem(PENDING_ORDER_KEY));
    } catch {
      return false;
    }
  });

  // Re-run verification for the stored order id. The verification effect keys
  // off a nonce so a manual click re-triggers it even when nothing else changed.
  const [verifyNonce, setVerifyNonce] = useState(0);
  function recheckPendingOrder() {
    setPayState((s) => ({ ...s, error: null }));
    setVerifyNonce((n) => n + 1);
  }

  useEffect(() => {
    if (!authReady || !user) return undefined;
    const unsubscribe = subscribeDocument(PRICING_PATH, (value, err) => {
      if (err) {
        console.error("Firebase pricing read failed:", {
          projectId: db.app.options.projectId,
          uid: user.uid,
          email: user.email,
          path: PRICING_PATH,
          error: err,
        });
      }
      setPricing({ loaded: true, doc: value, error: err });
    });
    return () => unsubscribe();
  }, [authReady, user]);

  const memberSince = asDate(doc?.date);
  const fee = formatFee(pricing.doc);
  const amount =
    typeof pricing.doc?.amount === "number"
      ? pricing.doc.amount
      : Number(pricing.doc?.amount);
  const feeReady =
    pricing.loaded && !pricing.error && pricing.doc && Number.isFinite(amount);
  const currency =
    typeof pricing.doc?.currency === "string" && pricing.doc.currency
      ? pricing.doc.currency
      : "INR";
  const username =
    (typeof doc?.userName === "string" && doc.userName.trim()) ||
    user?.displayName ||
    (typeof path === "string" && path.includes("/")
      ? path.split("/").pop()
      : "") ||
    user?.email?.split("@")[0] ||
    "";

  // Payment verification.
  //
  // The old flow depended entirely on Cashfree redirecting back to
  // return_url?order_id=... . That round-trip is the fragile link: if the
  // redirect loses the param (or never fires), the app silently never verifies
  // and the account stays Free forever.
  //
  // Instead the pending order id is persisted in localStorage BEFORE opening
  // checkout, and verification polls GET /orders/{id}/status until Cashfree
  // reports success or the attempts run out. Cashfree's redirect then becomes
  // only a nice-to-have that lets the check start sooner.
  useEffect(() => {
    if (!authReady || !user || loading || !path) return undefined;
    if (isPaid) return undefined;

    // Prefer the redirect param, fall back to whatever we stored at checkout.
    let pending = null;
    try {
      pending = new URLSearchParams(window.location.search).get("order_id");
    } catch {
      pending = null;
    }
    if (!pending) {
      try {
        pending = window.localStorage.getItem(PENDING_ORDER_KEY);
      } catch {
        pending = null;
      }
    }
    if (!pending) return undefined;
    if (!doc) return undefined; // users doc must exist for the paid activation

    let cancelled = false;
    (async () => {
      setPayState((s) => ({ ...s, verifying: true, error: null }));
      try {
        let fetched = null;
        // Cashfree can take a moment to settle, so poll rather than trusting a
        // single check on first paint.
        for (let attempt = 0; attempt < VERIFY_ATTEMPTS; attempt += 1) {
          if (cancelled) return;
          if (attempt > 0) {
            await new Promise((r) => setTimeout(r, VERIFY_INTERVAL_MS));
            if (cancelled) return;
          }
          fetched = await fetchCashfreeOrderStatus(pending);
          if (fetched?.success) break;
        }
        if (cancelled) return;

        if (!fetched?.success) {
          const reason = fetched?.message || fetched?.error;
          setPayState((s) => ({
            ...s,
            verifying: false,
            error: `Payment not confirmed by Cashfree — order status is ${
              fetched?.order_status || "unknown"
            }${reason ? ` (${reason})` : ""}. If you were charged, contact support with order ${pending}.`,
          }));
          return;
        }

        const result = await setDocument(
          userPath(user),
          {
            isPaid: true,
            orderId: fetched.order_id || pending,
            // Cashfree's own payment id, so support can trace the exact attempt.
            paymentId:
              fetched.payment_id === null || fetched.payment_id === undefined
                ? null
                : String(fetched.payment_id),
          },
          { merge: true },
        );
        if (cancelled) return;
        if (!result.ok) {
          // Surface the Firestore error code (usually "permission-denied") so a
          // rejected activation is diagnosable instead of silently leaving the
          // account Free. The usual cause is rules in the Firebase console that
          // predate firestore.rules' paid-activation clause (lines 97-107).
          const code = result.error?.code;
          throw new Error(
            code
              ? `Cashfree confirmed payment ${pending}, but Firestore rejected the update (${code}). The rules in the Firebase console may be older than firestore.rules — republish it.`
              : `Cashfree confirmed payment ${pending}, but the Firestore update failed. The rules in the Firebase console may be older than firestore.rules — republish it.`,
          );
        }
        try {
          window.localStorage.removeItem(PENDING_ORDER_KEY);
        } catch {
          /* ignore */
        }
        setHasPendingOrder(false);
        try {
          const clean = new URL(window.location.href);
          clean.searchParams.delete("order_id");
          window.history.replaceState({}, "", clean.toString());
        } catch {
          /* keep the param — harmless */
        }
        setPayState((s) => ({ ...s, verifying: false, error: null }));
      } catch (err) {
        if (cancelled) return;
        setPayState((s) => ({
          ...s,
          verifying: false,
          error: err?.message || "Verification failed. Please try again.",
        }));
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, user, loading, path, isPaid, verifyNonce]);

  async function handlePay() {
    if (!user || !feeReady || payState.busy || isPaid) return;
    setPayState((s) => ({ ...s, busy: true, error: null }));
    try {
      const orderIdNew = newOrderId(
        (typeof path === "string" && path.split("/").pop()) ||
          user.email?.split("@")[0] ||
          "user",
      );
      const returnUrl = `${window.location.origin}${window.location.pathname}?order_id=${encodeURIComponent(orderIdNew)}`;
      const created = await createCashfreeOrder({
        orderId: orderIdNew,
        amount,
        currency,
        customerId: user.uid || orderIdNew,
        customerEmail: user.email || "",
        customerName:
          (typeof doc?.userName === "string" && doc.userName.trim()) ||
          user.displayName ||
          "",
        returnUrl,
      });
      if (!created?.payment_session_id) {
        throw new Error("Cashfree did not return a payment session.");
      }
      // Persist before opening checkout: if the user closes the tab, or the
      // return_url redirect loses the param, the next visit can still verify.
      try {
        window.localStorage.setItem(
          PENDING_ORDER_KEY,
          created.order_id || orderIdNew,
        );
      } catch {
        /* storage blocked — verification still works via the redirect param */
      }
      await openCashfreeCheckout({
        paymentSessionId: created.payment_session_id,
      });
      setPayState((s) => ({ ...s, busy: false }));
    } catch (err) {
      setPayState((s) => ({
        ...s,
        busy: false,
        error: err?.message || "Could not start payment. Please try again.",
      }));
    }
  }

  return (
    <div className="payment-page">
      <section className="payment-hero">
        <h1 className="payment-title">Payment</h1>
        <p className="payment-subtitle">
          Unlock the MAANG preparation kit and the Resume Builder for this
          account. Your status is stored in Firebase and checked against it on
          every visit.
        </p>
      </section>

      {/* Account status — live from users/{email-prefix}, never from code. */}
      <section className="payment-card">
        <h2 className="payment-card-title">Account status</h2>
        {loading && (
          <p className="payment-note">Loading your account from Firestore…</p>
        )}
        {!loading && error && (
          <p className="payment-note payment-warning">
            Could not read {path}: {error.code || error.message}. Check the
            Firestore Rules Playground for an authenticated read of this path,
            verify the user's email matches the document ID and email field, and
            confirm the app project ID in the browser console.
          </p>
        )}
        {!loading && !error && (
          <>
            <div className="payment-status-row">
              <span
                className={`payment-badge${isPaid ? " payment-badge-paid" : ""}`}
              >
                {isPaid ? "Paid" : "Free"}
              </span>
              <span className="payment-status-email">{user?.email}</span>
            </div>
            <p className="payment-note">
              {isPaid
                ? "Full access is active for this account."
                : "This account does not have access yet."}
              {memberSince && (
                <> Member since {memberSince.toLocaleDateString()}.</>
              )}{" "}
              Username: <code>{username || "—"}</code>
            </p>
            {orderId ? (
              <p className="payment-note">
                Order ID: <code>{orderId}</code>
              </p>
            ) : null}
            {isPaid && (
              <div className="gate-actions">
                <Link to="/maang" className="gate-cta">
                  Open the MAANG kit
                </Link>
                <Link to="/resume-builder" className="gate-secondary">
                  Open the Resume Builder
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* Fee — live from pricing/maang_kit so the price never lives in code. */}
      <section className="payment-card">
        <h2 className="payment-card-title">Plan</h2>
        {!user && authReady && (
          <p className="payment-note">Sign in to view the plan details.</p>
        )}
        {user && !pricing.loaded && (
          <p className="payment-note">Loading the fee…</p>
        )}
        {pricing.loaded && pricing.error && (
          <p className="payment-note payment-warning">
            Could not read {PRICING_PATH}:{" "}
            {pricing.error.code || pricing.error.message}. Check the Firestore
            Rules Playground for an authenticated read of this path and confirm
            the app is using project {db.app.options.projectId}.
          </p>
        )}
        {pricing.loaded && !pricing.error && !pricing.doc && (
          <p className="payment-note">
            Fee not configured yet. In the Firebase console create the document{" "}
            <code>{PRICING_PATH}</code> with the fields <code>label</code>,{" "}
            <code>amount</code> and <code>currency</code>.
          </p>
        )}
        {pricing.loaded && !pricing.error && pricing.doc && (
          <>
            <p className="payment-plan-name">
              {typeof pricing.doc.label === "string" && pricing.doc.label
                ? pricing.doc.label
                : "MAANG Kit access"}
            </p>
            <p className="payment-fee">{fee ?? "—"}</p>
          </>
        )}

        {/*
          Cashfree flow (keys live on the Worker, never in this bundle):
            1. handlePay() creates an order (fee from pricing/maang_kit) and
               stores the order id in localStorage.
            2. Cashfree hosted checkout opens; user pays.
            3. We poll GET /orders/{id}/status until it reports success — this
               runs on page load whether or not the return_url redirect fired.
            4. Only then do we write isPaid/orderId/paymentId in one Firestore
               update (allowed once by the rules).
          Webhooks: Cashfree can't reach a static site directly — when you add a
          backend, register its https endpoint at Developers > Webhooks
          (PAYMENT_SUCCESS_WEBHOOK), verify x-webhook-signature with the secret
          (HMAC-SHA256 of timestamp + raw body), check x-idempotency-key for
          duplicates, then set isPaid/orderId via Admin SDK.
        */}
        {!cashfreeConfigured && (
          <p className="payment-note payment-warning">
            Cashfree is not configured. Set{" "}
            <code>VITE_CASHFREE_API_BASE</code> to your Cloudflare Worker URL
            (see <code>server/cashfree/README.md</code>) to enable payment.
          </p>
        )}
        {payState.verifying && (
          <p className="payment-note">
            Verifying your payment with Cashfree…
          </p>
        )}
        {payState.error && (
          <p className="payment-note payment-warning">{payState.error}</p>
        )}
        {!isPaid && (
          <button
            type="button"
            className="payment-btn"
            onClick={handlePay}
            disabled={
              !user || !feeReady || !cashfreeConfigured || payState.busy
            }
            title={
              !cashfreeConfigured
                ? "Add Cashfree Sandbox keys to enable payment."
                : `Pay ${fee ?? ""} with Cashfree (${cashfreeMode})`
            }
          >
            {payState.busy
              ? "Opening Cashfree…"
              : feeReady
                ? `Pay ${fee} with Cashfree`
                : "Pay with Cashfree"}
          </button>
        )}
        {!isPaid && hasPendingOrder && (
          <button
            type="button"
            className="payment-secondary"
            onClick={recheckPendingOrder}
            disabled={payState.busy || payState.verifying}
            title="Re-check the status of your last Cashfree order — no need to pay again."
          >
            {payState.verifying
              ? "Checking your last payment…"
              : "I already paid — check my last order"}
          </button>
        )}
        <p className="payment-note">
          {isPaid
            ? "Payment complete — access is active."
            : `Test mode (${cashfreeMode}): you pay the fee from pricing/maang_kit, then this account flips to Paid with the Cashfree order id.`}
        </p>
      </section>

      <section className="payment-card">
        <h2 className="payment-card-title">What you unlock</h2>
        <ul className="gate-list">
          <li>MAANG preparation kit — DSA, System Design, LLD &amp; HLD</li>
          <li>Resume Builder with PDF export</li>
          <li>Access tied to this account in Firebase — no coupon codes</li>
        </ul>
      </section>
    </div>
  );
}

export default Payment;
