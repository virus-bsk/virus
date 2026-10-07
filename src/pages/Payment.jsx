import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  asDate,
  serverTimestamp,
  setDocument,
  subscribeDocument,
} from "../utils/firestore";
import { db } from "../firebase";
import useMembership from "../hooks/useMembership";
import { normalizeMobileNumber, userPath } from "../utils/userProfile";
import {
  cashfreeConfigured,
  cashfreeMode,
  createCashfreeOrder,
  fetchCashfreeOrderStatus,
  newOrderId,
  openCashfreeCheckout,
  orderBelongsToAccount,
  orderOwnerPrefix,
  sanitizeOrderPrefix,
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

// Pending order ids are stored per account (<key>.<email-prefix>). The old
// single shared key was the bug that let one settled payment activate EVERY
// Google account signed into the same browser: the verification effect read
// whatever order id was in storage and wrote isPaid into the then-current
// user's document without ever checking the order belonged to that account.
function pendingOrderKey(prefix) {
  return `${PENDING_ORDER_KEY}.${prefix}`;
}

// Strip a leftover return_url param (Cashfree's own round-trip).
function stripOrderParam() {
  try {
    const clean = new URL(window.location.href);
    clean.searchParams.delete("order_id");
    window.history.replaceState({}, "", clean.toString());
  } catch {
    /* keep the param — harmless */
  }
}

// Friendly error for the pre-checkout mobile-number write (wording style
// matches pages/Profile.jsx's saveErrorMessage).
function mobileStoreErrorMessage(error) {
  if (error?.code === "permission-denied") {
    return "Firestore denied saving your mobile number. Publish the updated firestore.rules so a signed-in user can write mobileNumber on their own users/{email-prefix} document.";
  }
  return error?.message || "Could not save your mobile number. Please try again.";
}

// Returns this account's pending order id, or null. The legacy SHARED key is
// always retired here, in one of two ways:
//   - minted for this account  -> migrated to this account's scoped key;
//   - minted for someone else   -> relocated under the PAYING account's key.
// Never left in place: while it exists, any still-cached OLD bundle (the bug
// is fixed only in the new code, which may not be deployed yet) reads that
// shared key and activates whatever account is signed in — that is how a
// deleted duplicate doc came back after console cleanup.
function readPendingOrder(prefix) {
  if (!prefix) return null;
  try {
    const scopedKey = pendingOrderKey(prefix);
    // A relocated fallback (see below) is parked under the sanitized prefix
    // from the order id, while a signed-in doc id may still carry "." or "+".
    // Check both spellings so a payer always finds their own order.
    const altScopedKey = pendingOrderKey(sanitizeOrderPrefix(prefix));
    const scoped =
      window.localStorage.getItem(scopedKey) ??
      (altScopedKey === scopedKey ? null : window.localStorage.getItem(altScopedKey));
    const legacy = window.localStorage.getItem(PENDING_ORDER_KEY);
    if (legacy) {
      if (orderBelongsToAccount(legacy, prefix)) {
        window.localStorage.setItem(scopedKey, scoped || legacy);
      } else {
        // Another account's order: park it under its owner's key so the payer
        // keeps the fallback but no shared location can replay it.
        const owner = orderOwnerPrefix(legacy);
        const ownerKey = owner ? pendingOrderKey(owner) : null;
        if (ownerKey && !window.localStorage.getItem(ownerKey)) {
          window.localStorage.setItem(ownerKey, legacy);
        }
      }
      window.localStorage.removeItem(PENDING_ORDER_KEY);
    }
    return (
      window.localStorage.getItem(scopedKey) ??
      (altScopedKey === scopedKey ? null : window.localStorage.getItem(altScopedKey))
    );
  } catch {
    return null;
  }
}

function writePendingOrder(prefix, orderId) {
  if (!prefix || !orderId) return;
  try {
    window.localStorage.setItem(pendingOrderKey(prefix), orderId);
  } catch {
    /* storage blocked — the return_url param still drives verification */
  }
}

function clearPendingOrder(prefix) {
  try {
    if (prefix) {
      window.localStorage.removeItem(pendingOrderKey(prefix));
      window.localStorage.removeItem(pendingOrderKey(sanitizeOrderPrefix(prefix)));
    }
    const legacy = window.localStorage.getItem(PENDING_ORDER_KEY);
    if (legacy && orderBelongsToAccount(legacy, prefix)) {
      window.localStorage.removeItem(PENDING_ORDER_KEY);
    }
  } catch {
    /* ignore */
  }
}

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
  // The last order id created for THIS account, so a user who already paid
  // can re-check without paying again. Pending orders are stored per account
  // (<PENDING_ORDER_KEY>.<email-prefix>) — a single shared key is what let one
  // payment activate every account signed into the same browser.
  const [hasPendingOrder, setHasPendingOrder] = useState(false);
  useEffect(() => {
    if (!path) return;
    setHasPendingOrder(Boolean(readPendingOrder(path.split("/").pop())));
  }, [path]);

  // Mobile number the payer enters before checkout. Prefilled from
  // users/{email-prefix} once the membership snapshot loads; never
  // overwritten after the user starts typing.
  const [mobileDraft, setMobileDraft] = useState("");
  const [mobileTouched, setMobileTouched] = useState(false);
  useEffect(() => {
    if (mobileTouched) return;
    const stored =
      typeof doc?.mobileNumber === "string" ? doc.mobileNumber : "";
    setMobileDraft(stored);
  }, [doc, mobileTouched]);
  const mobileNumber = normalizeMobileNumber(mobileDraft);
  const mobileValid = mobileNumber !== "";

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
  //
  // Guarding a shared machine: a pending order may only activate the account
  // it was minted for. Two checks enforce that — the <prefix> embedded in the
  // order id (1, below) and Cashfree's customer_email on the order (2). This
  // is what previously let ONE settled payment flip EVERY Google account
  // signed into the same browser, all of them landing with the same
  // orderId/paymentId.
  useEffect(() => {
    if (!authReady || !user || loading || !path) return undefined;
    if (isPaid) return undefined;

    const prefix = path.split("/").pop();

    // Prefer the redirect param, fall back to whatever we stored at checkout.
    let pending = null;
    let fromUrl = false;
    try {
      pending = new URLSearchParams(window.location.search).get("order_id");
      fromUrl = Boolean(pending);
    } catch {
      pending = null;
    }
    if (!pending) pending = readPendingOrder(prefix);
    if (!pending) return undefined;

    if (!orderBelongsToAccount(pending, prefix)) {
      // Someone else's settled order is reachable from this browser (old
      // shared key, or a return_url opened under the wrong login). Never
      // write it into this document; the paying account can still activate
      // with it later.
      if (fromUrl) stripOrderParam();
      setPayState((s) => ({
        ...s,
        verifying: false,
        error: `Order ${pending} belongs to account "${orderOwnerPrefix(pending) || "another user"}", not ${user.email || "this one"} — sign in with the paying account to activate it. Nothing was changed here.`,
      }));
      return undefined;
    }

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

        // Ownership, part two: customer_email is set when the order is
        // created and can only be changed by Cashfree, so a paid order minted
        // for another address must never activate this account (minted
        // prefixes can collide once newOrderId strips "." and "+").
        const orderEmail =
          typeof fetched.customer_email === "string"
            ? fetched.customer_email.trim().toLowerCase()
            : "";
        const accountEmail =
          typeof user.email === "string" ? user.email.trim().toLowerCase() : "";
        if (orderEmail && orderEmail !== accountEmail) {
          if (fromUrl) stripOrderParam();
          setPayState((s) => ({
            ...s,
            verifying: false,
            error: `Cashfree says order ${pending} was paid for ${orderEmail}, not ${accountEmail || "this account"} — nothing was changed here. Sign in with ${orderEmail} to activate it.`,
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
        if (result.ok) {
          // Retire the pending order BEFORE the cancelled check. The
          // onSnapshot that flips isPaid races this effect's cleanup, and
          // skipping this removal is how a settled order id used to linger in
          // localStorage and activate the NEXT account that signed in here.
          clearPendingOrder(prefix);
          setHasPendingOrder(false);
          stripOrderParam();
        }
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
  }, [authReady, user, loading, path, doc, isPaid, verifyNonce]);
  async function handleSaveMobile() {
    if (!user || payState.busy) return;
    if (!mobileValid) {
      setPayState((s) => ({ ...s, error: "Enter a valid 10-digit mobile number before saving (e.g. 9876543210)." }));
      return;
    }
    setPayState((s) => ({ ...s, busy: true, error: null }));
    try {
      const creationPayload =
        !loading && !doc
          ? {
              userName: String(
                username || user.email?.split("@")[0] || "user",
              ).slice(0, 60),
              email: user.email || "",
              isPaid: false,
              orderId: "",
              date: serverTimestamp(),
            }
          : null;
      const storeResult = await setDocument(
        userPath(user),
        { ...(creationPayload ?? {}), mobileNumber },
        { merge: true },
      );
      if (!storeResult.ok) {
        setPayState((s) => ({
          ...s,
          busy: false,
          error: mobileStoreErrorMessage(storeResult.error),
        }));
        return;
      }
      // After saving, clear the draft so the field shows as empty/optional
      // and the read-only note will show the saved number on refresh.
      setMobileDraft("");
      setPayState((s) => ({ ...s, busy: false, error: null }));
    } catch (err) {
      setPayState((s) => ({
        ...s,
        busy: false,
        error: err?.message || "Could not save mobile number. Please try again.",
      }));
    }
  }

  async function handlePay() {
    if (!user || !feeReady || payState.busy || isPaid) return;
    if (!mobileValid) {
      setPayState((s) => ({
        ...s,
        error:
          "Enter a valid 10-digit mobile number before paying (e.g. 9876543210).",
      }));
      return;
    }
    setPayState((s) => ({ ...s, busy: true, error: null }));
    try {
      // Persist the mobile number FIRST, as its own client-owned field on
      // users/{email-prefix}. This runs before the Cashfree order exists so
      // the number is on record even if checkout is abandoned; it is also
      // what makes the next visit prefill the field. The write only touches
      // mobileNumber (merge: true) so server-owned isPaid/orderId/date are
      // never at risk — the rules allow exactly that. If the doc is missing
      // entirely (deleted after login), the create rule needs the full known
      // shape, so mirror the first-write payload from pages/Profile.jsx.
      const creationPayload =
        !loading && !doc
          ? {
              userName: String(
                username || user.email?.split("@")[0] || "user",
              ).slice(0, 60),
              email: user.email || "",
              isPaid: false,
              orderId: "",
              date: serverTimestamp(),
            }
          : null;
      const storeResult = await setDocument(
        userPath(user),
        { ...(creationPayload ?? {}), mobileNumber },
        { merge: true },
      );
      if (!storeResult.ok) {
        setPayState((s) => ({
          ...s,
          busy: false,
          error: mobileStoreErrorMessage(storeResult.error),
        }));
        return;
      }

      const prefix =
        (typeof path === "string" && path.split("/").pop()) ||
        user.email?.split("@")[0] ||
        "user";
      const orderIdNew = newOrderId(prefix);
      const returnUrl = `${window.location.origin}${window.location.pathname}?order_id=${encodeURIComponent(orderIdNew)}`;
      const created = await createCashfreeOrder({
        orderId: orderIdNew,
        amount,
        currency,
        customerId: user.uid || orderIdNew,
        customerEmail: user.email || "",
        customerPhone: mobileNumber,
        customerName:
          (typeof doc?.userName === "string" && doc.userName.trim()) ||
          user.displayName ||
          "",
        returnUrl,
      });
      if (!created?.payment_session_id) {
        throw new Error("Cashfree did not return a payment session.");
      }
      // Persist before opening checkout, scoped to this account: if the user
      // closes the tab, or the return_url redirect loses the param, the next
      // visit can still verify — but only for THIS login.
      writePendingOrder(prefix, created.order_id || orderIdNew);
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
            {typeof doc?.mobileNumber === "string" && doc.mobileNumber ? (
              <p className="payment-note">
                Mobile: <code>{doc.mobileNumber}</code>
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
               stores the order id in this account's OWN localStorage key.
            2. Cashfree hosted checkout opens; user pays.
            3. We poll GET /orders/{id}/status until it reports success — this
               runs on page load whether or not the return_url redirect fired.
            4. Only then do we write isPaid/orderId/paymentId in one Firestore
               update (allowed once by the rules) — and only after the order
               is shown to belong to THIS account (minted prefix plus
               Cashfree's customer_email match), so one payment can never
               activate two accounts that share a browser.
          Webhooks: the worker also registers POST /webhook/cashfree, which Cashfree
          notifies when a payment settles — it writes isPaid via a Firebase service
          account (server/cashfree/README.md section 4), so activation happens with
          no browser open at all. This polling path is the fallback when a delivery
          is missed; both are idempotent.
        */}
        {!cashfreeConfigured && (
          <p className="payment-note payment-warning">
            Cashfree is not configured. Set{" "}
            <code>VITE_CASHFREE_API_BASE</code> to your Cloudflare Worker URL
            (see <code>server/cashfree/README.md</code>) to enable payment.
          </p>
        )}
        {!isPaid && user && (
          <div className="payment-mobile-field">
            {doc?.mobileNumber ? (
              <p className="payment-note">
                Mobile: <code>{doc.mobileNumber}</code>
              </p>
            ) : (
              <>
                <label className="payment-mobile-label" htmlFor="payment-mobile">
                  Mobile number
                </label>
                <input
                  id="payment-mobile"
                  className="payment-mobile-input"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={16}
                  placeholder="98765 43210"
                  value={mobileDraft}
                  disabled={payState.busy}
                  onChange={(event) => {
                    setMobileTouched(true);
                    setMobileDraft(event.target.value);
                  }}
                />
                <button
                  type="button"
                  className="payment-btn payment-mobile-btn"
                  disabled={!mobileValid}
                  onClick={handleSaveMobile}
                >
                  Add mobile number
                </button>
                <p className="payment-note">
                  Required for the Cashfree payment record.
                  enter your 10-digit number (with or without +91).
                  {mobileTouched && !mobileValid && mobileDraft.trim() !== "" && (
                    <span className="payment-mobile-invalid">
                      {" "}
                      That doesn&apos;t look like a valid 10-digit mobile number.
                    </span>
                  )}
                </p>
              </>
            )}
          </div>
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
              !user ||
              loading ||
              !feeReady ||
              !cashfreeConfigured ||
              payState.busy ||
              !mobileValid
            }
            title={
              !cashfreeConfigured
                ? "Add Cashfree Sandbox keys to enable payment."
                : !mobileValid
                  ? "Enter a valid 10-digit mobile number to continue."
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
        {isPaid && (
          <p className="payment-note">
            Payment complete — access is active.
          </p>
        )}
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
