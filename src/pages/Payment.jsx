import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { asDate, subscribeDocument } from "../utils/firestore";
import useMembership from "../hooks/useMembership";

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
    typeof pricing.amount === "number" ? pricing.amount : Number(pricing.amount);
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
  const { user, authReady, path, loading, error, doc, isPaid, grantedByBypass } =
    useMembership();
  const [pricing, setPricing] = useState({
    loaded: false,
    doc: null,
    error: null,
  });

  useEffect(() => {
    // Pricing is a signed-in-only read, so wait for Firebase Auth the same way
    // the membership read does — otherwise the first request goes out with
    // request.auth == null and the rules deny it.
    if (!authReady) return undefined;
    const unsubscribe = subscribeDocument(PRICING_PATH, (value, err) => {
      setPricing({ loaded: true, doc: value, error: err });
    });
    return () => unsubscribe();
  }, [authReady]);

  const memberSince = asDate(doc?.date);
  const fee = formatFee(pricing.doc);

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
            Could not read {path}: {error.code || error.message}. Publish the
            Firestore security rules and reload.
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
              {grantedByBypass && (
                <> Temporary owner access is on — Firestore is bypassed.</>
              )}
              {memberSince && (
                <> Member since {memberSince.toLocaleDateString()}.</>
              )}{" "}
              Document: <code>{path}</code>
            </p>
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
        {!pricing.loaded && <p className="payment-note">Loading the fee…</p>}
        {pricing.loaded && pricing.error && (
          <p className="payment-note payment-warning">
            Could not read {PRICING_PATH}:{" "}
            {pricing.error.code || pricing.error.message}.
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
          Cashfree checkout placeholder — wired up when the integration details
          arrive. Planned flow (no secret ever lives in this repo):
            1. Call a backend endpoint that creates a Cashfree order with the
               merchant app id + secret (server-side only).
            2. Open the Cashfree checkout with the returned order id.
            3. On the webhook / return callback the server verifies the
               signature and sets users/{email-prefix}.isPaid = true with the
               Admin SDK.
          Until then the button stays disabled; the status above is the single
          source of truth for access.
        */}
        <button
          type="button"
          className="payment-btn"
          disabled
          title="Cashfree checkout will be enabled once the payment integration details are added."
        >
          Pay with Cashfree
        </button>
        <p className="payment-note">
          Online payment opens here once the Cashfree integration details are
          added.
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