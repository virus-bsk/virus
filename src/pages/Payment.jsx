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
  fetchCashfreeOrder,
  newOrderId,
  openCashfreeCheckout,
} from "../utils/cashfree";

// The fee lives in Firestore, not in the code: create the document
// pricing/maang_kit with { label, amount, currency } in the Firebase console
// and this page shows it. A missing document renders a configuration hint
// instead of a hardcoded price.
const PRICING_PATH = "pricing/maang_kit";

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

  // After Cashfree redirects back (return_url = this page + ?order_id=...),
  // verify via Get Order and — only when order_status is PAID — flip
  // isPaid=false->true + orderId ""->order_id in ONE write.
  useEffect(() => {
    if (!authReady || !user || loading || !path) return;
    if (isPaid) return;
    let orderParam = null;
    try {
      orderParam = new URLSearchParams(window.location.search).get("order_id");
    } catch {
      orderParam = null;
    }
    if (!orderParam) return;
    if (!doc) return; // users doc must exist for the one-time paid activation
    let cancelled = false;
    (async () => {
      setPayState((s) => ({ ...s, verifying: true, error: null }));
      try {
        const fetched = await fetchCashfreeOrder(orderParam);
        if (cancelled) return;
        if (fetched?.order_status !== "PAID") {
          setPayState((s) => ({
            ...s,
            verifying: false,
            error: `Payment not complete — order status is ${fetched?.order_status || "unknown"}.`,
          }));
          return;
        }
        const result = await setDocument(
          userPath(user),
          { isPaid: true, orderId: fetched.order_id || orderParam },
          { merge: true },
        );
        if (cancelled) return;
        if (!result.ok) {
          throw result.error || new Error("Could not activate access.");
        }
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
  }, [authReady, user, loading, path, isPaid]);

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
          Sandbox-direct Cashfree flow (test keys only — secret is in the
          browser bundle, never do this with production keys):
            1. handlePay() creates a Cashfree order (fee from
               pricing/maang_kit) with return_url = this page + ?order_id=...
            2. Cashfree hosted checkout opens; user pays.
            3. Cashfree redirects back; we Get Order, and ONLY when
               order_status is PAID we write isPaid=true + orderId in one
               Firestore update (allowed once by the rules).
          Webhooks: Cashfree can't reach a static site directly — when you add
          a backend later, register its https endpoint at Developers > Webhooks
          (PAYMENT_SUCCESS_WEBHOOK), verify x-webhook-signature with the secret
          (HMAC-SHA256 of timestamp + raw body), check x-idempotency-key for
          duplicates, then set isPaid/orderId via Admin SDK.
        */}
        {!cashfreeConfigured && (
          <p className="payment-note payment-warning">
            Cashfree test keys are not configured. Add{" "}
            <code>VITE_CASHFREE_APP_ID</code> and{" "}
            <code>VITE_CASHFREE_APP_SECRET</code> (Sandbox only) to enable
            payment.
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
